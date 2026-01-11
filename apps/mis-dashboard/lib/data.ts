// MIS Dashboard Data Types and Mock Data
// In production, this would fetch from the compliance snapshots

export interface ActivityMetrics {
  calls_logged: number
  calls_target: number
  calls_percentage: number
  emails_logged: number
  emails_target: number
  emails_percentage: number
  meetings_held: number
  meetings_target: number
  meetings_percentage: number
  notes_added: number
  notes_target: number
  notes_percentage: number
}

export interface StaleDeal {
  deal_id: string
  deal_name: string
  value: number
  days_since_activity: number
  last_activity_date: string
  stage?: string
  known_reality?: string
  recommended_action: string
}

export interface StageMismatch {
  deal_name: string
  current_stage: string
  expected_stage: string
  evidence: string
}

export interface PriorityAction {
  priority: number
  action_type: string
  deal_name: string
  description: string
  value_at_stake: number
  days_overdue?: number
  context?: string
}

export interface DealHealth {
  total_active: number
  touched_this_period: number
  stale_deals: StaleDeal[]
  stage_mismatches: StageMismatch[]
  missing_from_hubspot?: string[]
  missing_notes_count?: number
}

export interface AEData {
  overall_score: number
  activity_metrics: ActivityMetrics
  deal_health: DealHealth
  priority_actions: PriorityAction[]
}

export interface TeamSummary {
  overall_compliance_score: number
  total_active_deals: number
  total_pipeline_value: number
  deals_at_risk: number
  deals_at_risk_value: number
  activity_volume_vs_target: number
}

export interface ComplianceSnapshot {
  date: string
  generated_at: string
  period: {
    start: string
    end: string
  }
  team_summary: TeamSummary
  by_ae: Record<string, AEData>
  issues_identified: {
    critical: string[]
    high: string[]
    medium: string[]
  }
}

