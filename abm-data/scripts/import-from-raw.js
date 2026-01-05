#!/usr/bin/env node
/**
 * Import from Raw HubSpot Data
 *
 * Transforms raw HubSpot API responses to canonical ABM format.
 * Use after running sync-hubspot-incremental.js
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ABM_DATA_DIR = path.resolve(__dirname, '..');
const RECORDS_DIR = path.join(ABM_DATA_DIR, 'records');

// Industry normalization mapping
const INDUSTRY_MAP = {
  'IRON_AND_STEEL': 'steel',
  'STEEL': 'steel',
  'steel': 'steel',
  'BUILDING_MATERIALS': 'cement',
  'CEMENT': 'cement',
  'cement': 'cement',
  'MANUFACTURING': 'manufacturing',
  'manufacturing': 'manufacturing',
  'FMCG': 'fmcg',
  'fmcg': 'fmcg',
  'AUTOMOTIVE': 'auto_parts',
  'AUTO': 'auto_parts',
  'auto_parts': 'auto_parts',
  'CHEMICALS': 'chemical',
  'Chemical & Pharma': 'chemical',
  'chemical': 'chemical',
  'RETAIL': 'retail',
  'retail': 'retail',
  'PHARMACEUTICALS': 'pharma',
  'pharma': 'pharma'
};

// N-Level mapping based on Jen Abel framework
const N_LEVEL_TITLES = {
  'N': ['ceo', 'cfo', 'coo', 'md', 'managing director', 'chief executive', 'chief financial', 'chief operating'],
  'N-1': ['vp', 'vice president', 'head', 'director', 'gm', 'general manager', 'president'],
  'N-2': ['manager', 'lead', 'senior manager', 'assistant vice president', 'avp'],
  'N-3': ['executive', 'analyst', 'coordinator', 'associate', 'officer']
};

function normalizeIndustry(industry) {
  if (!industry) return null;
  const key = industry.toUpperCase().replace(/\s+/g, '_');
  return INDUSTRY_MAP[key] || INDUSTRY_MAP[industry] || 'other';
}

function getRevenueRange(revenue) {
  if (!revenue || revenue <= 0) return null;
  const crores = revenue;
  if (crores < 50) return '<50cr';
  if (crores < 100) return '50-100cr';
  if (crores < 200) return '100-200cr';
  if (crores < 500) return '200-500cr';
  if (crores < 1000) return '500-1000cr';
  if (crores < 2000) return '1000-2000cr';
  return '>2000cr';
}

function getEmployeeRange(count) {
  if (!count || count <= 0) return null;
  if (count < 100) return '<100';
  if (count < 500) return '100-500';
  if (count < 1000) return '500-1000';
  if (count < 5000) return '1000-5000';
  if (count < 10000) return '5000-10000';
  return '>10000';
}

function getNLevel(title) {
  if (!title) return null;
  const lowerTitle = title.toLowerCase();

  for (const [level, keywords] of Object.entries(N_LEVEL_TITLES)) {
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword)) {
        return level;
      }
    }
  }
  return 'N-3';
}

function getSeniority(title) {
  if (!title) return 'unknown';
  const lower = title.toLowerCase();

  if (/\b(ceo|cfo|coo|cto|cmo|chief|md|managing director)\b/.test(lower)) return 'c_level';
  if (/\b(vp|vice president|avp|svp|evp)\b/.test(lower)) return 'vp';
  if (/\b(director|head|gm|general manager)\b/.test(lower)) return 'director';
  if (/\b(manager|lead|supervisor)\b/.test(lower)) return 'manager';
  return 'individual_contributor';
}

function getDepartment(title) {
  if (!title) return null;
  const lower = title.toLowerCase();

  if (/\b(logistics|transport|fleet|shipping|dispatch)\b/.test(lower)) return 'logistics';
  if (/\b(supply chain|scm|procurement|sourcing)\b/.test(lower)) return 'supply_chain';
  if (/\b(operations|ops|plant|manufacturing)\b/.test(lower)) return 'operations';
  if (/\b(finance|cfo|accounts|treasury)\b/.test(lower)) return 'finance';
  if (/\b(it|technology|digital|cto|cio)\b/.test(lower)) return 'it';
  if (/\b(purchase|procurement|buying)\b/.test(lower)) return 'procurement';
  if (/\b(ceo|md|director|general manager|gm)\b/.test(lower)) return 'management';
  return 'other';
}

function calculateFitScore(account) {
  let score = 0;
  const breakdown = { industryScore: 0, sizeScore: 0, shipmentScore: 0, techStateScore: 0 };

  const industry = account.firmographics?.industryNormalized;
  if (['steel', 'cement', 'manufacturing'].includes(industry)) {
    breakdown.industryScore = 15;
  } else if (['fmcg', 'auto_parts', 'chemical'].includes(industry)) {
    breakdown.industryScore = 10;
  } else if (['retail', 'pharma'].includes(industry)) {
    breakdown.industryScore = 5;
  }

  const revRange = account.firmographics?.revenueRange;
  if (['200-500cr', '500-1000cr'].includes(revRange)) {
    breakdown.sizeScore = 15;
  } else if (['100-200cr', '1000-2000cr'].includes(revRange)) {
    breakdown.sizeScore = 10;
  } else if (['50-100cr', '>2000cr'].includes(revRange)) {
    breakdown.sizeScore = 5;
  } else if (account.firmographics?.employeeRange) {
    const empRange = account.firmographics.employeeRange;
    if (['1000-5000', '5000-10000'].includes(empRange)) {
      breakdown.sizeScore = 12;
    } else if (['500-1000', '>10000'].includes(empRange)) {
      breakdown.sizeScore = 8;
    } else {
      breakdown.sizeScore = 4;
    }
  }

  const empCount = account.firmographics?.employeeCount || 0;
  if (empCount >= 5000) breakdown.shipmentScore = 12;
  else if (empCount >= 1000) breakdown.shipmentScore = 8;
  else if (empCount >= 500) breakdown.shipmentScore = 5;

  breakdown.techStateScore = 10; // Default for unknown

  score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return { score, breakdown };
}

function classifyTier(fitScore) {
  if (fitScore >= 50) return 'tier1';
  if (fitScore >= 35) return 'tier2';
  if (fitScore >= 20) return 'tier3';
  return 'unclassified';
}

function transformCompany(company) {
  const props = company.properties || {};
  const companyId = company.id;

  const revenue = parseFloat(props.annualrevenue) || null;
  const employees = parseInt(props.numberofemployees) || null;

  const account = {
    id: `acc_${companyId}`,
    sourceId: companyId,
    source: 'hubspot',
    name: props.name || 'Unknown',
    domain: props.domain || null,

    firmographics: {
      industry: props.industry || null,
      industryNormalized: normalizeIndustry(props.industry),
      annualRevenue: revenue,
      revenueRange: getRevenueRange(revenue),
      employeeCount: employees,
      employeeRange: getEmployeeRange(employees),
      estimatedShipmentsPerDay: null,
      shipmentRange: null,
      plantCount: null,
      headquarters: {
        city: props.city || null,
        state: props.state || null,
        country: props.country || 'India'
      }
    },

    technographics: {
      currentState: null,
      currentTmsVendor: null,
      erpSystem: null,
      itMaturity: null
    },

    classification: {
      tier: 'unclassified',
      fitScore: 0,
      fitScoreBreakdown: { industryScore: 0, sizeScore: 0, shipmentScore: 0, techStateScore: 0 },
      intentScore: 0,
      priorityRank: null,
      classificationReason: null,
      lastClassifiedAt: new Date().toISOString()
    },

    lifecycle: {
      stage: 'target_account',
      stageEnteredAt: null,
      isCustomer: false,
      customerSince: null
    },

    warmup: {
      trustLevel: 1,
      trustLevelLabel: 'stranger',
      touchCount: 0,
      lastTouchAt: null,
      lastTouchChannel: null,
      engagementScore: 0,
      warmupCampaigns: []
    },

    triggers: {
      activeTrigger: null,
      triggerType: null,
      urgency: null,
      budgetCycle: null,
      triggerIdentifiedAt: null
    },

    contacts: {
      totalCount: 0,
      keyContactIds: [],
      hasChampion: false,
      hasEconomicBuyer: false,
      highestNLevel: null
    },

    deals: {
      activeDeals: [],
      wonDeals: [],
      lostDeals: [],
      totalDealValue: 0
    },

    notes: null,
    tags: [],

    metadata: {
      createdAt: company.createdAt || new Date().toISOString(),
      updatedAt: company.updatedAt || props.hs_lastmodifieddate || new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
      syncSource: 'hubspot-api'
    }
  };

  const { score, breakdown } = calculateFitScore(account);
  account.classification.fitScore = score;
  account.classification.fitScoreBreakdown = breakdown;
  account.classification.tier = classifyTier(score);
  account.classification.classificationReason = `Auto-classified based on fit score ${score}/60`;

  return account;
}

function transformContact(contact) {
  const props = contact.properties || {};
  const contactId = contact.id;

  const title = props.jobtitle || null;
  const nLevel = getNLevel(title);

  return {
    id: `con_${contactId}`,
    sourceId: contactId,
    source: 'hubspot',

    name: {
      firstName: props.firstname || null,
      lastName: props.lastname || null,
      fullName: [props.firstname, props.lastname].filter(Boolean).join(' ') || null
    },

    contact: {
      email: props.email || null,
      phone: props.phone || null,
      mobile: null,
      hasMobileNumber: false,
      linkedin: null,
      whatsapp: null
    },

    professional: {
      title: title,
      titleNormalized: title?.toLowerCase() || null,
      department: getDepartment(title),
      nLevel: nLevel,
      nLevelReason: title ? `Inferred from title: ${title}` : null,
      seniority: getSeniority(title),
      buyingRole: null,
      formerConsultant: false
    },

    account: {
      accountId: null,
      companyName: props.company || null,
      isPrimaryContact: false
    },

    lifecycle: {
      stage: props.lifecyclestage || 'lead',
      stageEnteredAt: null,
      isCustomer: props.lifecyclestage === 'customer'
    },

    warmup: {
      trustLevel: 1,
      trustLevelLabel: 'stranger',
      linkedinConnectionStatus: null,
      lastOutreachAt: null,
      lastOutreachChannel: null,
      outreachCount: 0,
      responseCount: 0,
      engagementScore: 0
    },

    engagement: {
      emailOpens: 0,
      emailClicks: 0,
      websiteVisits: 0,
      contentDownloads: 0,
      eventAttendance: 0,
      lastEngagementAt: null,
      lastEngagementType: null
    },

    qualification: {
      hasPersonalMobile: false,
      isNOrN1: ['N', 'N-1'].includes(nLevel),
      qualificationScore: ['N', 'N-1'].includes(nLevel) ? 50 : 20,
      qualificationNotes: null
    },

    deals: [],
    tags: [],
    notes: null,

    metadata: {
      createdAt: contact.createdAt || new Date().toISOString(),
      updatedAt: contact.updatedAt || props.hs_lastmodifieddate || new Date().toISOString(),
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function transformDeal(deal) {
  const props = deal.properties || {};
  const dealId = deal.id;

  const amount = parseFloat(props.amount) || 0;
  const stageId = props.dealstage;

  // Deal size category
  let dealSizeCategory = null;
  const amountInLakhs = amount / 100000;
  if (amountInLakhs < 10) dealSizeCategory = '<10L';
  else if (amountInLakhs < 25) dealSizeCategory = '10-25L';
  else if (amountInLakhs < 50) dealSizeCategory = '25-50L';
  else if (amountInLakhs < 100) dealSizeCategory = '50L-1Cr';
  else if (amountInLakhs < 200) dealSizeCategory = '1-2Cr';
  else dealSizeCategory = '>2Cr';

  const isLandDeal = ['25-50L'].includes(dealSizeCategory);
  const isExpandDeal = ['1-2Cr', '>2Cr'].includes(dealSizeCategory);

  const createDate = props.createdate ? new Date(props.createdate) : null;
  const now = new Date();
  const daysInPipeline = createDate ? Math.floor((now - createDate) / (1000 * 60 * 60 * 24)) : null;

  let salesCycleHealth = null;
  if (daysInPipeline !== null) {
    if (daysInPipeline <= 180) salesCycleHealth = 'healthy';
    else if (daysInPipeline <= 270) salesCycleHealth = 'at_risk';
    else salesCycleHealth = 'stalled';
  }

  return {
    id: `deal_${dealId}`,
    sourceId: dealId,
    source: 'hubspot',
    name: props.dealname || 'Unnamed Deal',

    pipeline: {
      id: props.pipeline || '',
      name: 'unknown'
    },

    stage: {
      id: stageId || '',
      name: 'unknown',
      stageNormalized: null,
      isClosed: false,
      isWon: false
    },

    value: {
      amount: amount,
      amountFormatted: formatCurrency(amount),
      dealSizeCategory: dealSizeCategory,
      isLandDeal: isLandDeal,
      isExpandDeal: isExpandDeal
    },

    timing: {
      createDate: props.createdate || null,
      closeDate: props.closedate || null,
      expectedCloseDate: props.closedate || null,
      daysInPipeline: daysInPipeline,
      daysInCurrentStage: null,
      salesCycleHealth: salesCycleHealth
    },

    associations: {
      accountId: null,
      accountName: null,
      contactIds: [],
      championId: null,
      economicBuyerId: null
    },

    qualification: {
      hasNOrN1Contact: false,
      hasCellPhoneAccess: false,
      hasCompellingEvent: false,
      hasTruncatedScope: isLandDeal,
      qualificationScore: isLandDeal ? 1 : 0,
      isFullyQualified: false
    },

    dealType: props.dealtype || null,
    industry: props.industry || null,
    businessUseCase: null,
    lossReason: null,
    competitorPresent: null,

    notes: null,
    tags: [],

    metadata: {
      createdAt: props.createdate || new Date().toISOString(),
      updatedAt: props.hs_lastmodifieddate || new Date().toISOString(),
      lastSyncedAt: new Date().toISOString()
    }
  };
}

function formatCurrency(amount) {
  if (!amount || amount === 0) return null;
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

async function main() {
  console.log('Starting import from raw HubSpot data...\n');

  if (!existsSync(RECORDS_DIR)) {
    await mkdir(RECORDS_DIR, { recursive: true });
  }

  // Import Companies
  console.log('Processing companies...');
  try {
    const companiesRaw = await readFile(path.join(RECORDS_DIR, 'hubspot-companies-raw.json'), 'utf-8');
    const companiesData = JSON.parse(companiesRaw);
    const companies = companiesData.results || [];

    const accounts = companies.map(transformCompany);

    const tierCounts = { tier1: 0, tier2: 0, tier3: 0, unclassified: 0 };
    accounts.forEach(a => tierCounts[a.classification.tier]++);

    console.log(`  Transformed ${accounts.length} companies to accounts`);
    console.log(`  Tier distribution: T1=${tierCounts.tier1}, T2=${tierCounts.tier2}, T3=${tierCounts.tier3}, Unclassified=${tierCounts.unclassified}`);

    await writeFile(
      path.join(RECORDS_DIR, 'accounts.json'),
      JSON.stringify({
        meta: {
          count: accounts.length,
          tierDistribution: tierCounts,
          importedAt: new Date().toISOString(),
          source: 'hubspot-api'
        },
        records: accounts
      }, null, 2)
    );
  } catch (err) {
    console.log(`  Skipped: ${err.message}`);
  }

  // Import Contacts
  console.log('\nProcessing contacts...');
  try {
    const contactsRaw = await readFile(path.join(RECORDS_DIR, 'hubspot-contacts-raw.json'), 'utf-8');
    const contactsData = JSON.parse(contactsRaw);
    const contactsList = contactsData.results || [];

    const contacts = contactsList.map(transformContact);

    const nLevelCounts = { 'N': 0, 'N-1': 0, 'N-2': 0, 'N-3': 0, 'null': 0 };
    contacts.forEach(c => {
      const level = c.professional.nLevel || 'null';
      nLevelCounts[level]++;
    });

    console.log(`  Transformed ${contacts.length} contacts`);
    console.log(`  N-Level distribution: N=${nLevelCounts['N']}, N-1=${nLevelCounts['N-1']}, N-2=${nLevelCounts['N-2']}, N-3=${nLevelCounts['N-3']}, Unknown=${nLevelCounts['null']}`);

    await writeFile(
      path.join(RECORDS_DIR, 'contacts.json'),
      JSON.stringify({
        meta: {
          count: contacts.length,
          nLevelDistribution: nLevelCounts,
          importedAt: new Date().toISOString(),
          source: 'hubspot-api'
        },
        records: contacts
      }, null, 2)
    );
  } catch (err) {
    console.log(`  Skipped: ${err.message}`);
  }

  // Import Deals
  console.log('\nProcessing deals...');
  try {
    const dealsRaw = await readFile(path.join(RECORDS_DIR, 'hubspot-deals-raw.json'), 'utf-8');
    const dealsData = JSON.parse(dealsRaw);
    const dealsList = dealsData.results || [];

    const deals = dealsList.map(transformDeal);

    const sizeCounts = {};
    deals.forEach(d => {
      const size = d.value.dealSizeCategory || 'unknown';
      sizeCounts[size] = (sizeCounts[size] || 0) + 1;
    });

    console.log(`  Transformed ${deals.length} deals`);
    console.log(`  Size distribution:`, sizeCounts);

    await writeFile(
      path.join(RECORDS_DIR, 'deals.json'),
      JSON.stringify({
        meta: {
          count: deals.length,
          sizeDistribution: sizeCounts,
          importedAt: new Date().toISOString(),
          source: 'hubspot-api'
        },
        records: deals
      }, null, 2)
    );
  } catch (err) {
    console.log(`  Skipped: ${err.message}`);
  }

  console.log('\n✅ Import complete!');
}

main().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
