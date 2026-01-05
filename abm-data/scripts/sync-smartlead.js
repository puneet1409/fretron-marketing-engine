#!/usr/bin/env node
/**
 * SmartLead Data Sync Script
 *
 * Fetches campaigns, leads, and statistics from SmartLead API
 * and stores them in the ABM data records.
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env') });

const API_KEY = process.env.SMARTLEAD_API_KEY;
const BASE_URL = 'https://server.smartlead.ai/api/v1';

if (!API_KEY) {
  console.error('Error: SMARTLEAD_API_KEY not found in .env file');
  process.exit(1);
}

async function fetchFromSmartLead(endpoint) {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SmartLead API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function getAllCampaigns() {
  console.log('Fetching campaigns...');
  const campaigns = await fetchFromSmartLead('/campaigns');
  return campaigns;
}

async function getCampaignStatistics(campaignId) {
  try {
    const stats = await fetchFromSmartLead(`/campaigns/${campaignId}/lead-statistics`);
    return stats;
  } catch (err) {
    console.warn(`  Could not fetch stats for campaign ${campaignId}:`, err.message);
    return null;
  }
}

async function getCampaignLeads(campaignId, limit = 100) {
  try {
    const leads = await fetchFromSmartLead(`/campaigns/${campaignId}/leads?offset=0&limit=${limit}`);
    return leads;
  } catch (err) {
    console.warn(`  Could not fetch leads for campaign ${campaignId}:`, err.message);
    return [];
  }
}

function transformCampaign(campaign, stats) {
  return {
    id: `sl_campaign_${campaign.id}`,
    sourceId: campaign.id,
    source: 'smartlead',
    name: campaign.name,
    status: campaign.status,

    settings: {
      timezone: campaign.timezone,
      trackOpens: campaign.track_opens,
      trackClicks: campaign.track_clicks,
      dailyLimit: campaign.max_emails_per_day,
    },

    statistics: stats ? {
      totalLeads: stats.total_leads || 0,
      contacted: stats.contacted || 0,
      opened: stats.opened || 0,
      clicked: stats.clicked || 0,
      replied: stats.replied || 0,
      bounced: stats.bounced || 0,
      unsubscribed: stats.unsubscribed || 0,
      openRate: stats.total_leads ? ((stats.opened || 0) / stats.total_leads * 100).toFixed(1) : 0,
      replyRate: stats.total_leads ? ((stats.replied || 0) / stats.total_leads * 100).toFixed(1) : 0,
    } : null,

    metadata: {
      createdAt: campaign.created_at,
      updatedAt: campaign.updated_at,
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function transformLead(lead, campaignId) {
  return {
    id: `sl_lead_${lead.id}`,
    sourceId: lead.id,
    source: 'smartlead',
    campaignId: `sl_campaign_${campaignId}`,

    contact: {
      email: lead.email,
      firstName: lead.first_name,
      lastName: lead.last_name,
      company: lead.company_name,
      phone: lead.phone,
      linkedin: lead.linkedin_profile,
    },

    status: {
      current: lead.lead_status,
      isContacted: lead.is_contacted,
      isOpened: lead.is_opened,
      isClicked: lead.is_clicked,
      isReplied: lead.is_replied,
      isBounced: lead.is_bounced,
      isUnsubscribed: lead.is_unsubscribed,
    },

    engagement: {
      openCount: lead.open_count || 0,
      clickCount: lead.click_count || 0,
      replyCount: lead.reply_count || 0,
      lastOpenedAt: lead.last_opened_at,
      lastClickedAt: lead.last_clicked_at,
      lastRepliedAt: lead.last_replied_at,
    },

    customFields: lead.custom_fields || {},

    metadata: {
      addedAt: lead.created_at,
      lastSyncedAt: new Date().toISOString()
    }
  };
}

async function main() {
  console.log('Starting SmartLead data sync...\n');

  const outputDir = path.join(__dirname, '..', 'records');
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Fetch all campaigns
  const rawCampaigns = await getAllCampaigns();
  console.log(`Found ${rawCampaigns.length} campaigns\n`);

  const campaigns = [];
  const allLeads = [];

  for (const campaign of rawCampaigns) {
    console.log(`Processing: ${campaign.name}`);

    // Fetch statistics
    const stats = await getCampaignStatistics(campaign.id);
    campaigns.push(transformCampaign(campaign, stats));

    // Fetch leads
    const leads = await getCampaignLeads(campaign.id);
    if (Array.isArray(leads)) {
      const transformedLeads = leads.map(l => transformLead(l, campaign.id));
      allLeads.push(...transformedLeads);
      console.log(`  - ${leads.length} leads`);
    }
  }

  // Calculate summary stats
  const statusCounts = {};
  allLeads.forEach(lead => {
    const status = lead.status.current || 'unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const totalReplied = allLeads.filter(l => l.status.isReplied).length;
  const totalOpened = allLeads.filter(l => l.status.isOpened).length;

  // Save campaigns
  await writeFile(
    path.join(outputDir, 'smartlead-campaigns.json'),
    JSON.stringify({
      meta: {
        count: campaigns.length,
        syncedAt: new Date().toISOString(),
        source: 'smartlead-api'
      },
      records: campaigns
    }, null, 2)
  );

  // Save leads
  await writeFile(
    path.join(outputDir, 'smartlead-leads.json'),
    JSON.stringify({
      meta: {
        count: allLeads.length,
        statusDistribution: statusCounts,
        syncedAt: new Date().toISOString(),
        source: 'smartlead-api'
      },
      records: allLeads
    }, null, 2)
  );

  console.log('\n' + '='.repeat(50));
  console.log('SmartLead sync complete!');
  console.log('='.repeat(50));
  console.log(`\nSummary:`);
  console.log(`  Campaigns: ${campaigns.length}`);
  console.log(`  Total Leads: ${allLeads.length}`);
  console.log(`  Opened: ${totalOpened} (${allLeads.length ? (totalOpened/allLeads.length*100).toFixed(1) : 0}%)`);
  console.log(`  Replied: ${totalReplied} (${allLeads.length ? (totalReplied/allLeads.length*100).toFixed(1) : 0}%)`);
  console.log(`\nFiles saved to: ${outputDir}`);
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
