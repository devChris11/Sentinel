import {
  ComingSoonCard,
  type ComingSoonFeature,
} from "@/components/common/coming-soon-card";

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

export default function UserProfilePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8">
      <ComingSoonCard feature={userProfileFeature} />
    </main>
  );
}
