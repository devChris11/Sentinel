import type { Meta, StoryObj } from '@storybook/react'
import { TrainingEffectivenessCard, ComplianceStatusCard } from '@/components/reports/risk-summary/info-cards'

const trainingMeta = {
  title: 'Reports/RiskSummary/InfoCards/TrainingEffectiveness',
  component: TrainingEffectivenessCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card displaying security training completion rate and effectiveness metrics. Shows percentage of users completing training on time with trend comparison. High effectiveness (95%+) is ideal, medium (80-94%) is acceptable, and low (<80%) requires improvement.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    effectiveness: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Training completion percentage (0-100)',
    },
  },
} satisfies Meta<typeof TrainingEffectivenessCard>

export const TrainingEffectiveness = {
  /**
   * High effectiveness showing excellent training adoption.
   * 95%+ completion rate indicates strong security culture.
   */
  HighEffectiveness: {
    args: {
      effectiveness: 97
    }
  } as StoryObj<typeof TrainingEffectivenessCard>,

  /**
   * Medium effectiveness showing good but improvable adoption.
   * 80-94% completion rate is acceptable baseline.
   */
  MediumEffectiveness: {
    args: {
      effectiveness: 87
    }
  } as StoryObj<typeof TrainingEffectivenessCard>,

  /**
   * Low effectiveness requiring intervention.
   * Below 80% indicates training program issues.
   */
  LowEffectiveness: {
    args: {
      effectiveness: 68
    }
  } as StoryObj<typeof TrainingEffectivenessCard>,
}

export default trainingMeta

// Compliance Status Stories
const complianceMeta = {
  title: 'Reports/RiskSummary/InfoCards/ComplianceStatus',
  component: ComplianceStatusCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card displaying compliance status across security frameworks (SOC 2, ISO 27001, GDPR). Shows overall compliance state and framework-specific findings. Color-coded badges indicate compliant (green), partial compliance (amber), or non-compliant (red) status.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['compliant', 'partial', 'non-compliant'],
      description: 'Overall compliance status across frameworks',
    },
  },
} satisfies Meta<typeof ComplianceStatusCard>

export const ComplianceStatus = {
  /**
   * Fully compliant status across all frameworks.
   * Green badge indicates meeting all requirements.
   */
  FullyCompliant: {
    args: {
      status: 'compliant'
    }
  } as StoryObj<typeof ComplianceStatusCard>,

  /**
   * Partial compliance with some findings.
   * Amber badge indicates frameworks needing attention.
   */
  PartialCompliance: {
    args: {
      status: 'partial'
    }
  } as StoryObj<typeof ComplianceStatusCard>,

  /**
   * Non-compliant status with critical gaps.
   * Red badge indicates urgent compliance issues.
   */
  NonCompliant: {
    args: {
      status: 'non-compliant'
    }
  } as StoryObj<typeof ComplianceStatusCard>,
}

// Export compliance meta as alternate default
export { complianceMeta }
