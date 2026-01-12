"""
BitScale Contact Enrichment with Expanded Roles

Enriches accounts with contacts across multiple departments:
- Logistics & Supply Chain (primary)
- Procurement
- Finance
- Digital Transformation
- IT & Technology
- Sustainability / ESG
- Operations

Uses BitScale's Find People from Sales Navigator enrichment.
"""

import pandas as pd
import requests
import json
import time
from datetime import datetime
from pathlib import Path
import sys

# Paths
BASE_DIR = Path(__file__).parent.parent
OUTPUT_DIR = BASE_DIR / "tiered_output/full_enrichment"

# BitScale webhook URL - UPDATE THIS with your BitScale grid webhook
BITSCALE_WEBHOOK = "https://api.bitscale.ai/api/source/webhook/pull/36e69c11-e8e5-4fc5-b974-dfcdffd98c31"

# =============================================================================
# EXPANDED ROLE DEFINITIONS
# =============================================================================

ROLE_QUERIES = {
    # Primary: Logistics & Supply Chain
    "logistics_supply_chain": {
        "titles": [
            "VP Logistics", "VP Supply Chain", "Director Logistics",
            "Director Supply Chain", "Head Logistics", "Head Supply Chain",
            "Chief Supply Chain Officer", "CSCO", "GM Logistics",
            "General Manager Supply Chain", "AVP Logistics", "AVP Supply Chain",
            "DGM Logistics", "DGM Supply Chain", "AGM Logistics",
            "Senior Manager Logistics", "Senior Manager Supply Chain",
            "Plant Logistics Head", "Distribution Head", "Warehouse Head"
        ],
        "priority": 1,
        "description": "Primary decision makers for TMS"
    },

    # Secondary: Procurement
    "procurement": {
        "titles": [
            "VP Procurement", "Chief Procurement Officer", "CPO",
            "Director Procurement", "Head Procurement", "Head Sourcing",
            "GM Procurement", "Senior Manager Procurement",
            "Category Manager Logistics", "Strategic Sourcing Head",
            "Procurement Director", "Supply Chain Procurement"
        ],
        "priority": 2,
        "description": "Budget holders for logistics services"
    },

    # Finance
    "finance": {
        "titles": [
            "CFO", "Chief Financial Officer", "VP Finance",
            "Finance Director", "Head Finance", "Financial Controller",
            "GM Finance", "Cost Controller", "FP&A Head",
            "Director Finance", "AVP Finance"
        ],
        "priority": 2,
        "description": "Cost optimization focus, ROI gatekeepers"
    },

    # Digital Transformation
    "digital_transformation": {
        "titles": [
            "Chief Digital Officer", "CDO", "VP Digital Transformation",
            "Director Digital", "Head Digital Transformation",
            "Digital Innovation Head", "Transformation Lead",
            "VP Business Transformation", "Chief Transformation Officer"
        ],
        "priority": 2,
        "description": "Technology modernization champions"
    },

    # IT & Technology
    "it_technology": {
        "titles": [
            "CIO", "Chief Information Officer", "CTO",
            "Chief Technology Officer", "VP IT", "VP Technology",
            "IT Director", "Head IT", "Head Technology",
            "GM IT", "Enterprise Architect", "IT Infrastructure Head",
            "Director Information Technology", "AVP IT"
        ],
        "priority": 2,
        "description": "Integration & implementation decision makers"
    },

    # Operations
    "operations": {
        "titles": [
            "COO", "Chief Operating Officer", "VP Operations",
            "Director Operations", "Head Operations", "GM Operations",
            "Plant Head", "Works Manager", "Manufacturing Head",
            "Production Director", "Operations Excellence Head"
        ],
        "priority": 1,
        "description": "Operational efficiency stakeholders"
    },

    # Sustainability / ESG
    "sustainability": {
        "titles": [
            "Chief Sustainability Officer", "CSO", "VP Sustainability",
            "Head Sustainability", "Director ESG", "ESG Head",
            "Environment Health Safety Head", "EHS Director",
            "Sustainability Manager", "Carbon Footprint Lead"
        ],
        "priority": 3,
        "description": "Sustainability-driven logistics optimization"
    },

    # Fleet & Transport (specific to TMS)
    "fleet_transport": {
        "titles": [
            "Fleet Manager", "Fleet Head", "Transport Manager",
            "Transportation Director", "Vehicle Operations Head",
            "Freight Manager", "Dispatch Head", "Route Planning Head"
        ],
        "priority": 1,
        "description": "Direct TMS users and implementers"
    }
}

# Seniority levels for filtering
SENIORITY_LEVELS = ["CXO", "VP", "Director", "Head", "GM", "Senior Manager", "Manager"]


