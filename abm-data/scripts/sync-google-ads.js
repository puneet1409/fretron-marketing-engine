#!/usr/bin/env node
/**
 * Google Ads Data Sync Script
 *
 * Fetches campaigns, ad groups, and performance metrics from Google Ads API
 * and stores them in the ABM data records.
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env') });

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN;
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID;

const API_VERSION = 'v18';
const BASE_URL = `https://googleads.googleapis.com/${API_VERSION}/customers/${CUSTOMER_ID}`;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !DEVELOPER_TOKEN || !CUSTOMER_ID) {
  console.error('Error: Missing Google Ads credentials in .env file');
  console.error('Required: GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CUSTOMER_ID');
  process.exit(1);
}

let accessToken = null;

async function getAccessToken() {
  if (accessToken) return accessToken;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Token refresh failed: ${data.error} - ${data.error_description}`);
  }

  accessToken = data.access_token;
  return accessToken;
}

async function queryGoogleAds(query) {
  const token = await getAccessToken();

  // Use search endpoint instead of searchStream
  const response = await fetch(`${BASE_URL}/googleAds:search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'developer-token': DEVELOPER_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, pageSize: 1000 })
  });

  const text = await response.text();

  if (!response.ok) {
    console.error('API Error Response:', text);

    // Check for specific errors
    if (text.includes('DEVELOPER_TOKEN_NOT_APPROVED')) {
      throw new Error('Developer token not approved. Go to Google Ads > Tools > API Center to apply for access.');
    }
    if (text.includes('PERMISSION_DENIED') || text.includes('UNIMPLEMENTED')) {
      throw new Error('API access denied. Your developer token may need Basic or Standard access approval.');
    }

    throw new Error(`Google Ads API error: ${response.status} ${response.statusText}`);
  }

  try {
    const data = JSON.parse(text);
    return data.results || [];
  } catch (e) {
    console.error('Failed to parse response:', text);
    throw e;
  }
}

async function getCampaigns() {
  console.log('Fetching campaigns...');

  const query = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      campaign.start_date,
      campaign.end_date,
      campaign_budget.amount_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.ctr,
      metrics.average_cpc
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
  `;

  return queryGoogleAds(query);
}

async function getAdGroups() {
  console.log('Fetching ad groups...');

  const query = `
    SELECT
      ad_group.id,
      ad_group.name,
      ad_group.status,
      ad_group.campaign,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM ad_group
    WHERE segments.date DURING LAST_30_DAYS
  `;

  return queryGoogleAds(query);
}

async function getAccountInfo() {
  console.log('Fetching account info...');

  const query = `
    SELECT
      customer.id,
      customer.descriptive_name,
      customer.currency_code,
      customer.time_zone
    FROM customer
    LIMIT 1
  `;

  return queryGoogleAds(query);
}

function transformCampaign(result) {
  const campaign = result.campaign || {};
  const metrics = result.metrics || {};
  const budget = result.campaignBudget || {};

  const costMicros = parseInt(metrics.costMicros) || 0;
  const clicks = parseInt(metrics.clicks) || 0;
  const impressions = parseInt(metrics.impressions) || 0;

  return {
    id: `gads_campaign_${campaign.id}`,
    sourceId: campaign.id,
    source: 'google_ads',
    name: campaign.name,
    status: campaign.status,
    channelType: campaign.advertisingChannelType,

    budget: {
      amountMicros: parseInt(budget.amountMicros) || 0,
      amount: (parseInt(budget.amountMicros) || 0) / 1000000,
      currency: 'INR'
    },

    schedule: {
      startDate: campaign.startDate,
      endDate: campaign.endDate
    },

    performance: {
      impressions: impressions,
      clicks: clicks,
      costMicros: costMicros,
      cost: costMicros / 1000000,
      conversions: parseFloat(metrics.conversions) || 0,
      ctr: parseFloat(metrics.ctr) || 0,
      avgCpc: (parseInt(metrics.averageCpc) || 0) / 1000000
    },

    metadata: {
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function transformAdGroup(result) {
  const adGroup = result.adGroup || {};
  const metrics = result.metrics || {};

  const costMicros = parseInt(metrics.costMicros) || 0;

  return {
    id: `gads_adgroup_${adGroup.id}`,
    sourceId: adGroup.id,
    source: 'google_ads',
    campaignId: adGroup.campaign,
    name: adGroup.name,
    status: adGroup.status,

    performance: {
      impressions: parseInt(metrics.impressions) || 0,
      clicks: parseInt(metrics.clicks) || 0,
      costMicros: costMicros,
      cost: costMicros / 1000000,
      conversions: parseFloat(metrics.conversions) || 0
    },

    metadata: {
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function formatCurrency(amount) {
  if (!amount) return '₹0';
  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

async function main() {
  console.log('Starting Google Ads data sync...\n');

  const outputDir = path.join(__dirname, '..', 'records');
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  try {
    // Fetch account info
    const accountResults = await getAccountInfo();
    const account = accountResults[0]?.customer || {};
    console.log(`Account: ${account.descriptiveName || CUSTOMER_ID}`);
    console.log(`Currency: ${account.currencyCode}, Timezone: ${account.timeZone}\n`);

    // Fetch campaigns
    const campaignResults = await getCampaigns();
    const campaigns = campaignResults.map(transformCampaign);
    console.log(`Found ${campaigns.length} campaigns\n`);

    // Log campaign details
    campaigns.forEach(c => {
      console.log(`  ${c.name} (${c.status})`);
      console.log(`    Spend: ${formatCurrency(c.performance.cost)}, Clicks: ${c.performance.clicks}, CTR: ${(c.performance.ctr * 100).toFixed(2)}%`);
    });

    // Fetch ad groups
    const adGroupResults = await getAdGroups();
    const adGroups = adGroupResults.map(transformAdGroup);
    console.log(`\nFetched ${adGroups.length} ad groups`);

    // Calculate totals
    const totalSpend = campaigns.reduce((sum, c) => sum + c.performance.cost, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.performance.clicks, 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.performance.impressions, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.performance.conversions, 0);

    // Save campaigns
    await writeFile(
      path.join(outputDir, 'google-ads-campaigns.json'),
      JSON.stringify({
        meta: {
          accountId: CUSTOMER_ID,
          accountName: account.descriptiveName,
          count: campaigns.length,
          totalSpend: totalSpend,
          syncedAt: new Date().toISOString(),
          source: 'google-ads-api'
        },
        records: campaigns
      }, null, 2)
    );

    // Save ad groups
    await writeFile(
      path.join(outputDir, 'google-ads-adgroups.json'),
      JSON.stringify({
        meta: {
          count: adGroups.length,
          syncedAt: new Date().toISOString(),
          source: 'google-ads-api'
        },
        records: adGroups
      }, null, 2)
    );

    // Save summary
    await writeFile(
      path.join(outputDir, 'google-ads-summary.json'),
      JSON.stringify({
        account: {
          id: CUSTOMER_ID,
          name: account.descriptiveName,
          currency: account.currencyCode,
          timezone: account.timeZone
        },
        last30Days: {
          impressions: totalImpressions,
          clicks: totalClicks,
          spend: totalSpend,
          conversions: totalConversions,
          ctr: totalImpressions ? (totalClicks / totalImpressions * 100) : 0,
          avgCpc: totalClicks ? (totalSpend / totalClicks) : 0
        },
        counts: {
          campaigns: campaigns.length,
          adGroups: adGroups.length,
          activeCampaigns: campaigns.filter(c => c.status === 'ENABLED').length
        },
        syncedAt: new Date().toISOString()
      }, null, 2)
    );

    console.log('\n' + '='.repeat(50));
    console.log('Google Ads sync complete!');
    console.log('='.repeat(50));
    console.log(`\nSummary (Last 30 Days):`);
    console.log(`  Campaigns: ${campaigns.length} (${campaigns.filter(c => c.status === 'ENABLED').length} active)`);
    console.log(`  Ad Groups: ${adGroups.length}`);
    console.log(`  Total Spend: ${formatCurrency(totalSpend)}`);
    console.log(`  Total Clicks: ${totalClicks.toLocaleString()}`);
    console.log(`  Impressions: ${totalImpressions.toLocaleString()}`);
    console.log(`  Conversions: ${totalConversions.toFixed(1)}`);
    console.log(`  Avg CTR: ${totalImpressions ? (totalClicks / totalImpressions * 100).toFixed(2) : 0}%`);
    console.log(`\nFiles saved to: ${outputDir}`);

  } catch (error) {
    console.error('\nError:', error.message);
    if (error.message.includes('PERMISSION_DENIED')) {
      console.error('\nNote: Your developer token may need approval for production access.');
      console.error('Check: https://ads.google.com/aw/apicenter');
    }
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
