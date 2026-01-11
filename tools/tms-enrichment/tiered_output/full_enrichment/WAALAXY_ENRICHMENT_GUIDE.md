# Waalaxy Contact Enrichment Guide for Tier A Accounts

## Quick Setup (5 minutes)

### Step 1: Create a Campaign in Waalaxy

1. Open Waalaxy → **Campaigns** → **Create Campaign**
2. Name it: `Tier A - Logistics Decision Makers`
3. Select campaign type: **LinkedIn Search** or **Sales Navigator Search**

### Step 2: Import Company List

**Option A: Direct LinkedIn Search (Per Company)**
1. Go to LinkedIn → Search
2. Search: `"VP Supply Chain" OR "Director Logistics" at Vedanta Aluminium`
3. Use Waalaxy extension to import results
4. Repeat for each company

**Option B: Sales Navigator (Bulk - Recommended)**
1. Open Sales Navigator
2. Use this search filter:
   - **Current Company**: Paste company names from list below
   - **Title**: Use title filters below
   - **Seniority**: VP, Director, CXO, Owner, Partner
3. Import all results to Waalaxy campaign

### Step 3: Title Filters for Sales Navigator

Copy-paste these into Sales Navigator title filter:

**Primary Targets (Logistics/Supply Chain):**
```
VP Logistics OR VP Supply Chain OR VP Operations OR VP Procurement OR
Director Logistics OR Director Supply Chain OR Director Operations OR
Head of Logistics OR Head of Supply Chain OR Head of Operations OR
Chief Supply Chain Officer OR CSCO OR COO OR Chief Operating Officer OR
General Manager Logistics OR GM Supply Chain OR GM Operations OR
DGM Logistics OR AGM Supply Chain OR Plant Head OR Works Manager
```

**Secondary Targets (IT/Digital):**
```
CIO OR VP IT OR Director IT OR Head of IT OR
VP Digital Transformation OR Head Digital OR CTO
```

---

## Company List (22 Tier A Accounts)

| Priority | Company | LinkedIn URL |
|----------|---------|--------------|
| 1 | Vedanta Aluminium | linkedin.com/company/vedanta-aluminium |
| 2 | Mahindra & Mahindra | linkedin.com/company/mahindra-and-mahindra |
| 3 | Hindalco Industries | linkedin.com/company/hindalco |
| 4 | Hindustan Unilever | linkedin.com/company/hindustan-unilever |
| 5 | Tata Motors | linkedin.com/company/tata-motors |
| 6 | Coal India Ltd | linkedin.com/company/coal-india-limited |
| 7 | BPCL | linkedin.com/company/bharatpetroleum |
| 8 | IOCL | linkedin.com/company/indianoilcorporation |
| 9 | Amul (GCMMF) | linkedin.com/company/amul-gcmmf |
| 10 | Maruti Suzuki | linkedin.com/company/maruti-suzuki-india-limited |
| 11 | Reliance Industries | linkedin.com/company/reliance-industries-limited |
| 12 | HPCL | linkedin.com/company/hindustan-petroleum-corporation-limited |
| 13 | Nestle India | linkedin.com/company/nestleindia |
| 14 | Vedanta Ltd | linkedin.com/company/vedanta-limited |
| 15 | SAIL | linkedin.com/company/steel-authority-of-india-limited |
| 16 | Berger Paints | linkedin.com/company/berger-paints-india |
| 17 | Adani Wilmar | linkedin.com/company/adani-wilmar-limited |
| 18 | Asian Paints | linkedin.com/company/asian-paints-limited |
| 19 | FCI | linkedin.com/company/food-corporation-of-india |
| 20 | GAIL India | linkedin.com/company/gail-india-limited |
| 21 | UPL Ltd | linkedin.com/company/upl-limited |
| 22 | ITC Ltd | linkedin.com/company/itc-limited |

---

## Waalaxy Sequence Recommendation

### For Contact Discovery (No Outreach Yet)

**Sequence: Visit → Extract**
1. **Visit Profile** - Waalaxy visits each profile (they see you viewed)
2. **Wait 1 day**
3. **Export to CSV** - Get enriched contact data

### For Warm Outreach

**Sequence: Visit → Connect → Message**
1. **Visit Profile**
2. **Wait 1 day**
3. **Send Connection Request** (with note)
4. **Wait 3 days**
5. **Send Follow-up Message** (if connected)

**Connection Request Template:**
```
Hi {{firstName}},

I noticed your work leading {{currentCompany}}'s logistics operations.

We're helping companies like Hindalco and Vedanta optimize freight costs by 8-15% with our TMS platform.

Would love to connect and share some relevant insights.
```

---

## Export Settings

When exporting from Waalaxy, include these fields:
- First Name
- Last Name
- Title/Position
- Company
- LinkedIn URL
- Email (if enriched)
- Phone (if available)

**Export Path:** `tiered_output/full_enrichment/waalaxy_export_YYYYMMDD.csv`

---

## Post-Export: Merge with Account Data

After exporting from Waalaxy, run:

```bash
cd tools/tms-enrichment
python scripts/merge_waalaxy_contacts.py
```

This will:
1. Match contacts to Tier A accounts
2. Score contacts by title relevance
3. Generate prioritized outreach list

---

## Expected Results

For 22 Tier A accounts, you should find:
- **50-100 decision makers** (2-5 per company)
- **30-50 with emails** (Waalaxy email enrichment)
- **Top 20 hot contacts** for immediate outreach

---

## Tips

1. **Run during Indian business hours** - More accurate "active" status
2. **Use Sales Navigator if possible** - Better filters, more results
3. **Don't connect with everyone** - Cherry-pick top 2-3 per company
4. **Check email bounce risk** - Waalaxy shows email confidence score
5. **Export weekly** - People change jobs, keep data fresh