def build_sales_nav_query(company_name: str, role_category: str) -> str:
    """
    Build a Sales Navigator search query for BitScale.

    Args:
        company_name: Target company name
        role_category: Key from ROLE_QUERIES

    Returns:
        Search query string for Sales Navigator
    """
    if role_category not in ROLE_QUERIES:
        return ""

    titles = ROLE_QUERIES[role_category]["titles"]

    # Build OR query for titles
    title_query = " OR ".join([f'"{t}"' for t in titles[:10]])  # Limit to 10 for query length

    return f'Current company: "{company_name}" AND Title: ({title_query})'


def clean_value(val):
    """Clean value for JSON serialization - handle NaN, Inf, etc."""
    if pd.isna(val):
        return ''
    if isinstance(val, float):
        if val != val or val == float('inf') or val == float('-inf'):  # NaN or Inf
            return ''
        if val == int(val):
            return int(val)
    return val


def build_enrichment_record(row: pd.Series, role_categories: list = None) -> dict:
    """
    Build a record for BitScale enrichment with role-specific queries.

    Args:
        row: DataFrame row with account data
        role_categories: List of role categories to query (default: all)

    Returns:
        Dictionary ready for BitScale webhook
    """
    if role_categories is None:
        role_categories = list(ROLE_QUERIES.keys())

    company = str(row.get('Company', '')) if pd.notna(row.get('Company')) else ''

    record = {
        'Company': company,
        'Category': clean_value(row.get('Category', '')),
        'Segment': clean_value(row.get('Segment', '')),
        'website_url': clean_value(row.get('website_url', '')),
        'linkedin_url': clean_value(row.get('linkedin_url', '')),
        'Sales_Rs_Cr': clean_value(row.get('Sales_Rs_Cr', '')),
        'Employees': clean_value(row.get('Employees', '')),
        'final_tier': clean_value(row.get('final_tier', '')),
        'final_score': clean_value(row.get('final_score', '')),
        # Customer status flags - CRITICAL for outreach safety
        'is_existing_customer': clean_value(row.get('is_existing_customer', False)),
        'outreach_status': clean_value(row.get('outreach_status', 'OK_TO_CONTACT')),
        'matched_with': clean_value(row.get('matched_with', '')),
    }

    # Add role-specific queries
    for role in role_categories:
        query_field = f"query_{role}"
        record[query_field] = build_sales_nav_query(company, role)

    # Add combined titles for reference
    all_titles = []
    for role in role_categories:
        all_titles.extend(ROLE_QUERIES[role]["titles"][:5])
    record['target_titles'] = "; ".join(all_titles[:20])

    return record


def push_to_bitscale(records: list, webhook_url: str = BITSCALE_WEBHOOK) -> dict:
    """
    Push records to BitScale webhook.

    Args:
        records: List of enrichment records
        webhook_url: BitScale webhook URL

    Returns:
        Results summary
    """
    results = {'success': 0, 'failed': 0, 'errors': []}
    total = len(records)

    print(f"\n{'='*60}")
    print(f"PUSHING {total} ACCOUNTS TO BITSCALE")
    print(f"{'='*60}")
    print(f"Webhook: {webhook_url[:50]}...")
    print()

    for idx, record in enumerate(records):
        company = record.get('Company', f'Record {idx}')

        try:
            response = requests.post(
                webhook_url,
                json=record,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )

            if response.status_code in [200, 201, 202]:
                results['success'] += 1
                if results['success'] % 100 == 0:
                    print(f"  [{results['success']:4d}/{total}] {results['success']/total*100:.1f}% complete")
            else:
                results['failed'] += 1
                if len(results['errors']) < 10:
                    results['errors'].append({
                        'company': company,
                        'status': response.status_code,
                        'response': response.text[:100]
                    })

        except Exception as e:
            results['failed'] += 1
            if len(results['errors']) < 10:
                results['errors'].append({'company': company, 'error': str(e)[:50]})

        # Rate limiting
        time.sleep(0.1)

    print(f"\n{'='*60}")
    print(f"PUSH COMPLETE")
    print(f"{'='*60}")
    print(f"Success: {results['success']}")
    print(f"Failed: {results['failed']}")

    return results


