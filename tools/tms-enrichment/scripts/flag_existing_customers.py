"""
CRITICAL: Flag existing Fretron customers in the target account list.
These MUST be excluded from cold outreach to avoid embarrassment.

STRICT MATCHING - Only flag confirmed customers, not prospects.
"""

import json
import pandas as pd
import re
from pathlib import Path
from datetime import datetime
from difflib import SequenceMatcher

# Paths
BASE_DIR = Path(__file__).parent.parent
PROJECT_ROOT = BASE_DIR.parent.parent
HUBSPOT_DEALS = PROJECT_ROOT / "abm-data/records/hubspot-deals-raw.json"
ENRICHED_ACCOUNTS = BASE_DIR / "tiered_output/full_enrichment/enriched_2510_deduped.csv"
OUTPUT_DIR = BASE_DIR / "tiered_output/full_enrichment"

# CONFIRMED Fretron customers - from actual closed deals
# These are companies where Fretron has active revenue
CONFIRMED_CUSTOMERS = [
    # From HubSpot deals with amounts > 0 and closed dates
    'Grasim Industries',
    'Aditya Birla',
    'INI Farms',
    'Inifarms',
    'Trimurti',
    'Avon Cycles',
    'Union Roadways',
    'Maa Annapurna',
    'Sedres Maritime',
    'Rishi Golden Transport',
    'Tasbir Singh',

    # Add these based on deal names seen in HubSpot
    'Haldia Petrochemicals',
    'Campa Cola',
    'Reliance Industries',  # Via Campa Cola deal
    'Britannia',
    'Britannia Industries',
    'Polycab',
    'Polycab India',
    'SRF',
    'Motherson Sumi',
    'Motherson',
    'Finolex',
    'Finolex Cables',
    'Hindustan Zinc',
    'L&T',
    'Larsen & Toubro',
    'L&T Technology',
    'Maruti Suzuki',
    'Food Corporation of India',
    'FCI',
    'IFFCO',
    'Torrent',
    'Torrent Chemical',
    'Torrent Pharma',
    'Hindalco',
    'Hindalco Industries',
    'Vedanta',
    'Vedanta Aluminium',
    'Mahindra Logistics',  # Note: Mahindra Logistics != Mahindra & Mahindra
    'Adani Enterprises',
    'Hyundai',
    'Hyundai Motor',
    'Nestlé',
    'Nestle',
    'Amul',
    'GCMMF',
]


