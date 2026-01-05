#!/usr/bin/env node
/**
 * HubSpot Data Import and Transformation Script
 *
 * Imports data from HubSpot cache (fretron-sales-playbook) and transforms
 * it to the canonical ABM data model with tier classification.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ABM_DATA_DIR = path.resolve(__dirname, '..');
const HUBSPOT_CACHE_DIR = 'C:/Users/punee/Dev/fretron-sales-playbook/integrations/hubspot/cache';

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
  const crores = revenue; // Assuming already in crores
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
  return 'N-3'; // Default to lowest level
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

/**
 * Calculate ICP fit score (0-60 points)
 */
function calculateFitScore(account) {
  let score = 0;
  const breakdown = { industryScore: 0, sizeScore: 0, shipmentScore: 0, techStateScore: 0 };

  // Industry score (15 points max)
  const industry = account.firmographics?.industryNormalized;
  if (['steel', 'cement', 'manufacturing'].includes(industry)) {
    breakdown.industryScore = 15;
  } else if (['fmcg', 'auto_parts', 'chemical'].includes(industry)) {
    breakdown.industryScore = 10;
  } else if (['retail', 'pharma'].includes(industry)) {
    breakdown.industryScore = 5;
  }

  // Size score (15 points max) - based on revenue or employee count
  const revRange = account.firmographics?.revenueRange;
  if (['200-500cr', '500-1000cr'].includes(revRange)) {
    breakdown.sizeScore = 15;
  } else if (['100-200cr', '1000-2000cr'].includes(revRange)) {
    breakdown.sizeScore = 10;
  } else if (['50-100cr', '>2000cr'].includes(revRange)) {
    breakdown.sizeScore = 5;
  } else if (account.firmographics?.employeeRange) {
    // Fallback to employee count if no revenue
    const empRange = account.firmographics.employeeRange;
    if (['1000-5000', '5000-10000'].includes(empRange)) {
      breakdown.sizeScore = 12;
    } else if (['500-1000', '>10000'].includes(empRange)) {
      breakdown.sizeScore = 8;
    } else {
      breakdown.sizeScore = 4;
    }
  }

  // Shipment score (15 points max) - estimate from employee count if not available
  const shipRange = account.firmographics?.shipmentRange;
  if (shipRange === '100-500') {
    breakdown.shipmentScore = 15;
  } else if (['50-100', '500-1000'].includes(shipRange)) {
    breakdown.shipmentScore = 10;
  } else if (['20-50', '>1000'].includes(shipRange)) {
    breakdown.shipmentScore = 5;
  } else {
    // Estimate from employee count
    const empCount = account.firmographics?.employeeCount || 0;
    if (empCount >= 5000) breakdown.shipmentScore = 12;
    else if (empCount >= 1000) breakdown.shipmentScore = 8;
    else if (empCount >= 500) breakdown.shipmentScore = 5;
  }

  // Tech state score (15 points max) - default to 10 if unknown
  const techState = account.technographics?.currentState;
  if (techState === 'excel_manual') {
    breakdown.techStateScore = 15;
  } else if (techState === 'partial_digitization') {
    breakdown.techStateScore = 10;
  } else if (techState === 'legacy_tms') {
    breakdown.techStateScore = 5;
  } else {
    breakdown.techStateScore = 10; // Unknown - assume middle ground
  }

  score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return { score, breakdown };
}

/**
 * Classify account into tier based on fit score
 */
function classifyTier(fitScore) {
  if (fitScore >= 50) return 'tier1';
  if (fitScore >= 35) return 'tier2';
  if (fitScore >= 20) return 'tier3';
  return 'unclassified';
}

/**
 * Transform HubSpot company to canonical Account
 */
