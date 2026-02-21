import {
  ComingSoonCard,
  type ComingSoonFeature,
} from "@/components/common/coming-soon-card";

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

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8">
      <ComingSoonCard feature={settingsFeature} />
    </main>
  );
}
