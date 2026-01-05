# ABM Data Module

Canonical data model for Account-Based Marketing operations at Fretron.

## Overview

This module provides:
- **Canonical Data Model**: Standardized schemas for accounts, contacts, and deals
- **Tier Classification**: ICP-based scoring and tier assignment
- **Trust Ladder Tracking**: Multi-level engagement tracking
- **Jen Abel Integration**: N-level contacts, qualification criteria, deal sizing

## Data Model

### Account Schema

Represents target companies with:
- **Firmographics**: Industry, revenue, employees, shipments
- **Technographics**: Current TMS state, ERP, IT maturity
- **Classification**: Tier (T1/T2/T3), fit score (0-100)
- **Warmup**: Trust level, touch count, engagement
- **Triggers**: Buying signals, urgency, budget cycle

### Contact Schema

Represents individuals with:
- **Professional**: Title, N-level (N/N-1/N-2/N-3), buying role
- **Qualification**: Mobile access, seniority level
- **Warmup**: LinkedIn status, outreach count, trust level

### Deal Schema

Represents opportunities with:
- **Pipeline/Stage**: Normalized to Fluint framework stages
- **Value**: Amount, size category (Land/Expand)
- **Qualification**: Jen Abel 4 must-haves
- **Timing**: Days in pipeline, sales cycle health

## ICP Tier Classification

| Tier | Fit Score | Description |
|------|-----------|-------------|
| Tier 1 | 50-60 | Strategic accounts, high-touch ABM |
| Tier 2 | 35-49 | Target accounts, medium-touch |
| Tier 3 | 20-34 | Awareness tier, programmatic |
| Unclassified | <20 | Needs enrichment or not fit |

## Trust Ladder Levels

| Level | Name | Appropriate Ask |
|-------|------|-----------------|
| 1 | Stranger | Nothing - only give value |
| 2 | Familiar | Connection request |
| 3 | Connected | Share ungated resource |
| 4 | Engaged | Gated content, low commitment |
| 5 | Interested | Conversation, light discovery |
| 6 | Qualified | Demo, detailed discovery |

## N-Level Framework (Jen Abel)

| Level | Fretron Titles | Qualification |
|-------|----------------|---------------|
| N | CFO, CEO, COO | ✅ Qualified |
| N-1 | VP Supply Chain, Logistics Head | ✅ Qualified |
| N-2 | Transport Manager, Dispatch Lead | ⚠️ Champion potential |
| N-3 | Executive, Analyst | ❌ Research only |

## Scripts

```bash
# Import from HubSpot cache
npm run import

# Validate against schemas
npm run validate

# Full refresh
npm run refresh
```

## Directory Structure

```
abm-data/
├── schemas/           # JSON Schema definitions
│   ├── account.schema.json
│   ├── contact.schema.json
│   └── deal.schema.json
├── records/           # Imported data
│   ├── accounts.json
│   ├── contacts.json
│   ├── deals.json
│   └── import-summary.json
├── scripts/           # Import and validation
│   ├── import-hubspot.js
│   └── validate-schemas.js
└── package.json
```

## Current Data Summary

From last import:
- **10,847 Accounts** (T1: 5, T2: 841, T3: 3,359, Unclassified: 6,642)
- **471 Contacts** (N/N-1: 93 qualified)
- **1,052 Deals** (Won: 12, Active: 191, Lost: 742)

## Usage for ABM Campaigns

### 1. Select Target Accounts

```javascript
// Load accounts
const { records: accounts } = require('./records/accounts.json');

// Filter Tier 1 accounts
const tier1 = accounts.filter(a => a.classification.tier === 'tier1');

// Filter by industry
const steelCompanies = accounts.filter(
  a => a.firmographics.industryNormalized === 'steel'
);
```

### 2. Find Key Contacts

```javascript
// Load contacts
const { records: contacts } = require('./records/contacts.json');

// Find N/N-1 level contacts
const qualifiedContacts = contacts.filter(
  c => ['N', 'N-1'].includes(c.professional.nLevel)
);
```

### 3. Track Warmup Progress

Update trust levels as engagement progresses:
- LinkedIn connection → Level 2 (Familiar)
- Content engagement → Level 3-4 (Connected/Engaged)
- Meeting booked → Level 5 (Interested)
- Discovery complete → Level 6 (Qualified)

## Data Sources

Primary: HubSpot CRM (via cached export)
- Companies → Accounts
- Contacts → Contacts
- Deals → Deals with comprehensive associations

## Refresh Schedule

- **Weekly**: Full refresh from HubSpot
- **Daily**: Sync active deals and recent contacts
- **Real-time**: Update engagement scores from HubSpot webhooks

## Related Skills

- `selecting-target-accounts` - Account tiering methodology
- `enabling-champions` - Champion identification
- `warming-up-abm-accounts` - Warmup campaign execution
- `qualifying-inbound-leads` - Lead scoring integration