def create_sample_extraction(input_file: str, sample_size: int = 5) -> pd.DataFrame:
    """
    Create sample extraction to test query filters.

    Args:
        input_file: Path to accounts CSV
        sample_size: Number of sample accounts

    Returns:
        DataFrame with sample records and queries
    """
    df = pd.read_csv(input_file)

    # Sample from different tiers/categories
    if 'final_tier' in df.columns:
        sample = df.groupby('final_tier', group_keys=False).apply(
            lambda x: x.head(max(1, sample_size // 4))
        ).head(sample_size)
    else:
        sample = df.head(sample_size)

    print(f"\n{'='*60}")
    print(f"SAMPLE EXTRACTION - {len(sample)} accounts")
    print(f"{'='*60}")

    # Build records with all role queries
    records = []
    for idx, row in sample.iterrows():
        record = build_enrichment_record(row)
        records.append(record)

        print(f"\n--- {row['Company']} ---")
        print(f"Category: {row.get('Category', 'N/A')}")
        print(f"Tier: {row.get('final_tier', 'N/A')}")
        print(f"\nSample queries:")
        for role in ['logistics_supply_chain', 'procurement', 'it_technology']:
            query = record.get(f'query_{role}', '')
            if query:
                print(f"  [{role}]: {query[:80]}...")

    return pd.DataFrame(records)


def generate_bitscale_grid_config():
    """
    Generate BitScale grid configuration instructions.
    """
    print(f"\n{'='*70}")
    print("BITSCALE GRID CONFIGURATION FOR EXPANDED ROLES")
    print(f"{'='*70}")

    print("""
1. CREATE NEW GRID IN BITSCALE
   - Go to BitScale > New Grid > Import from Webhook
   - Copy the webhook URL

2. ADD ENRICHMENT COLUMNS (for each role category):
""")

    for role, config in ROLE_QUERIES.items():
        print(f"\n   [{role.upper()}] - {config['description']}")
        print(f"   Priority: {config['priority']}")
        print(f"   Enrichment: Find People from Sales Navigator")
        print(f"   Query column: query_{role}")
        print(f"   Sample titles: {', '.join(config['titles'][:5])}")

    print("""
3. RECOMMENDED ENRICHMENT SEQUENCE:
   a) Find People from Sales Navigator (use query columns)
   b) Email Finder (for found contacts)
   c) Phone Finder (optional, for high-priority)

4. EXPORT RESULTS:
   - Export as CSV with all columns
   - Run merge script to combine with account data

5. ESTIMATED CREDITS (per account):
   - Find People: ~2-5 credits per role category
   - Email Finder: ~1-2 credits per contact
   - Total per account (all roles): ~30-50 credits
""")


def main():
    print(f"\n{'='*70}")
    print("BITSCALE CONTACT ENRICHMENT - EXPANDED ROLES")
    print(f"{'='*70}")

    # Load safe to contact accounts (using latest file with corrected customer flags)
    input_file = OUTPUT_DIR / "SAFE_TO_CONTACT_20260112_041108.csv"

    if not input_file.exists():
        print(f"[!] Input file not found: {input_file}")
        return

    df = pd.read_csv(input_file)
    print(f"\nLoaded {len(df)} accounts safe for contact enrichment")

    # Role summary
    print(f"\n{'='*60}")
    print("TARGET ROLES FOR ENRICHMENT")
    print(f"{'='*60}")

    for role, config in ROLE_QUERIES.items():
        print(f"\n[{role}]")
        print(f"  Description: {config['description']}")
        print(f"  Priority: {config['priority']}")
        print(f"  Title count: {len(config['titles'])}")
        print(f"  Sample: {', '.join(config['titles'][:3])}")

    # Create sample extraction
    print("\n" + "="*60)
    print("CREATING SAMPLE EXTRACTION")
    print("="*60)

    sample_df = create_sample_extraction(input_file, sample_size=5)

    # Save sample
    sample_file = OUTPUT_DIR / "bitscale_sample_queries.csv"
    sample_df.to_csv(sample_file, index=False)
    print(f"\n[SAVED] Sample queries: {sample_file}")

    # Generate config instructions
    generate_bitscale_grid_config()

    # Ask user to proceed
    print(f"\n{'='*60}")
    print("READY TO PUSH TO BITSCALE?")
    print(f"{'='*60}")
    print(f"Accounts to enrich: {len(df)}")
    print(f"Role categories: {len(ROLE_QUERIES)}")
    print(f"Estimated credits: {len(df) * 40} - {len(df) * 60}")
    print(f"\nTo push all accounts, run:")
    print(f"  python {__file__} --push")
    print(f"\nTo push a subset (e.g., Tier A only):")
    print(f"  python {__file__} --push --tier A")


def run_full_push(tier_filter: str = None):
    """Run full push to BitScale."""
    input_file = OUTPUT_DIR / "SAFE_TO_CONTACT_20260112_041108.csv"
    df = pd.read_csv(input_file)

    if tier_filter:
        df = df[df['final_tier'].str.upper() == tier_filter.upper()]
        print(f"Filtered to Tier {tier_filter}: {len(df)} accounts")

    # Build records
    records = []
    for idx, row in df.iterrows():
        record = build_enrichment_record(row)
        records.append(record)

    # Push to BitScale
    results = push_to_bitscale(records)

    # Save results
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    results_file = OUTPUT_DIR / f"bitscale_expanded_push_{timestamp}.json"
    with open(results_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\n[SAVED] Push results: {results_file}")

    return results


if __name__ == '__main__':
    if '--push' in sys.argv:
        tier = None
        if '--tier' in sys.argv:
            tier_idx = sys.argv.index('--tier') + 1
            if tier_idx < len(sys.argv):
                tier = sys.argv[tier_idx]
        run_full_push(tier)
    else:
        main()
