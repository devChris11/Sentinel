import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toaster } from "sonner";
import {
  ComingSoonCard,
  type ComingSoonFeature,
} from "@/components/common/coming-soon-card";

const meta = {
  title: "Common/Coming Soon Card",
  component: ComingSoonCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A reusable card component for displaying planned features that are not yet available. Used across Settings, User Profile, and Coming Soon report pages to communicate product roadmap transparently.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex min-h-[600px] w-[800px] items-center justify-center bg-background p-8">
        <Story />
        <Toaster position="top-right" />
      </div>
    ),
  ],
} satisfies Meta<typeof ComingSoonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// STORY 1: Compliance Report (Executive Category)
// ============================================================================

const complianceFeature: ComingSoonFeature = {
  id: "compliance-overview",
  title: "Compliance Overview Report",
  description:
    "Track regulatory compliance across SOC 2, ISO 27001, and GDPR frameworks with automated evidence collection and audit-ready reports.",
  features: [
    "Automated compliance score tracking across frameworks",
    "Real-time gap analysis and remediation recommendations",
    "Audit-ready evidence collection and documentation",
    "Executive summary with pass/fail status by control",
    "Control mapping across multiple compliance standards",
  ],
  expectedRelease: "Q2 2026",
  category: "executive",
};

export const ComplianceReport: Story = {
  args: {
    feature: complianceFeature,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of Coming Soon card for an executive-level report. Shows regulatory compliance tracking with 5 detailed features and Q2 2026 timeline.",
      },
    },
  },
};

// ============================================================================
// STORY 2: Settings Page (Operational Category)
// ============================================================================

const settingsFeature: ComingSoonFeature = {
  id: "settings",
  title: "Settings & Preferences",
  description:
    "Customize your Sentinel experience with team management, notification preferences, integration settings, and security configurations.",
  features: [
    "Team member management and role assignments",
    "Notification preferences and alert thresholds",
    "Third-party integration configuration (Slack, SIEM, ticketing)",
    "Security policies and authentication settings",
    "Data retention and export preferences",
  ],
  expectedRelease: "Q2 2026",
  category: "operational",
};

export const SettingsPage: Story = {
  args: {
    feature: settingsFeature,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of Coming Soon card for Settings page. Shows operational configuration features including team management and integrations.",
      },
    },
  },
};

// ============================================================================
// STORY 3: User Profile (Operational Category)
// ============================================================================

const userProfileFeature: ComingSoonFeature = {
  id: "user-profile",
  title: "User Profile",
  description:
    "Manage your personal account settings, view your security training history, track your phishing simulation performance, and update profile information.",
  features: [
    "Personal information and contact details",
    "Security training completion history and certificates",
    "Phishing simulation performance metrics over time",
    "Notification and communication preferences",
    "Account security settings and two-factor authentication",
  ],
  expectedRelease: "Q2 2026",
  category: "operational",
};

export const UserProfile: Story = {
  args: {
    feature: userProfileFeature,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of Coming Soon card for User Profile page. Shows personal account management features and training history tracking.",
      },
    },
  },
};

// ============================================================================
// STORY 4: Short Feature List (Minimal Content)
// ============================================================================

const minimalFeature: ComingSoonFeature = {
  id: "department-breakdown",
  title: "Department Breakdown Report",
  description:
    "Analyze security awareness performance across organizational departments with comparative metrics and trend analysis.",
  features: [
    "Department-level reporting rate comparison",
    "Training completion rates by team",
    "Phishing simulation performance trends",
  ],
  expectedRelease: "Q3 2026",
  category: "operational",
};

export const MinimalFeatureList: Story = {
  args: {
    feature: minimalFeature,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with minimal feature list (3 items) to test layout with less content. Shows how card adapts to shorter feature lists.",
      },
    },
  },
};

// ============================================================================
// STORY 5: Long Title (Edge Case)
// ============================================================================

const longTitleFeature: ComingSoonFeature = {
  id: "threat-intelligence",
  title: "Advanced Threat Intelligence & Attack Pattern Analysis Report",
  description:
    "Deep-dive analysis of threat actor behaviors, attack vector trends, and predictive threat modeling based on global intelligence feeds and your organization's historical incident data.",
  features: [
    "Threat actor profiling and attribution analysis",
    "Attack vector trend analysis with machine learning predictions",
    "Integration with global threat intelligence feeds (MISP, STIX/TAXII)",
    "Custom threat hunting recommendations based on your risk profile",
    "Executive briefing on emerging threats relevant to your industry",
  ],
  expectedRelease: "Q4 2026",
  category: "secops",
};

export const LongTitle: Story = {
  args: {
    feature: longTitleFeature,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Edge case with long title and description to test text wrapping and layout stability. Demonstrates how card handles verbose content.",
      },
    },
  },
};

// ============================================================================
// STORY 6: Near-Term Release (Different Timeline)
// ============================================================================

const nearTermFeature: ComingSoonFeature = {
  id: "response-time-metrics",
  title: "Response Time Metrics",
  description:
    "Track mean time to detect (MTTD) and mean time to respond (MTTR) for security incidents with historical trending and SLA compliance tracking.",
  features: [
    "MTTD and MTTR tracking by incident severity",
    "SLA compliance monitoring and alerting",
    "Response time trends and performance benchmarks",
    "Team performance metrics and leaderboards",
  ],
  expectedRelease: "March 2026",
  category: "operational",
};

export const NearTermRelease: Story = {
  args: {
    feature: nearTermFeature,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with specific month release date instead of quarter. Shows timeline flexibility for features with more concrete delivery dates.",
      },
    },
  },
};
