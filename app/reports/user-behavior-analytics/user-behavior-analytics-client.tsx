"use client"

import dynamic from "next/dynamic"

const UserBehaviorAnalyticsContent = dynamic(
  () => import("./user-behavior-analytics-content").then((mod) => ({ default: mod.UserBehaviorAnalyticsContent })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-background p-4 md:p-8 animate-pulse" />
    ),
  }
)

export default function UserBehaviorAnalyticsClient() {
  return <UserBehaviorAnalyticsContent />
}
