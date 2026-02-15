import { Suspense } from "react"
import { UserBehaviorAnalyticsContent } from "./user-behavior-analytics-content"

export default function UserBehaviorAnalyticsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background p-4 md:p-8 animate-pulse" />}>
      <UserBehaviorAnalyticsContent />
    </Suspense>
  )
}
