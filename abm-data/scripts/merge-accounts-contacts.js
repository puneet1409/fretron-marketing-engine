import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load strategic accounts
const strategicAccounts = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'records', 'strategic-accounts-tiered.json'), 'utf8')
);

// Load existing marketing contacts from Vikas folder
const marketingDbPath = 'I:\\.shortcut-targets-by-id\\1tHXSNjczn6Do_8oeIDjbcKy7K95_cNe3\\Vikas Fretron Marketing New (XLSX)\\FRETRON MARKETING_Vikas\\Email Campaigns - Smartlead\\Dataset\\Marketing Database - Mastersheet.xlsx';

let existingContacts = [];
try {
  const workbook = XLSX.readFile(marketingDbPath);
  ['FMCGFMCD', 'Steel new', 'Chemical', 'Steel', 'Retail'].forEach(sheetName => {
    if (workbook.Sheets[sheetName]) {
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      existingContacts = existingContacts.concat(data.map(row => ({
        name: row['Full Name'] || row['First Name'] + ' ' + (row['Last Name'] || ''),
        email: row['Email'] || row['Email ID'],
        company: row['Company Name'] || row['Company'],
        title: row['Job Title'] || row['Title'],
        linkedin: row['LinkedIn Profile'] || row['Linkedin Profile'] || row['Person Linkedin Url'],
        industry: row['Industry'] || row['Normalised Inudstry'],
        source: sheetName
      })));
    }
  });
} catch (e) {
  console.log('Note: Could not load marketing database -', e.message);
}

console.log('=== DATA LOADED ===');
console.log('Strategic Accounts:', strategicAccounts.length);
console.log('Existing Contacts:', existingContacts.length);

// Normalize company names for matching - stricter version
function normalizeCompany(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/\s*(pvt\.?|private|ltd\.?|limited|inc\.?|incorporated|llp|plc|corp\.?|corporation|co\.?|company|india|group|industries|enterprises)\s*/gi, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract core company name (first 2-3 significant words)
function getCoreCompanyName(name) {
  const normalized = normalizeCompany(name);
  const words = normalized.split(' ').filter(w => w.length > 2);
  return words.slice(0, 2).join(' '); // First 2 significant words
}

// Match contacts to strategic accounts - STRICT matching
const accountsWithContacts = [];
const accountsWithoutContacts = [];

strategicAccounts.forEach(account => {
  const accountCore = getCoreCompanyName(account.company);
  if (!accountCore || accountCore.length < 3) {
    accountsWithoutContacts.push(account);
    return;
  }

  const matchingContacts = existingContacts.filter(contact => {
    const contactCore = getCoreCompanyName(contact.company);
    if (!contactCore || contactCore.length < 3) return false;

    // Exact match on core name
    if (contactCore === accountCore) return true;

    // One contains the other fully (for longer names)
    if (accountCore.length >= 6 && contactCore.length >= 6) {
      if (contactCore.includes(accountCore) || accountCore.includes(contactCore)) return true;
    }

    return false;
  });

  if (matchingContacts.length > 0) {
    accountsWithContacts.push({
      ...account,
      contacts: matchingContacts,
      contactCount: matchingContacts.length
    });
  } else {
    accountsWithoutContacts.push(account);
  }
});

console.log('\n=== MATCHING RESULTS ===');
console.log('Accounts WITH contacts:', accountsWithContacts.length);
console.log('Accounts WITHOUT contacts:', accountsWithoutContacts.length);

// Breakdown by tier
console.log('\n=== GAP ANALYSIS BY TIER ===');
['Tier1', 'Tier2', 'Tier3'].forEach(tier => {
  const withContacts = accountsWithContacts.filter(a => a.tier === tier).length;
  const withoutContacts = accountsWithoutContacts.filter(a => a.tier === tier).length;
  const total = withContacts + withoutContacts;
  console.log(`${tier}: ${withContacts}/${total} have contacts (${Math.round(withContacts/total*100)}% coverage)`);
});

// Priority gaps - Tier 1 without contacts
console.log('\n=== PRIORITY GAPS: TIER 1 WITHOUT CONTACTS ===');
const tier1Gaps = accountsWithoutContacts
  .filter(a => a.tier === 'Tier1')
  .sort((a, b) => b.logisticsSpendCr - a.logisticsSpendCr)
  .slice(0, 30);

tier1Gaps.forEach((a, i) => {
  console.log(`${i+1}. ${a.company} | ${a.fretronSegment} | ₹${a.logisticsSpendCr}Cr | ${a.hq || 'HQ unknown'}`);
});

// Save outputs
const outputDir = path.join(__dirname, '..', 'records');

// Accounts with contacts - enriched
fs.writeFileSync(
  path.join(outputDir, 'accounts-with-contacts.json'),
  JSON.stringify(accountsWithContacts, null, 2)
);

// Accounts needing contacts - for Bitscale enrichment
fs.writeFileSync(
  path.join(outputDir, 'accounts-need-contacts.json'),
  JSON.stringify(accountsWithoutContacts, null, 2)
);

// Priority Tier 1 gaps for immediate action
fs.writeFileSync(
  path.join(outputDir, 'tier1-priority-gaps.json'),
  JSON.stringify(tier1Gaps, null, 2)
);

// Create CSV for Bitscale import
const bitscaleCsv = [
  ['Company', 'Website', 'Industry', 'HQ', 'Employees', 'Revenue_Cr', 'Logistics_Spend_Cr', 'Tier', 'Account_Type', 'Key_Locations'].join(',')
];

accountsWithoutContacts.filter(a => a.tier === 'Tier1' || a.tier === 'Tier2').forEach(a => {
  bitscaleCsv.push([
    `"${(a.company || '').replace(/"/g, '""')}"`,
    '',  // website to be enriched
    `"${a.fretronSegment}"`,
    `"${(a.hq || '').replace(/"/g, '""')}"`,
    a.employees || '',
    a.salesCr || '',
    a.logisticsSpendCr || '',
    a.tier,
    a.accountType || '',
    `"${(a.keyLocations || '').replace(/"/g, '""')}"`
  ].join(','));
});

fs.writeFileSync(
  path.join(outputDir, 'bitscale-import-accounts.csv'),
  bitscaleCsv.join('\n')
);

console.log('\n=== FILES SAVED ===');
console.log('✓ accounts-with-contacts.json');
console.log('✓ accounts-need-contacts.json');
console.log('✓ tier1-priority-gaps.json');
console.log('✓ bitscale-import-accounts.csv (ready for Bitscale import)');

// Summary stats
console.log('\n=== NEXT STEPS ===');
console.log(`1. Import bitscale-import-accounts.csv to Bitscale (${accountsWithoutContacts.filter(a => a.tier !== 'Tier3').length} accounts)`);
console.log('2. Use "Find People from Company" to discover contacts');
console.log('3. Enrich with email/phone waterfalls');
console.log('4. Push to SmartLead for outreach');
