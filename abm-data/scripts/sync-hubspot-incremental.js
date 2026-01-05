#!/usr/bin/env node
/**
 * Incremental HubSpot Sync Script
 *
 * Fetches only records modified since last sync to minimize API calls.
 * Implements rate limiting and exponential backoff.
 *
 * HubSpot Rate Limits:
 * - Free/Starter: 100 requests per 10 seconds
 * - Professional: 150 requests per 10 seconds
 * - Enterprise: 200 requests per 10 seconds
 *
 * We use conservative limits: 5 requests/second with 200ms delays
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ABM_DATA_DIR = path.resolve(__dirname, '..');
const SYNC_STATE_FILE = path.join(ABM_DATA_DIR, 'sync-state.json');

// Load environment variables from .env file
config({ path: path.join(ABM_DATA_DIR, '.env') });

// Rate limiting configuration
const RATE_LIMIT = {
  requestsPerSecond: 5,
  delayBetweenRequests: 200, // ms
  maxRetries: 3,
  retryDelayBase: 1000, // ms, doubles each retry
  pageSize: 100 // HubSpot max is 100
};

// HubSpot API configuration
const HUBSPOT_API_BASE = 'https://api.hubapi.com';
const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

if (!HUBSPOT_TOKEN) {
  console.error('Error: HUBSPOT_ACCESS_TOKEN environment variable not set');
  console.error('Set it with: export HUBSPOT_ACCESS_TOKEN=your_token');
  process.exit(1);
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Make HTTP request to HubSpot API with rate limiting
 */
