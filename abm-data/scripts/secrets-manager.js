/**
 * Google Secret Manager integration for secure credential storage.
 *
 * SETUP:
 * 1. Create a GCP project (or use existing)
 * 2. Enable Secret Manager API: gcloud services enable secretmanager.googleapis.com
 * 3. Create secrets via CLI or this script
 * 4. Set GOOGLE_APPLICATION_CREDENTIALS to your service account key
 *
 * USAGE:
 *   const secrets = require('./secrets-manager');
 *   const clientId = await secrets.get('google-oauth-client-id');
 */

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// Configuration
const PROJECT_ID = process.env.GCP_PROJECT_ID || 'fretron-marketing';

// Secret names (stored in Google Secret Manager)
const SECRET_NAMES = {
  GOOGLE_CLIENT_ID: 'google-oauth-client-id',
  GOOGLE_CLIENT_SECRET: 'google-oauth-client-secret',
  GOOGLE_REFRESH_TOKEN: 'google-oauth-refresh-token',
  GOOGLE_ADS_DEVELOPER_TOKEN: 'google-ads-developer-token',
  GOOGLE_ADS_CUSTOMER_ID: 'google-ads-customer-id',
  HUBSPOT_API_KEY: 'hubspot-api-key',
  SMARTLEAD_API_KEY: 'smartlead-api-key',
  RESEND_API_KEY: 'resend-api-key',
};

let client = null;
const cache = new Map();

/**
 * Initialize the Secret Manager client
 */
function getClient() {
  if (!client) {
    client = new SecretManagerServiceClient();
  }
  return client;
}

/**
 * Get a secret value from Google Secret Manager
 * @param {string} secretName - The secret name (from SECRET_NAMES or custom)
 * @param {string} version - Version to retrieve (default: 'latest')
 * @returns {Promise<string>} The secret value
 */
async function getSecret(secretName, version = 'latest') {
  // Check cache first
  const cacheKey = `${secretName}:${version}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Fall back to environment variable if Secret Manager not configured
  const envKey = Object.keys(SECRET_NAMES).find(k => SECRET_NAMES[k] === secretName);
  if (envKey && process.env[envKey]) {
    console.log(`[secrets] Using env var for ${secretName}`);
    return process.env[envKey];
  }

  try {
    const client = getClient();
    const name = `projects/${PROJECT_ID}/secrets/${secretName}/versions/${version}`;

    const [response] = await client.accessSecretVersion({ name });
    const secretValue = response.payload.data.toString('utf8');

    // Cache for 5 minutes
    cache.set(cacheKey, secretValue);
    setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);

    return secretValue;
  } catch (error) {
    if (error.code === 5) { // NOT_FOUND
      throw new Error(`Secret '${secretName}' not found in project '${PROJECT_ID}'`);
    }
    if (error.code === 7) { // PERMISSION_DENIED
      throw new Error(`Permission denied accessing secret '${secretName}'. Check IAM roles.`);
    }
    throw error;
  }
}

/**
 * Create or update a secret in Google Secret Manager
 * @param {string} secretName - The secret name
 * @param {string} secretValue - The secret value
 * @returns {Promise<void>}
 */
async function setSecret(secretName, secretValue) {
  const client = getClient();
  const parent = `projects/${PROJECT_ID}`;

  try {
    // Try to create the secret first
    await client.createSecret({
      parent,
      secretId: secretName,
      secret: {
        replication: {
          automatic: {},
        },
      },
    });
    console.log(`[secrets] Created secret: ${secretName}`);
  } catch (error) {
    if (error.code !== 6) { // 6 = ALREADY_EXISTS
      throw error;
    }
    console.log(`[secrets] Secret exists: ${secretName}`);
  }

  // Add the secret version
  const secretPath = `${parent}/secrets/${secretName}`;
  await client.addSecretVersion({
    parent: secretPath,
    payload: {
      data: Buffer.from(secretValue, 'utf8'),
    },
  });

  console.log(`[secrets] Added new version for: ${secretName}`);
  cache.delete(`${secretName}:latest`);
}

/**
 * Get all OAuth credentials for Google APIs
 * @returns {Promise<Object>} OAuth credentials object
 */
async function getGoogleOAuthCredentials() {
  const [clientId, clientSecret, refreshToken] = await Promise.all([
    getSecret(SECRET_NAMES.GOOGLE_CLIENT_ID),
    getSecret(SECRET_NAMES.GOOGLE_CLIENT_SECRET),
    getSecret(SECRET_NAMES.GOOGLE_REFRESH_TOKEN),
  ]);

  return {
    clientId,
    clientSecret,
    refreshToken,
  };
}

/**
 * Get Google Ads credentials
 * @returns {Promise<Object>} Google Ads credentials
 */
async function getGoogleAdsCredentials() {
  const oauth = await getGoogleOAuthCredentials();
  const [developerToken, customerId] = await Promise.all([
    getSecret(SECRET_NAMES.GOOGLE_ADS_DEVELOPER_TOKEN),
    getSecret(SECRET_NAMES.GOOGLE_ADS_CUSTOMER_ID),
  ]);

  return {
    ...oauth,
    developerToken,
    customerId,
  };
}

/**
 * List all secrets in the project
 * @returns {Promise<string[]>} List of secret names
 */
async function listSecrets() {
  const client = getClient();
  const parent = `projects/${PROJECT_ID}`;

  const [secrets] = await client.listSecrets({ parent });
  return secrets.map(s => s.name.split('/').pop());
}

// CLI interface for managing secrets
async function cli() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
      console.log('\nSecrets in project:', PROJECT_ID);
      console.log('=' .repeat(50));
      const secrets = await listSecrets();
      secrets.forEach(s => console.log(`  - ${s}`));
      console.log(`\nTotal: ${secrets.length} secrets`);
      break;

    case 'get':
      if (!args[1]) {
        console.error('Usage: node secrets-manager.js get <secret-name>');
        process.exit(1);
      }
      const value = await getSecret(args[1]);
      console.log(`${args[1]}: ${value.substring(0, 10)}...`);
      break;

    case 'set':
      if (!args[1] || !args[2]) {
        console.error('Usage: node secrets-manager.js set <secret-name> <value>');
        process.exit(1);
      }
      await setSecret(args[1], args[2]);
      console.log('Secret saved successfully');
      break;

    case 'setup':
      console.log('\n📋 Setting up secrets from environment variables...\n');
      for (const [envKey, secretName] of Object.entries(SECRET_NAMES)) {
        if (process.env[envKey]) {
          await setSecret(secretName, process.env[envKey]);
        } else {
          console.log(`[skip] ${envKey} not set in environment`);
        }
      }
      console.log('\n✅ Setup complete');
      break;

    default:
      console.log(`
Google Secret Manager CLI

Usage:
  node secrets-manager.js <command> [args]

Commands:
  list              List all secrets in the project
  get <name>        Get a secret value
  set <name> <val>  Create or update a secret
  setup             Migrate env vars to Secret Manager

Environment:
  GCP_PROJECT_ID    Google Cloud project ID (default: fretron-marketing)
  GOOGLE_APPLICATION_CREDENTIALS  Path to service account key JSON

Examples:
  node secrets-manager.js list
  node secrets-manager.js set google-oauth-client-id "your-client-id"
  node secrets-manager.js get google-oauth-client-id
`);
  }
}

// Run CLI if executed directly
if (require.main === module) {
  cli().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

module.exports = {
  getSecret,
  setSecret,
  listSecrets,
  getGoogleOAuthCredentials,
  getGoogleAdsCredentials,
  SECRET_NAMES,
};