// Sample data based on actual MIS snapshot
export const sampleData: ComplianceSnapshot = {
  date: "2026-01-10",
  generated_at: "2026-01-10T17:05:00.000Z",
  period: {
    start: "2026-01-03",
    end: "2026-01-10"
  },
  team_summary: {
    overall_compliance_score: 28,
    total_active_deals: 40,
    total_pipeline_value: 106930000,
    deals_at_risk: 22,
    deals_at_risk_value: 45000000,
    activity_volume_vs_target: 0
  },
  by_ae: {
    avinash: {
      overall_score: 31,
      activity_metrics: {
        calls_logged: 0,
        calls_target: 15,
        calls_percentage: 0,
        emails_logged: 0,
        emails_target: 20,
        emails_percentage: 0,
        meetings_held: 0,
        meetings_target: 3,
        meetings_percentage: 0,
        notes_added: 0,
        notes_target: 5,
        notes_percentage: 0
      },
      deal_health: {
        total_active: 20,
        touched_this_period: 6,
        stale_deals: [
          {
            deal_id: "forace",
            deal_name: "Forace Group",
            value: 1522000,
            days_since_activity: 8,
            last_activity_date: "2026-01-02",
            stage: "Problem Identification",
            known_reality: "Commercial Negotiation, shortlisted to final 2",
            recommended_action: "Update stage to reflect actual status"
          },
          {
            deal_id: "jspl",
            deal_name: "Jindal Steel & Power Ltd.",
            value: 22000000,
            days_since_activity: 12,
            last_activity_date: "2025-12-29",
            stage: "Negotiation",
            recommended_action: "High-value deal needs update"
          },
          {
            deal_id: "rashmi",
            deal_name: "Rashmi Metaliks Ltd.",
            value: 3600000,
            days_since_activity: 12,
            last_activity_date: "2025-12-29",
            recommended_action: "Add status note"
          }
        ],
        stage_mismatches: [
          {
            deal_name: "Forace Group",
            current_stage: "Problem Identification",
            expected_stage: "Commercial Negotiation",
            evidence: "C-suite aligned, shortlisted to final 2"
          },
          {
            deal_name: "CAMPA Cola - Reliance",
            current_stage: "Problem Validation",
            expected_stage: "Proposal Evaluation",
            evidence: "Revised commercial under review"
          },
          {
            deal_name: "Renewsys",
            current_stage: "Problem Identification",
            expected_stage: "Proposal Submission",
            evidence: "BRD discussions done"
          },
          {
            deal_name: "Lulu Retail",
            current_stage: "Problem Identification",
            expected_stage: "Solution Validation",
            evidence: "Demo scheduled Jan W2"
          }
        ],
        missing_from_hubspot: [
          "Usha Martin - Early Discovery",
          "Himadri Group - Early Discovery",
          "Beamer Foods - PQL"
        ]
      },
      priority_actions: [
        {
          priority: 1,
          action_type: "update_stage",
          deal_name: "Forace Group",
          description: "Update stage to Commercial Negotiation",
          value_at_stake: 1522000,
          days_overdue: 8,
          context: "Shortlisted to final 2, F2F Haridwar this week"
        },
        {
          priority: 1,
          action_type: "update_stage",
          deal_name: "CAMPA Cola - Reliance",
          description: "Update stage to Proposal Evaluation",
          value_at_stake: 16200000,
          days_overdue: 5,
          context: "Revised commercial under review"
        },
        {
          priority: 2,
          action_type: "add_note",
          deal_name: "Jindal Steel & Power Ltd.",
          description: "High-value deal needs status update",
          value_at_stake: 22000000,
          days_overdue: 12
        }
      ]
    },
    abhishek: {
      overall_score: 25,
      activity_metrics: {
        calls_logged: 0,
        calls_target: 15,
        calls_percentage: 0,
        emails_logged: 0,
        emails_target: 20,
        emails_percentage: 0,
        meetings_held: 0,
        meetings_target: 3,
        meetings_percentage: 0,
        notes_added: 0,
        notes_target: 5,
        notes_percentage: 0
      },
      deal_health: {
        total_active: 20,
        touched_this_period: 3,
        stale_deals: [
          {
            deal_id: "bluestar",
            deal_name: "Blue Star India - E2E TMS",
            value: 4450000,
            days_since_activity: 24,
            last_activity_date: "2025-12-17",
            recommended_action: "High-value deal going cold - urgent"
          },
          {
            deal_id: "megha",
            deal_name: "Megha Engineering",
            value: 3084700,
            days_since_activity: 33,
            last_activity_date: "2025-12-08",
            recommended_action: "Critical - deal likely cold"
          },
          {
            deal_id: "jesons",
            deal_name: "Jesons - TMS + EXIM",
            value: 2286000,
            days_since_activity: 26,
            last_activity_date: "2025-12-15",
            recommended_action: "Follow up required"
          },
          {
            deal_id: "tnpl",
            deal_name: "Tamil Nadu Newsprint",
            value: 1812000,
            days_since_activity: 24,
            last_activity_date: "2025-12-17",
            recommended_action: "Follow up required"
          },
          {
            deal_id: "carlsberg",
            deal_name: "Carlsberg Beer - E2E TMS",
            value: 1140800,
            days_since_activity: 33,
            last_activity_date: "2025-12-08",
            recommended_action: "Critical - deal likely cold"
          }
        ],
        stage_mismatches: [],
        missing_notes_count: 20
      },
      priority_actions: [
        {
          priority: 1,
          action_type: "follow_up",
          deal_name: "Blue Star India - E2E TMS",
          description: "High-value deal stale for 24 days",
          value_at_stake: 4450000,
          days_overdue: 24
        },
        {
          priority: 1,
          action_type: "follow_up",
          deal_name: "Megha Engineering",
          description: "Deal stale for 33 days - likely cold",
          value_at_stake: 3084700,
          days_overdue: 33
        },
        {
          priority: 2,
          action_type: "follow_up",
          deal_name: "Jesons - TMS + EXIM",
          description: "Deal stale for 26 days",
          value_at_stake: 2286000,
          days_overdue: 26
        }
      ]
    }
  },
  issues_identified: {
    critical: [
      "Zero activity logging in HubSpot",
      "17/20 of Abhishek's deals stale 14+ days",
      "Stage data doesn't reflect reality"
    ],
    high: [
      "7 active engagements not in HubSpot",
      "No notes on any deals",
      "Multiple high-value deals going stale"
    ],
    medium: [
      "No meetings logged",
      "PQL pipeline not tracked"
    ]
  }
}

export async function getComplianceData(): Promise<ComplianceSnapshot> {
  // In production, this would read from the compliance snapshots directory
  // For now, return sample data
  return sampleData
}