async function hubspotRequest(endpoint, options = {}, retryCount = 0) {
  const url = `${HUBSPOT_API_BASE}${endpoint}`;

  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Handle rate limiting
        if (res.statusCode === 429) {
          const retryAfter = parseInt(res.headers['retry-after'] || '10', 10);
          console.log(`  Rate limited. Waiting ${retryAfter}s...`);

          if (retryCount < RATE_LIMIT.maxRetries) {
            sleep(retryAfter * 1000).then(() => {
              hubspotRequest(endpoint, options, retryCount + 1)
                .then(resolve)
                .catch(reject);
            });
            return;
          } else {
            reject(new Error('Max retries exceeded due to rate limiting'));
            return;
          }
        }

        if (res.statusCode >= 400) {
          reject(new Error(`HubSpot API error ${res.statusCode}: ${data}`));
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      if (retryCount < RATE_LIMIT.maxRetries) {
        const delay = RATE_LIMIT.retryDelayBase * Math.pow(2, retryCount);
        console.log(`  Request failed. Retrying in ${delay}ms...`);
        sleep(delay).then(() => {
          hubspotRequest(endpoint, options, retryCount + 1)
            .then(resolve)
            .catch(reject);
        });
      } else {
        reject(e);
      }
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

/**
 * Fetch all pages of a resource with rate limiting
 */
async function fetchAllPages(endpoint, propertiesToFetch = [], lastModified = null) {
  const results = [];
  let after = null;
  let pageCount = 0;

  // Build query params
  const buildUrl = () => {
    const params = new URLSearchParams();
    params.set('limit', RATE_LIMIT.pageSize.toString());

    if (propertiesToFetch.length > 0) {
      params.set('properties', propertiesToFetch.join(','));
    }

    if (after) {
      params.set('after', after);
    }

    return `${endpoint}?${params.toString()}`;
  };

  do {
    pageCount++;
    const url = buildUrl();

    console.log(`  Fetching page ${pageCount}...`);

    try {
      const response = await hubspotRequest(url);

      if (response.results) {
        // Filter by lastModified if provided
        let filtered = response.results;
        if (lastModified) {
          const lastModDate = new Date(lastModified);
          filtered = response.results.filter(r => {
            const updatedAt = new Date(r.updatedAt || r.properties?.hs_lastmodifieddate);
            return updatedAt > lastModDate;
          });
        }
        results.push(...filtered);
        console.log(`    Found ${filtered.length} records (${results.length} total)`);
      }

      // Check for next page
      after = response.paging?.next?.after || null;

      // Rate limit delay between requests
      if (after) {
        await sleep(RATE_LIMIT.delayBetweenRequests);
      }
    } catch (err) {
      console.error(`  Error fetching page ${pageCount}:`, err.message);
      throw err;
    }
  } while (after);

  return results;
}

/**
 * Load sync state (last sync timestamps)
 */
async function loadSyncState() {
  try {
    if (existsSync(SYNC_STATE_FILE)) {
      const content = await readFile(SYNC_STATE_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn('Could not load sync state:', err.message);
  }

  return {
    lastSync: null,
    companies: { lastSync: null, count: 0 },
    contacts: { lastSync: null, count: 0 },
    deals: { lastSync: null, count: 0 }
  };
}

/**
 * Save sync state
 */
async function saveSyncState(state) {
  await writeFile(SYNC_STATE_FILE, JSON.stringify(state, null, 2));
}

/**
 * Fetch companies incrementally
 */
async function syncCompanies(lastSync) {
  console.log('\nSyncing companies...');

  const properties = [
    'name', 'domain', 'industry', 'annualrevenue', 'numberofemployees',
    'city', 'state', 'country', 'hs_lastmodifieddate'
  ];

  const companies = await fetchAllPages('/crm/v3/objects/companies', properties, lastSync);
  console.log(`  Total companies fetched: ${companies.length}`);

  return companies;
}

/**
 * Fetch contacts incrementally
 */
async function syncContacts(lastSync) {
  console.log('\nSyncing contacts...');

  const properties = [
    'firstname', 'lastname', 'email', 'phone', 'jobtitle', 'company',
    'lifecyclestage', 'hs_lastmodifieddate'
  ];

  const contacts = await fetchAllPages('/crm/v3/objects/contacts', properties, lastSync);
  console.log(`  Total contacts fetched: ${contacts.length}`);

  return contacts;
}

/**
 * Fetch deals incrementally
 */
async function syncDeals(lastSync) {
  console.log('\nSyncing deals...');

  const properties = [
    'dealname', 'amount', 'dealstage', 'pipeline', 'closedate',
    'createdate', 'dealtype', 'industry', 'hs_lastmodifieddate'
  ];

  const deals = await fetchAllPages('/crm/v3/objects/deals', properties, lastSync);
  console.log(`  Total deals fetched: ${deals.length}`);

  return deals;
}

/**
 * Fetch engagements (emails, calls, meetings, notes, tasks)
 */
async function syncEngagements(type, lastSync) {
  console.log(`\nSyncing ${type}...`);

  const propertyMap = {
    emails: ['hs_timestamp', 'hs_email_subject', 'hs_email_status', 'hs_email_direction'],
    calls: ['hs_timestamp', 'hs_call_title', 'hs_call_status', 'hs_call_duration', 'hs_call_direction'],
    meetings: ['hs_timestamp', 'hs_meeting_title', 'hs_meeting_outcome', 'hs_meeting_start_time', 'hs_meeting_end_time'],
    notes: ['hs_timestamp', 'hs_note_body'],
    tasks: ['hs_timestamp', 'hs_task_subject', 'hs_task_status', 'hs_task_priority', 'hs_task_type']
  };

  const properties = propertyMap[type] || ['hs_timestamp'];

  try {
    const engagements = await fetchAllPages(`/crm/v3/objects/${type}`, properties, lastSync);
    console.log(`  Total ${type} fetched: ${engagements.length}`);
    return engagements;
  } catch (err) {
    console.log(`  Error fetching ${type}: ${err.message}`);
    return [];
  }
}

/**
 * Merge new records with existing
 */
async function mergeRecords(existingFile, newRecords, idField = 'id') {
  let existing = { meta: {}, records: [] };

  try {
    if (existsSync(existingFile)) {
      const content = await readFile(existingFile, 'utf-8');
      existing = JSON.parse(content);
    }
  } catch (err) {
    console.warn(`  Could not load existing file: ${err.message}`);
  }

  // Create map of existing records
  const recordMap = new Map();
  (existing.records || []).forEach(r => recordMap.set(r.id || r.sourceId, r));

  // Update with new records
  let updatedCount = 0;
  let newCount = 0;

  newRecords.forEach(r => {
    const id = r.id;
    if (recordMap.has(id)) {
      updatedCount++;
    } else {
      newCount++;
    }
    recordMap.set(id, r);
  });

  console.log(`  Merged: ${newCount} new, ${updatedCount} updated, ${recordMap.size} total`);

  return {
    meta: {
      ...existing.meta,
      count: recordMap.size,
      lastUpdated: new Date().toISOString()
    },
    records: Array.from(recordMap.values())
  };
}

/**
 * Main sync function
 */
async function main() {
  console.log('='.repeat(50));
  console.log('HubSpot Incremental Sync');
  console.log('='.repeat(50));

  // Load sync state
  const syncState = await loadSyncState();
  console.log(`\nLast full sync: ${syncState.lastSync || 'Never'}`);

  // Determine sync mode
  const args = process.argv.slice(2);
  const fullSync = args.includes('--full');
  const syncType = args.find(a => ['--companies', '--contacts', '--deals', '--emails', '--calls', '--meetings', '--notes', '--tasks', '--activities'].includes(a));

  if (fullSync) {
    console.log('Mode: Full sync (fetching all records)');
  } else {
    console.log('Mode: Incremental sync (fetching only modified records)');
  }

  if (syncType === '--activities') {
    console.log('Syncing all activity types (emails, calls, meetings, notes, tasks)');
  }

  const startTime = Date.now();
  const recordsDir = path.join(ABM_DATA_DIR, 'records');

  if (!existsSync(recordsDir)) {
    await mkdir(recordsDir, { recursive: true });
  }

  // Sync each entity type
  const syncResults = { companies: 0, contacts: 0, deals: 0 };

  try {
    // Companies
    if (!syncType || syncType === '--companies') {
      const lastSync = fullSync ? null : syncState.companies.lastSync;
      const companies = await syncCompanies(lastSync);
      syncResults.companies = companies.length;

      if (companies.length > 0) {
        // Save raw data for re-import
        await writeFile(
          path.join(recordsDir, 'hubspot-companies-raw.json'),
          JSON.stringify({ results: companies, fetchedAt: new Date().toISOString() }, null, 2)
        );
      }

      syncState.companies.lastSync = new Date().toISOString();
      syncState.companies.count += companies.length;
    }

    // Contacts
    if (!syncType || syncType === '--contacts') {
      const lastSync = fullSync ? null : syncState.contacts.lastSync;
      const contacts = await syncContacts(lastSync);
      syncResults.contacts = contacts.length;

      if (contacts.length > 0) {
        await writeFile(
          path.join(recordsDir, 'hubspot-contacts-raw.json'),
          JSON.stringify({ results: contacts, fetchedAt: new Date().toISOString() }, null, 2)
        );
      }

      syncState.contacts.lastSync = new Date().toISOString();
      syncState.contacts.count += contacts.length;
    }

    // Deals
    if (!syncType || syncType === '--deals') {
      const lastSync = fullSync ? null : syncState.deals.lastSync;
      const deals = await syncDeals(lastSync);
      syncResults.deals = deals.length;

      if (deals.length > 0) {
        await writeFile(
          path.join(recordsDir, 'hubspot-deals-raw.json'),
          JSON.stringify({ results: deals, fetchedAt: new Date().toISOString() }, null, 2)
        );
      }

      syncState.deals.lastSync = new Date().toISOString();
      syncState.deals.count += deals.length;
    }

    // Activities (emails, calls, meetings, notes, tasks)
    const activityTypes = ['emails', 'calls', 'meetings', 'notes', 'tasks'];
    const syncActivities = syncType === '--activities' || activityTypes.some(t => syncType === `--${t}`);

    // Initialize activity state if not exists
    if (!syncState.activities) {
      syncState.activities = {};
      activityTypes.forEach(t => {
        syncState.activities[t] = { lastSync: null, count: 0 };
      });
    }

    // Initialize results
    syncResults.activities = {};

    for (const activityType of activityTypes) {
      const shouldSync = !syncType || syncType === '--activities' || syncType === `--${activityType}`;

      if (shouldSync) {
        const lastSync = fullSync ? null : syncState.activities[activityType]?.lastSync;
        const activities = await syncEngagements(activityType, lastSync);
        syncResults.activities[activityType] = activities.length;

        if (activities.length > 0) {
          await writeFile(
            path.join(recordsDir, `hubspot-${activityType}-raw.json`),
            JSON.stringify({ results: activities, fetchedAt: new Date().toISOString() }, null, 2)
          );
        }

        if (!syncState.activities[activityType]) {
          syncState.activities[activityType] = { lastSync: null, count: 0 };
        }
        syncState.activities[activityType].lastSync = new Date().toISOString();
        syncState.activities[activityType].count += activities.length;
      }
    }

    // Update sync state
    syncState.lastSync = new Date().toISOString();
    await saveSyncState(syncState);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n' + '='.repeat(50));
    console.log('Sync Complete');
    console.log('='.repeat(50));
    console.log(`\nDuration: ${duration}s`);
    console.log(`Records fetched:`);
    console.log(`  Companies: ${syncResults.companies}`);
    console.log(`  Contacts: ${syncResults.contacts}`);
    console.log(`  Deals: ${syncResults.deals}`);
    if (syncResults.activities) {
      console.log(`  Activities:`);
      for (const [type, count] of Object.entries(syncResults.activities)) {
        if (count !== undefined) console.log(`    ${type}: ${count}`);
      }
    }
    console.log(`\nRaw data saved to: ${recordsDir}/hubspot-*-raw.json`);
    console.log('\nTo transform to canonical format, run: npm run import');

  } catch (err) {
    console.error('\nSync failed:', err.message);

    // Save partial state
    syncState.lastError = {
      message: err.message,
      timestamp: new Date().toISOString()
    };
    await saveSyncState(syncState);

    process.exit(1);
  }
}

main();
