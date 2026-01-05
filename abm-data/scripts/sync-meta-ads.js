#!/usr/bin/env node
/**
 * Meta Ads Data Sync Script
 *
 * Fetches campaigns, ad sets, ads, and insights from Meta Marketing API
 * and stores them in the ABM data records.
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env') });

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const API_VERSION = 'v21.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
  console.error('Error: META_ACCESS_TOKEN or META_AD_ACCOUNT_ID not found in .env file');
  process.exit(1);
}

async function fetchFromMeta(endpoint, params = {}) {
  const searchParams = new URLSearchParams({
    access_token: ACCESS_TOKEN,
    ...params
  });

  const url = `${BASE_URL}${endpoint}?${searchParams}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    throw new Error(`Meta API error: ${data.error.message}`);
  }

  return data;
}

async function getAdAccount() {
  console.log('Fetching ad account info...');
  return fetchFromMeta(`/act_${AD_ACCOUNT_ID}`, {
    fields: 'name,account_status,currency,timezone_name,amount_spent'
  });
}

async function getCampaigns() {
  console.log('Fetching campaigns...');
  return fetchFromMeta(`/act_${AD_ACCOUNT_ID}/campaigns`, {
    fields: 'id,name,status,objective,created_time,updated_time,daily_budget,lifetime_budget',
    limit: 100
  });
}

async function getAdSets() {
  console.log('Fetching ad sets...');
  return fetchFromMeta(`/act_${AD_ACCOUNT_ID}/adsets`, {
    fields: 'id,name,campaign_id,status,targeting,optimization_goal,daily_budget,lifetime_budget,start_time,end_time',
    limit: 100
  });
}

async function getAds() {
  console.log('Fetching ads...');
  return fetchFromMeta(`/act_${AD_ACCOUNT_ID}/ads`, {
    fields: 'id,name,adset_id,campaign_id,status,created_time,updated_time',
    limit: 100
  });
}

async function getAccountInsights(datePreset = 'last_30d') {
  console.log(`Fetching account insights (${datePreset})...`);
  return fetchFromMeta(`/act_${AD_ACCOUNT_ID}/insights`, {
    fields: 'impressions,reach,clicks,cpc,cpm,ctr,spend,actions,cost_per_action_type',
    date_preset: datePreset
  });
}

async function getCampaignInsights(campaignId, datePreset = 'last_30d') {
  try {
    const data = await fetchFromMeta(`/${campaignId}/insights`, {
      fields: 'impressions,reach,clicks,cpc,cpm,ctr,spend,actions,cost_per_action_type',
      date_preset: datePreset
    });
    return data.data?.[0] || null;
  } catch (err) {
    console.warn(`  Could not fetch insights for campaign ${campaignId}:`, err.message);
    return null;
  }
}

function transformCampaign(campaign, insights) {
  return {
    id: `meta_campaign_${campaign.id}`,
    sourceId: campaign.id,
    source: 'meta_ads',
    name: campaign.name,
    status: campaign.status,
    objective: campaign.objective,

    budget: {
      daily: campaign.daily_budget ? parseInt(campaign.daily_budget) / 100 : null,
      lifetime: campaign.lifetime_budget ? parseInt(campaign.lifetime_budget) / 100 : null,
      currency: 'INR'
    },

    performance: insights ? {
      impressions: parseInt(insights.impressions) || 0,
      reach: parseInt(insights.reach) || 0,
      clicks: parseInt(insights.clicks) || 0,
      spend: parseFloat(insights.spend) || 0,
      cpc: parseFloat(insights.cpc) || 0,
      cpm: parseFloat(insights.cpm) || 0,
      ctr: parseFloat(insights.ctr) || 0,
      actions: parseActionsToObject(insights.actions),
      costPerAction: parseActionsToObject(insights.cost_per_action_type)
    } : null,

    metadata: {
      createdAt: campaign.created_time,
      updatedAt: campaign.updated_time,
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function transformAdSet(adset) {
  return {
    id: `meta_adset_${adset.id}`,
    sourceId: adset.id,
    source: 'meta_ads',
    campaignId: `meta_campaign_${adset.campaign_id}`,
    name: adset.name,
    status: adset.status,
    optimizationGoal: adset.optimization_goal,

    budget: {
      daily: adset.daily_budget ? parseInt(adset.daily_budget) / 100 : null,
      lifetime: adset.lifetime_budget ? parseInt(adset.lifetime_budget) / 100 : null
    },

    schedule: {
      startTime: adset.start_time,
      endTime: adset.end_time
    },

    targeting: adset.targeting ? {
      geoLocations: adset.targeting.geo_locations,
      ageMin: adset.targeting.age_min,
      ageMax: adset.targeting.age_max,
      genders: adset.targeting.genders,
      interests: adset.targeting.interests,
      behaviors: adset.targeting.behaviors,
      customAudiences: adset.targeting.custom_audiences
    } : null,

    metadata: {
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function transformAd(ad) {
  return {
    id: `meta_ad_${ad.id}`,
    sourceId: ad.id,
    source: 'meta_ads',
    campaignId: `meta_campaign_${ad.campaign_id}`,
    adsetId: `meta_adset_${ad.adset_id}`,
    name: ad.name,
    status: ad.status,

    metadata: {
      createdAt: ad.created_time,
      updatedAt: ad.updated_time,
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function parseActionsToObject(actions) {
  if (!actions || !Array.isArray(actions)) return {};
  return actions.reduce((acc, action) => {
    acc[action.action_type] = parseFloat(action.value) || 0;
    return acc;
  }, {});
}

function formatCurrency(amount) {
  if (!amount) return '₹0';
  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

async function main() {
  console.log('Starting Meta Ads data sync...\n');

  const outputDir = path.join(__dirname, '..', 'records');
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Fetch ad account info
  const account = await getAdAccount();
  console.log(`Ad Account: ${account.name}`);
  console.log(`Total Spend: ${formatCurrency(account.amount_spent / 100)}\n`);

  // Fetch campaigns
  const campaignsData = await getCampaigns();
  const rawCampaigns = campaignsData.data || [];
  console.log(`Found ${rawCampaigns.length} campaigns\n`);

  // Fetch insights for each campaign
  const campaigns = [];
  for (const campaign of rawCampaigns) {
    console.log(`Processing: ${campaign.name}`);
    const insights = await getCampaignInsights(campaign.id);
    campaigns.push(transformCampaign(campaign, insights));

    if (insights) {
      console.log(`  - Spend: ${formatCurrency(parseFloat(insights.spend))}, Clicks: ${insights.clicks}, CTR: ${parseFloat(insights.ctr).toFixed(2)}%`);
    }
  }

  // Fetch ad sets
  const adsetsData = await getAdSets();
  const adsets = (adsetsData.data || []).map(transformAdSet);
  console.log(`\nFetched ${adsets.length} ad sets`);

  // Fetch ads
  const adsData = await getAds();
  const ads = (adsData.data || []).map(transformAd);
  console.log(`Fetched ${ads.length} ads`);

  // Fetch account-level insights
  const accountInsightsData = await getAccountInsights();
  const accountInsights = accountInsightsData.data?.[0] || {};

  // Calculate totals
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.performance?.spend || 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.performance?.clicks || 0), 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.performance?.impressions || 0), 0);

  // Save campaigns
  await writeFile(
    path.join(outputDir, 'meta-ads-campaigns.json'),
    JSON.stringify({
      meta: {
        accountId: AD_ACCOUNT_ID,
        accountName: account.name,
        count: campaigns.length,
        totalSpend: totalSpend,
        syncedAt: new Date().toISOString(),
        source: 'meta-marketing-api'
      },
      records: campaigns
    }, null, 2)
  );

  // Save ad sets
  await writeFile(
    path.join(outputDir, 'meta-ads-adsets.json'),
    JSON.stringify({
      meta: {
        count: adsets.length,
        syncedAt: new Date().toISOString(),
        source: 'meta-marketing-api'
      },
      records: adsets
    }, null, 2)
  );

  // Save ads
  await writeFile(
    path.join(outputDir, 'meta-ads-ads.json'),
    JSON.stringify({
      meta: {
        count: ads.length,
        syncedAt: new Date().toISOString(),
        source: 'meta-marketing-api'
      },
      records: ads
    }, null, 2)
  );

  // Save account summary
  await writeFile(
    path.join(outputDir, 'meta-ads-summary.json'),
    JSON.stringify({
      account: {
        id: AD_ACCOUNT_ID,
        name: account.name,
        currency: account.currency,
        timezone: account.timezone_name
      },
      last30Days: {
        impressions: parseInt(accountInsights.impressions) || totalImpressions,
        reach: parseInt(accountInsights.reach) || 0,
        clicks: parseInt(accountInsights.clicks) || totalClicks,
        spend: parseFloat(accountInsights.spend) || totalSpend,
        cpc: parseFloat(accountInsights.cpc) || (totalSpend / totalClicks || 0),
        ctr: parseFloat(accountInsights.ctr) || (totalClicks / totalImpressions * 100 || 0),
        actions: parseActionsToObject(accountInsights.actions)
      },
      counts: {
        campaigns: campaigns.length,
        adsets: adsets.length,
        ads: ads.length,
        activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE').length
      },
      syncedAt: new Date().toISOString()
    }, null, 2)
  );

  console.log('\n' + '='.repeat(50));
  console.log('Meta Ads sync complete!');
  console.log('='.repeat(50));
  console.log(`\nSummary (Last 30 Days):`);
  console.log(`  Campaigns: ${campaigns.length} (${campaigns.filter(c => c.status === 'ACTIVE').length} active)`);
  console.log(`  Ad Sets: ${adsets.length}`);
  console.log(`  Ads: ${ads.length}`);
  console.log(`  Total Spend: ${formatCurrency(totalSpend)}`);
  console.log(`  Total Clicks: ${totalClicks.toLocaleString()}`);
  console.log(`  Impressions: ${totalImpressions.toLocaleString()}`);
  console.log(`  Avg CTR: ${totalImpressions ? (totalClicks / totalImpressions * 100).toFixed(2) : 0}%`);
  console.log(`\nFiles saved to: ${outputDir}`);
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
