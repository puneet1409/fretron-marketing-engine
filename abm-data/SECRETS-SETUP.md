# Secrets Management Setup

This guide covers setting up Google Secret Manager for secure credential storage.

## Why Secret Manager?

- **Security**: Secrets encrypted at rest, access controlled via IAM
- **Collaboration**: Team members access same secrets without sharing files
- **Audit**: Full audit log of who accessed what secrets when
- **Versioning**: Automatic version history, easy rollback
- **Rotation**: Supports automatic secret rotation

## Quick Setup (15 minutes)

### Step 1: Create GCP Project

```bash
# Install gcloud CLI if needed: https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Create project (or use existing)
gcloud projects create fretron-marketing --name="Fretron Marketing"

# Set as default
gcloud config set project fretron-marketing

# Enable billing (required for Secret Manager)
# Do this in console: https://console.cloud.google.com/billing
```

### Step 2: Enable Secret Manager API

```bash
gcloud services enable secretmanager.googleapis.com
```

### Step 3: Create Service Account

```bash
# Create service account
gcloud iam service-accounts create marketing-secrets \
  --display-name="Marketing Secrets Access"

# Grant Secret Manager access
gcloud projects add-iam-policy-binding fretron-marketing \
  --member="serviceAccount:marketing-secrets@fretron-marketing.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Also grant ability to create secrets (for initial setup)
gcloud projects add-iam-policy-binding fretron-marketing \
  --member="serviceAccount:marketing-secrets@fretron-marketing.iam.gserviceaccount.com" \
  --role="roles/secretmanager.admin"

# Create and download key
gcloud iam service-accounts keys create ~/fretron-secrets-key.json \
  --iam-account=marketing-secrets@fretron-marketing.iam.gserviceaccount.com

echo "Key saved to: ~/fretron-secrets-key.json"
```

### Step 4: Set Environment Variable

```bash
# Add to your shell profile (~/.bashrc, ~/.zshrc, etc.)
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/fretron-secrets-key.json"

# Reload shell
source ~/.bashrc
```

### Step 5: Install Dependencies

```bash
cd abm-data
npm install @google-cloud/secret-manager
```

### Step 6: Migrate Existing Secrets

```bash
# Create .env.local with your current secrets
cp ../.env.example .env.local
# Edit .env.local and fill in values

# Migrate to Secret Manager
node scripts/secrets-manager.js setup
```

### Step 7: Verify Setup

```bash
# List all secrets
node scripts/secrets-manager.js list

# Test retrieval
node scripts/secrets-manager.js get google-oauth-client-id
```

## Sharing with Colleagues

### Option A: Share Service Account Key (Simple)

1. Store `fretron-secrets-key.json` in 1Password or similar
2. Share vault access with team members
3. Each person downloads and sets `GOOGLE_APPLICATION_CREDENTIALS`

### Option B: Individual IAM Access (Better)

```bash
# Grant access to colleague's Google account
gcloud projects add-iam-policy-binding fretron-marketing \
  --member="user:colleague@gmail.com" \
  --role="roles/secretmanager.secretAccessor"
```

Then colleague authenticates with:
```bash
gcloud auth application-default login
```

## Usage in Code

```javascript
const secrets = require('./secrets-manager');

// Get single secret
const apiKey = await secrets.getSecret('hubspot-api-key');

// Get Google OAuth credentials
const oauth = await secrets.getGoogleOAuthCredentials();
// Returns: { clientId, clientSecret, refreshToken }

// Get Google Ads credentials
const ads = await secrets.getGoogleAdsCredentials();
// Returns: { clientId, clientSecret, refreshToken, developerToken, customerId }
```

## Secret Names Reference

| Secret Name | Description |
|-------------|-------------|
| `google-oauth-client-id` | OAuth 2.0 Client ID |
| `google-oauth-client-secret` | OAuth 2.0 Client Secret |
| `google-oauth-refresh-token` | OAuth refresh token |
| `google-ads-developer-token` | Google Ads API developer token |
| `google-ads-customer-id` | Google Ads customer ID |
| `hubspot-api-key` | HubSpot private app API key |
| `smartlead-api-key` | SmartLead API key |
| `resend-api-key` | Resend email API key |

## Troubleshooting

### "Permission denied" error
```bash
# Check IAM bindings
gcloud projects get-iam-policy fretron-marketing

# Re-grant access
gcloud projects add-iam-policy-binding fretron-marketing \
  --member="serviceAccount:YOUR_SERVICE_ACCOUNT" \
  --role="roles/secretmanager.secretAccessor"
```

### "Secret not found" error
```bash
# List existing secrets
node scripts/secrets-manager.js list

# Create missing secret
node scripts/secrets-manager.js set secret-name "secret-value"
```

### "Could not load credentials" error
```bash
# Verify env var is set
echo $GOOGLE_APPLICATION_CREDENTIALS

# Verify file exists and is valid JSON
cat $GOOGLE_APPLICATION_CREDENTIALS | jq .
```

## Cost

Google Secret Manager pricing:
- **Free tier**: 6 active secret versions, 10,000 access operations/month
- **Beyond free**: $0.06/secret version/month, $0.03/10,000 operations

For typical usage (10-20 secrets, few thousand accesses), cost is ~$1-2/month.