def load_hubspot_deals():
    """Load deals from HubSpot export."""
    try:
        with open(HUBSPOT_DEALS, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data.get('results', [])
    except Exception as e:
        print(f"[!] Error loading deals: {e}")
        return []


def extract_company_name(deal_name: str) -> str:
    """Extract company name from deal name."""
    if not deal_name:
        return ""

    # Remove common suffixes
    name = deal_name
    patterns_to_remove = [
        r'\s*-\s*(New Deal|TMS|FMS|GPS|E2E|Sim based|tracking|Upsell|Renewal|ULIP|API|Plant Automation).*$',
        r'\s*-\s*\w+@\w+\.\w+.*$',  # Remove email parts
        r'\s*\(.*\)$',  # Remove parenthetical
    ]

    for pattern in patterns_to_remove:
        name = re.sub(pattern, '', name, flags=re.IGNORECASE)

    return name.strip()


def normalize_name(name: str) -> str:
    """Normalize company name for matching."""
    if not name:
        return ""
    name = str(name).lower()
    # Remove common suffixes
    for suffix in ['limited', 'ltd', 'pvt', 'private', 'inc', 'corp', 'corporation']:
        name = re.sub(rf'\b{suffix}\b', '', name)
    name = re.sub(r'[^\w\s]', ' ', name)
    name = ' '.join(name.split())
    return name.strip()


def strict_match(target_name: str, customer_name: str) -> tuple:
    """
    Strict matching to reduce false positives.
    Returns (is_match, confidence, reason)
    """
    if not target_name or not customer_name:
        return False, 0, None

    t_norm = normalize_name(target_name)
    c_norm = normalize_name(customer_name)

    # Skip very short names (causes false positives)
    if len(c_norm) < 4 or len(t_norm) < 4:
        return False, 0, None

    # Exact match after normalization
    if t_norm == c_norm:
        return True, 100, "exact_match"

    # One fully contains the other (but both must be substantial)
    if len(c_norm) >= 6 and len(t_norm) >= 6:
        if c_norm in t_norm:
            return True, 95, "customer_in_target"
        if t_norm in c_norm:
            return True, 95, "target_in_customer"

    # High fuzzy match (>95% similarity) - raised from 85% to reduce false positives
    ratio = SequenceMatcher(None, t_norm, c_norm).ratio()
    if ratio >= 0.95:
        return True, int(ratio * 100), "fuzzy_match"

    # Disabled: word matching was causing too many false positives
    # e.g., "Tata Steel" matching "Tata Bhushan Steel" when they're different entities
    # Only rely on exact/contained matches and very high fuzzy similarity

    return False, 0, None


def main():
    print("=" * 70)
    print("CUSTOMER FLAGGING - STRICT MODE")
    print("=" * 70)
    print("\nUsing confirmed customer list + strict matching to avoid false positives.\n")

    # Load data
    print("1. Loading data...")

    deals = load_hubspot_deals()
    print(f"   HubSpot Deals: {len(deals)}")

    accounts_df = pd.read_csv(ENRICHED_ACCOUNTS)
    print(f"   Target Accounts: {len(accounts_df)}")

    # Extract customers from deals with actual revenue
    print("\n2. Extracting confirmed customers from deals...")

    customer_names = set(CONFIRMED_CUSTOMERS)

    # CRITICAL: Stage 3082160 is "Closed Won" in Fretron's HubSpot
    # Other stages are active opportunities, closed-lost, etc.
    CLOSED_WON_STAGE = "3082160"

    for deal in deals:
        props = deal.get('properties', {})
        deal_name = props.get('dealname', '')
        amount = float(props.get('amount', 0) or 0)
        close_date = props.get('closedate', '')
        deal_stage = props.get('dealstage', '')

        # Only consider CLOSED WON deals (stage 3082160) with actual revenue
        # This filters out active opportunities, closed-lost, etc.
        if deal_stage == CLOSED_WON_STAGE and amount >= 50000 and close_date:
            company_name = extract_company_name(deal_name)
            if company_name and len(company_name) >= 4:
                customer_names.add(company_name)

    print(f"   Confirmed customer names: {len(customer_names)}")

    # Cross-reference with strict matching
    print("\n3. Cross-referencing with strict matching...")

    flagged = []
    safe = []

    for idx, account in accounts_df.iterrows():
        target_name = account['Company']
        is_customer = False
        best_match = None
        best_confidence = 0
        match_reason = None

        for cust_name in customer_names:
            matched, confidence, reason = strict_match(target_name, cust_name)
            if matched and confidence > best_confidence:
                is_customer = True
                best_match = cust_name
                best_confidence = confidence
                match_reason = reason

        row_dict = account.to_dict()

        if is_customer:
            flagged.append({
                **row_dict,
                'is_existing_customer': True,
                'matched_with': best_match,
                'match_confidence': best_confidence,
                'match_reason': match_reason,
                'outreach_status': 'DO_NOT_CONTACT'
            })
        else:
            safe.append({
                **row_dict,
                'is_existing_customer': False,
                'matched_with': None,
                'match_confidence': 0,
                'match_reason': None,
                'outreach_status': 'OK_TO_CONTACT'
            })

    flagged_df = pd.DataFrame(flagged)
    safe_df = pd.DataFrame(safe)

    # Results
    print("\n" + "=" * 70)
    print("RESULTS")
    print("=" * 70)

    print(f"\n[CRITICAL] CONFIRMED CUSTOMERS: {len(flagged_df)}")
    print(f"[OK] Safe to contact: {len(safe_df)}")

    if len(flagged_df) > 0:
        print("\n" + "-" * 70)
        print("EXISTING CUSTOMERS (DO NOT CONTACT):")
        print("-" * 70)

        # Sort by confidence
        flagged_df = flagged_df.sort_values('match_confidence', ascending=False)

        for _, row in flagged_df.iterrows():
            conf = row['match_confidence']
            print(f"   [{conf:3d}%] {row['Company']:<40} <- {row['matched_with']}")

    # Save outputs
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # DO NOT CONTACT list
    if len(flagged_df) > 0:
        dnc_file = OUTPUT_DIR / f"DO_NOT_CONTACT_CUSTOMERS_{timestamp}.csv"
        flagged_df.to_csv(dnc_file, index=False)
        print(f"\n[SAVED] DO NOT CONTACT: {dnc_file}")

    # Safe list
    safe_file = OUTPUT_DIR / f"SAFE_TO_CONTACT_{timestamp}.csv"
    safe_df.to_csv(safe_file, index=False)
    print(f"[SAVED] Safe to contact: {safe_file}")

    # Full list with flags
    full_df = pd.concat([flagged_df, safe_df])
    full_file = OUTPUT_DIR / f"accounts_with_customer_flags_{timestamp}.csv"
    full_df.to_csv(full_file, index=False)
    print(f"[SAVED] Full flagged list: {full_file}")

    # Simple text list
    dnc_txt = OUTPUT_DIR / "DO_NOT_CONTACT.txt"
    with open(dnc_txt, 'w', encoding='utf-8') as f:
        f.write("# FRETRON EXISTING CUSTOMERS - DO NOT CONTACT\n")
        f.write(f"# Generated: {datetime.now().isoformat()}\n")
        f.write(f"# Total: {len(flagged_df)} accounts\n")
        f.write("# Review before outreach - these are confirmed customers\n\n")
        if len(flagged_df) > 0:
            for _, row in flagged_df.iterrows():
                f.write(f"{row['Company']} (matched: {row['matched_with']}, {row['match_confidence']}%)\n")
    print(f"[SAVED] Simple list: {dnc_txt}")

    print("\n" + "=" * 70)
    print("FLAGGING COMPLETE")
    print("=" * 70)

    print(f"\nSummary: {len(flagged_df)} customers excluded, {len(safe_df)} accounts safe for outreach")


if __name__ == '__main__':
    main()