function transformCompanyToAccount(company, dealsMap = {}, contactsMap = {}) {
  const props = company.properties || {};
  const companyId = company.id || props.hs_object_id;

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
      estimatedShipmentsPerDay: null, // Would need manual enrichment
      shipmentRange: null,
      plantCount: null,
      headquarters: {
        city: props.city || null,
        state: props.state || null,
        country: props.country || 'India'
      }
    },

    technographics: {
      currentState: null, // Would need enrichment
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
      updatedAt: company.updatedAt || new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
      syncSource: 'hubspot-cache'
    }
  };

  // Calculate fit score and tier
  const { score, breakdown } = calculateFitScore(account);
  account.classification.fitScore = score;
  account.classification.fitScoreBreakdown = breakdown;
  account.classification.tier = classifyTier(score);
  account.classification.classificationReason = `Auto-classified based on fit score ${score}/60`;

  return account;
}

/**
 * Transform HubSpot contact to canonical Contact
 */
function transformContact(contact, accountMap = {}) {
  const props = contact.properties || {};
  const contactId = contact.id || props.hs_object_id;

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
      mobile: null, // Would need enrichment
      hasMobileNumber: false,
      linkedin: null,
      whatsapp: null
    },

    professional: {
      title: title,
      titleNormalized: title?.toLowerCase() || null,
      department: getDepartment(title),
      nLevel: nLevel,
      nLevelReason: `Inferred from title: ${title}`,
      seniority: getSeniority(title),
      buyingRole: null,
      formerConsultant: false
    },

    account: {
      accountId: null, // Will be linked during association
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
      updatedAt: contact.updatedAt || new Date().toISOString(),
      lastSyncedAt: new Date().toISOString()
    }
  };
}

/**
 * Transform HubSpot deal to canonical Deal
 */
