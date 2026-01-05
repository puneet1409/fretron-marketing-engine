import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = 'C:\\Users\\punee\\Dev\\cjdarcl-bu-sectorwise-restructuring\\research\\outputs\\STRATEGIC_ACCOUNTS_MASTER_CLEAN.xlsx';
const outputPath = path.join(__dirname, '..', 'records', 'strategic-accounts-tiered.json');

const workbook = XLSX.readFile(inputPath);

// Get All_Accounts sheet
const allAccounts = XLSX.utils.sheet_to_json(workbook.Sheets['All_Accounts']);

// Tier accounts based on logistics spend and revenue
const tieredAccounts = allAccounts.map(acc => {
  const logisticsSpend = parseFloat(acc.Total_Logistics_Spend_Rs_Cr) || 0;
  const revenue = parseFloat(acc.Sales_Rs_Cr) || 0;
  const employees = parseInt(acc.Employees) || 0;

  let tier;
  if (logisticsSpend >= 100 || revenue >= 5000) {
    tier = 'Tier1';
  } else if (logisticsSpend >= 20 || revenue >= 500) {
    tier = 'Tier2';
  } else {
    tier = 'Tier3';
  }

  // Map to Fretron segments
  let fretronSegment;
  const cat = (acc.Category || '').toLowerCase();
  if (cat.includes('steel') || cat.includes('metal')) fretronSegment = 'Steel & Metals';
  else if (cat.includes('fmcg') || cat.includes('consumer')) fretronSegment = 'FMCG';
  else if (cat.includes('chemical') || cat.includes('petro')) fretronSegment = 'Chemical';
  else if (cat.includes('cement') || cat.includes('building')) fretronSegment = 'Cement';
  else if (cat.includes('auto')) fretronSegment = 'Auto & Engineering';
  else if (cat.includes('pharma')) fretronSegment = 'Pharma';
  else if (cat.includes('agri') || cat.includes('food')) fretronSegment = 'Agri & Food';
  else fretronSegment = 'Other';

  return {
    company: acc.Company,
    category: acc.Category,
    segment: acc.Segment,
    subSegment: acc.Sub_Segment,
    accountType: acc.Account_Type,
    hq: acc.HQ,
    keyLocations: acc.Key_Locations,
    totalPlants: acc.Total_Plants,
    salesCr: revenue,
    employees: employees,
    logisticsSpendCr: logisticsSpend,
    fgTransportCr: parseFloat(acc.FG_Transport_Rs_Cr) || 0,
    inboundCr: parseFloat(acc.Inbound_Rs_Cr) || 0,
    keyProducts: acc.Key_Products,
    keyRawMaterials: acc.Key_Raw_Materials,
    notes: acc.Notes,
    tier: tier,
    fretronSegment: fretronSegment,
    priority: acc.Priority || ''
  };
});

// Stats
const tier1 = tieredAccounts.filter(a => a.tier === 'Tier1');
const tier2 = tieredAccounts.filter(a => a.tier === 'Tier2');
const tier3 = tieredAccounts.filter(a => a.tier === 'Tier3');

console.log('=== TIERED ACCOUNTS SUMMARY ===');
console.log('Total Accounts:', tieredAccounts.length);
console.log('Tier 1 (₹100Cr+ logistics or ₹5000Cr+ revenue):', tier1.length);
console.log('Tier 2 (₹20-100Cr logistics or ₹500-5000Cr revenue):', tier2.length);
console.log('Tier 3 (Rest):', tier3.length);

console.log('\n=== TIER 1 TOP ACCOUNTS ===');
tier1.sort((a,b) => b.logisticsSpendCr - a.logisticsSpendCr).slice(0,20).forEach((a,i) => {
  console.log((i+1) + '. ' + a.company + ' | ' + a.fretronSegment + ' | ₹' + a.logisticsSpendCr + 'Cr logistics | ' + a.accountType);
});

console.log('\n=== SEGMENT BREAKDOWN ===');
const segmentCounts = {};
tieredAccounts.forEach(a => {
  segmentCounts[a.fretronSegment] = (segmentCounts[a.fretronSegment] || 0) + 1;
});
Object.entries(segmentCounts).sort((a,b) => b[1] - a[1]).forEach(([seg, count]) => {
  console.log(seg + ':', count);
});

console.log('\n=== BY TIER & SEGMENT ===');
['Tier1', 'Tier2', 'Tier3'].forEach(tier => {
  console.log('\n' + tier + ':');
  const tierAccs = tieredAccounts.filter(a => a.tier === tier);
  const segCounts = {};
  tierAccs.forEach(a => {
    segCounts[a.fretronSegment] = (segCounts[a.fretronSegment] || 0) + 1;
  });
  Object.entries(segCounts).sort((a,b) => b[1] - a[1]).forEach(([seg, count]) => {
    console.log('  ' + seg + ':', count);
  });
});

// Save to JSON
fs.writeFileSync(outputPath, JSON.stringify(tieredAccounts, null, 2));
console.log('\n✓ Saved', tieredAccounts.length, 'accounts to', outputPath);

// Also save tier-specific files
fs.writeFileSync(outputPath.replace('.json', '-tier1.json'), JSON.stringify(tier1, null, 2));
fs.writeFileSync(outputPath.replace('.json', '-tier2.json'), JSON.stringify(tier2, null, 2));
console.log('✓ Saved tier-specific files');