function transformDeal(deal, stageLookup = {}) {
  const props = deal.deal_info?.properties || deal.properties || {};
  const dealId = deal.deal_info?.id || deal.id || props.hs_object_id;

  const amount = parseFloat(props.amount) || 0;
  const stageId = props.dealstage;
  const stageInfo = stageLookup[stageId] || {};
  const stageName = stageInfo.stageName || 'Unknown';

  // Determine if closed
  const isClosed = stageInfo.isClosed === true ||
                   stageName.toLowerCase().includes('closed') ||
                   props.hs_is_closed === 'true' ||
                   ['closedwon', 'closedlost', 'closed won', 'closed lost'].some(s =>
                     stageName.toLowerCase().includes(s));
  const isWon = stageName.toLowerCase().includes('won');

  // Normalize stage
  let stageNormalized = 'other';
  const lowerStage = stageName.toLowerCase();
  if (lowerStage.includes('problem identification')) stageNormalized = 'problem_identification';
  else if (lowerStage.includes('problem validation')) stageNormalized = 'problem_validation';
  else if (lowerStage.includes('exec') || lowerStage.includes('sponsor')) stageNormalized = 'exec_sponsor_securing';
  else if (lowerStage.includes('approach')) stageNormalized = 'approach_confirmation';
  else if (lowerStage.includes('vendor')) stageNormalized = 'vendor_confirmation';
  else if (lowerStage.includes('timeline')) stageNormalized = 'timeline_on_track';
  else if (lowerStage.includes('negotiation')) stageNormalized = 'negotiation';
  else if (lowerStage.includes('closed won') || lowerStage.includes('closedwon')) stageNormalized = 'closed_won';
  else if (lowerStage.includes('closed lost') || lowerStage.includes('closedlost')) stageNormalized = 'closed_lost';
  else if (lowerStage.includes('future') || lowerStage.includes('pipeline')) stageNormalized = 'future_pipeline';
  else if (lowerStage.includes('new lead') || lowerStage.includes('marketing')) stageNormalized = 'new_lead';

  // Deal size category (Jen Abel)
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

  // Calculate days in pipeline
  const createDate = props.createdate ? new Date(props.createdate) : null;
  const closeDate = props.closedate ? new Date(props.closedate) : null;
  const now = new Date();
  const daysInPipeline = createDate ? Math.floor((closeDate || now - createDate) / (1000 * 60 * 60 * 24)) : null;

  // Sales cycle health (Jen Abel: 3-6 months normal, 9+ self-inflicted)
  let salesCycleHealth = null;
  if (daysInPipeline !== null && !isClosed) {
    if (daysInPipeline <= 180) salesCycleHealth = 'healthy';
    else if (daysInPipeline <= 270) salesCycleHealth = 'at_risk';
    else salesCycleHealth = 'stalled';
  }

  // Extract contacts from deal
  const contactIds = (deal.contacts || []).map(c => `con_${c.id}`);

  return {
    id: `deal_${dealId}`,
    sourceId: dealId,
    source: 'hubspot',
    name: props.dealname || 'Unnamed Deal',

    pipeline: {
      id: props.pipeline || '',
      name: props.pipeline === '3082153' ? 'enterprise' : 'sme' // Based on cache data
    },

    stage: {
      id: stageId || '',
      name: stageName,
      stageNormalized: stageNormalized,
      isClosed: isClosed,
      isWon: isWon
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
      accountId: null, // Would need company association
      accountName: null,
      contactIds: contactIds,
      championId: null,
      economicBuyerId: null
    },

    qualification: {
      hasNOrN1Contact: false, // Will be computed after contact linking
      hasCellPhoneAccess: false,
      hasCompellingEvent: false,
      hasTruncatedScope: isLandDeal,
      qualificationScore: isLandDeal ? 1 : 0,
      isFullyQualified: false
    },

    dealType: props.dealtype || null,
    industry: props.industry || null,
    businessUseCase: props.business_use_case || null,
    lossReason: null,
    competitorPresent: props.current_tms_vendor || null,

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

async function loadStageLookup() {
  try {
    const data = await readFile(path.join(HUBSPOT_CACHE_DIR, 'pipelines', 'stage-lookup.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.warn('Could not load stage lookup:', err.message);
    return {};
  }
}

async function main() {
  console.log('Starting HubSpot data import...\n');

  // Ensure output directories exist
  const outputDir = path.join(ABM_DATA_DIR, 'records');
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Load stage lookup
  const stageLookup = await loadStageLookup();
  console.log(`Loaded ${Object.keys(stageLookup).length} stage mappings\n`);

  // Import Companies -> Accounts
  console.log('Importing companies...');
  const companiesRaw = await readFile(path.join(HUBSPOT_CACHE_DIR, 'companies', 'all-companies.json'), 'utf-8');
  const companiesData = JSON.parse(companiesRaw);
  const companies = companiesData.results || companiesData;

  const accounts = companies.map(c => transformCompanyToAccount(c));

  // Tier distribution
  const tierCounts = { tier1: 0, tier2: 0, tier3: 0, unclassified: 0 };
  accounts.forEach(a => tierCounts[a.classification.tier]++);

  console.log(`  Transformed ${accounts.length} companies to accounts`);
  console.log(`  Tier distribution: T1=${tierCounts.tier1}, T2=${tierCounts.tier2}, T3=${tierCounts.tier3}, Unclassified=${tierCounts.unclassified}\n`);

  await writeFile(
    path.join(outputDir, 'accounts.json'),
    JSON.stringify({
      meta: {
        count: accounts.length,
        tierDistribution: tierCounts,
        importedAt: new Date().toISOString(),
        source: 'hubspot-cache'
      },
      records: accounts
    }, null, 2)
  );

  // Import Deals
  console.log('Importing deals...');
  const dealsRaw = await readFile(path.join(HUBSPOT_CACHE_DIR, 'hubspot_closed_won_comprehensive.json'), 'utf-8');
  const dealsData = JSON.parse(dealsRaw);
  const deals = (dealsData.deals || []).map(d => transformDeal(d, stageLookup));

  // Also import all deals
  const allDealsRaw = await readFile(path.join(HUBSPOT_CACHE_DIR, 'deals', 'all-deals.json'), 'utf-8');
  const allDealsData = JSON.parse(allDealsRaw);
  const allDealsList = allDealsData.results || allDealsData;
  const allDeals = allDealsList.map(d => transformDeal({ deal_info: d }, stageLookup));

  // Merge, preferring comprehensive data
  const dealMap = new Map();
  allDeals.forEach(d => dealMap.set(d.id, d));
  deals.forEach(d => dealMap.set(d.id, d)); // Overwrite with comprehensive data

  const mergedDeals = Array.from(dealMap.values());

  // Stage distribution
  const stageCounts = {};
  mergedDeals.forEach(d => {
    const stage = d.stage.stageNormalized;
    stageCounts[stage] = (stageCounts[stage] || 0) + 1;
  });

  console.log(`  Transformed ${mergedDeals.length} deals`);
  console.log(`  Stage distribution:`, stageCounts, '\n');

  await writeFile(
    path.join(outputDir, 'deals.json'),
    JSON.stringify({
      meta: {
        count: mergedDeals.length,
        stageDistribution: stageCounts,
        importedAt: new Date().toISOString(),
        source: 'hubspot-cache'
      },
      records: mergedDeals
    }, null, 2)
  );

  // Import Contacts from comprehensive deals data
  console.log('Importing contacts...');
  const contactMap = new Map();

  (dealsData.deals || []).forEach(deal => {
    (deal.contacts || []).forEach(c => {
      const contact = transformContact(c);
      contactMap.set(contact.id, contact);
    });
  });

  const contacts = Array.from(contactMap.values());

  // N-Level distribution
  const nLevelCounts = { 'N': 0, 'N-1': 0, 'N-2': 0, 'N-3': 0, 'null': 0 };
  contacts.forEach(c => {
    const level = c.professional.nLevel || 'null';
    nLevelCounts[level]++;
  });

  console.log(`  Transformed ${contacts.length} contacts`);
  console.log(`  N-Level distribution:`, nLevelCounts, '\n');

  await writeFile(
    path.join(outputDir, 'contacts.json'),
    JSON.stringify({
      meta: {
        count: contacts.length,
        nLevelDistribution: nLevelCounts,
        importedAt: new Date().toISOString(),
        source: 'hubspot-cache'
      },
      records: contacts
    }, null, 2)
  );

  // Create summary
  const summary = {
    importedAt: new Date().toISOString(),
    source: 'hubspot-cache',
    sourceDir: HUBSPOT_CACHE_DIR,
    counts: {
      accounts: accounts.length,
      contacts: contacts.length,
      deals: mergedDeals.length
    },
    distributions: {
      accountTiers: tierCounts,
      contactNLevels: nLevelCounts,
      dealStages: stageCounts
    },
    abmInsights: {
      tier1Accounts: tierCounts.tier1,
      qualifiedContacts: contacts.filter(c => c.qualification.isNOrN1).length,
      landDeals: mergedDeals.filter(d => d.value.isLandDeal).length,
      healthyDeals: mergedDeals.filter(d => d.timing.salesCycleHealth === 'healthy').length,
      stalledDeals: mergedDeals.filter(d => d.timing.salesCycleHealth === 'stalled').length
    }
  };

  await writeFile(
    path.join(outputDir, 'import-summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('='.repeat(50));
  console.log('Import complete!');
  console.log('='.repeat(50));
  console.log(`\nSummary:`);
  console.log(`  Accounts: ${summary.counts.accounts}`);
  console.log(`  Contacts: ${summary.counts.contacts}`);
  console.log(`  Deals: ${summary.counts.deals}`);
  console.log(`\nABM Insights:`);
  console.log(`  Tier 1 Accounts: ${summary.abmInsights.tier1Accounts}`);
  console.log(`  N/N-1 Contacts: ${summary.abmInsights.qualifiedContacts}`);
  console.log(`  Land Deals (₹25-50L): ${summary.abmInsights.landDeals}`);
  console.log(`  Stalled Deals (9+ months): ${summary.abmInsights.stalledDeals}`);
  console.log(`\nFiles saved to: ${outputDir}`);
}

main().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
