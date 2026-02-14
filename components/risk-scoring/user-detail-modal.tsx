"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Target, Shield, Calendar, BookOpen, Link2 } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts"
import {
  type RiskUser,
  getRiskColor,
  sarahChenBreakdown,
  sarahChenActivity,
  sarahChenTrend,
  adminNotes,
} from "@/lib/risk-data"

interface UserDetailModalProps {
  user: RiskUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function RiskBreakdownBar({
  category,
  score,
  maxScore,
  weight,
  details,
}: {
  category: string
  score: number
  maxScore: number
  weight: number
  details: string[]
}) {
  const percentage = (score / maxScore) * 100
  let color = "#10B981"
  if (score >= 8.0) color = "#EF4444"
  else if (score >= 6.5) color = "#F97316"
  else if (score >= 4.0) color = "#F59E0B"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-content-text-strong">{category}: {score.toFixed(1)}/10</span>
        <span className="text-xs text-content-text-muted">({weight}%)</span>
      </div>
      <div className="h-2 w-full rounded-full bg-content-border">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="space-y-0.5 pl-3">
        {details.map((detail, idx) => (
          <p key={idx} className="text-xs text-content-text-muted">
            <span className="text-content-text-muted mr-1">{">"}</span>
            {detail}
          </p>
        ))}
      </div>
    </div>
  )
}

function ActivityTimeline() {
  const severityIndicators: Record<string, { color: string; label: string }> = {
    critical: { color: "bg-danger", label: "Critical" },
    high: { color: "bg-orange", label: "High" },
    medium: { color: "bg-warning", label: "Medium" },
    low: { color: "bg-success", label: "Low" },
  }

  return (
    <div className="space-y-4">
      {sarahChenActivity.map((event, idx) => {
        const config = severityIndicators[event.severity]
        return (
          <div key={idx} className="relative pl-6">
            <div className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ${config.color}`} />
            {idx < sarahChenActivity.length - 1 && (
              <div className="absolute left-[5px] top-5 h-full w-px bg-content-border" />
            )}
            <p className="text-xs text-content-text-muted">{event.date}</p>
            <p className="mt-0.5 text-sm font-medium text-content-text-strong">{event.title}</p>
            <p className="text-xs text-content-text-muted">{event.detail}</p>
          </div>
        )
      })}
    </div>
  )
}

function RiskTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={sarahChenTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <ReferenceArea y1={8} y2={10} fill="#EF4444" fillOpacity={0.05} />
        <ReferenceArea y1={6.5} y2={8} fill="#F97316" fillOpacity={0.04} />
        <ReferenceArea y1={4} y2={6.5} fill="#F59E0B" fillOpacity={0.03} />
        <ReferenceArea y1={0} y2={4} fill="#10B981" fillOpacity={0.03} />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} axisLine={false} />
        <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FEFEFE",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            color: "#0F172A",
            fontSize: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          labelStyle={{ color: "#64748B" }}
          formatter={(value: number | undefined) => value !== undefined ? [`${value.toFixed(1)}`, "Risk Score"] : ["N/A", "Risk Score"]}
        />
        {sarahChenTrend
          .filter((d) => d.event)
          .map((d, idx) => (
            <ReferenceLine key={idx} x={d.date} stroke="#CBD5E1" strokeDasharray="3 3" />
          ))}
        <Line
          type="monotone"
          dataKey="score"
          stroke="#EF4444"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#EF4444", stroke: "#FEFEFE", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function UserDetailModal({ user, open, onOpenChange }: UserDetailModalProps) {
  const [noteText, setNoteText] = useState("")
  const [draftSaved, setDraftSaved] = useState(false)

  if (!user) return null

  const riskColor = getRiskColor(user.riskLevel)

  const handleNoteChange = (value: string) => {
    setNoteText(value)
    setDraftSaved(false)
    setTimeout(() => setDraftSaved(true), 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-[700px] overflow-hidden border-content-border bg-content-surface p-0 text-content-text-strong shadow-lg">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            {/* Header */}
            <DialogHeader className="mb-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
                  style={{ backgroundColor: riskColor }}
                >
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl font-semibold text-content-text-strong">
                    {user.name}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-content-text-muted">
                    {user.email} &middot; {user.department} Department
                  </DialogDescription>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-2xl font-bold" style={{ color: riskColor }}>
                      {user.riskScore.toFixed(1)}/10
                    </span>
                    <Badge
                      style={{
                        backgroundColor: `${riskColor}15`,
                        color: riskColor,
                        borderColor: `${riskColor}33`,
                      }}
                    >
                      {user.riskLevel.charAt(0).toUpperCase() + user.riskLevel.slice(1)}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-danger" />
                    <span className="text-xs text-danger">
                      {user.trend === "up" ? "^" : user.trend === "down" ? "v" : "-"} {user.trendDelta.toFixed(1)} points vs last week
                    </span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Risk Breakdown */}
            <div className="mb-6 rounded-lg border border-content-border bg-content-bg p-5">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-content-text-muted" />
                <h3 className="text-sm font-semibold text-content-text-strong">Why is this user high-risk?</h3>
              </div>
              <div className="space-y-5">
                {sarahChenBreakdown.map((item, idx) => (
                  <RiskBreakdownBar key={idx} {...item} />
                ))}
              </div>
              <button className="mt-4 flex items-center gap-1 text-xs text-primary hover:text-primary/80 hover:underline">
                <Link2 className="h-3 w-3" />
                How is risk score calculated?
              </button>
            </div>

            {/* 90-Day Risk Trend */}
            <div className="mb-6 rounded-lg border border-content-border bg-content-bg p-5">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-content-text-muted" />
                <h3 className="text-sm font-semibold text-content-text-strong">90-Day Risk Trend</h3>
              </div>
              <RiskTrendChart />
              <div className="mt-3 flex flex-wrap gap-3">
                {sarahChenTrend.filter(d => d.event).map((d, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-content-text-muted">
                    <Calendar className="h-3 w-3" />
                    <span>{d.date}: {d.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-6 rounded-lg border border-content-border bg-content-bg p-5">
              <div className="mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-content-text-muted" />
                <h3 className="text-sm font-semibold text-content-text-strong">Recent Activity (Last 30 Days)</h3>
              </div>
              <ActivityTimeline />
              <button className="mt-4 flex items-center gap-1 text-xs text-primary hover:text-primary/80 hover:underline">
                <Link2 className="h-3 w-3" />
                View full activity history
              </button>
            </div>

            {/* Recommended Actions */}
            <div className="mb-6 rounded-lg border border-content-border bg-content-bg p-5">
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-content-text-muted" />
                <h3 className="text-sm font-semibold text-content-text-strong">Recommended Actions</h3>
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary/90">
                <BookOpen className="mr-2 h-4 w-4" />
                Assign &ldquo;Advanced Phishing Detection&rdquo;
              </Button>
              <div className="mt-4 space-y-2">
                <button className="block text-sm text-content-text hover:text-content-text-strong hover:underline">
                  Enable MFA Requirement
                </button>
                <button className="block text-sm text-content-text hover:text-content-text-strong hover:underline">
                  Schedule Security Review Meeting
                </button>
                <button className="block text-sm text-content-text hover:text-content-text-strong hover:underline">
                  Flag for Manual Investigation
                </button>
              </div>
              <button className="mt-4 flex items-center gap-1 text-xs text-primary hover:text-primary/80 hover:underline">
                <Link2 className="h-3 w-3" />
                View all available training modules
              </button>
            </div>

            {/* Admin Notes */}
            <div className="rounded-lg border border-content-border bg-content-bg p-5">
              <h3 className="mb-4 text-sm font-semibold text-content-text-strong">Admin Notes</h3>
              <Textarea
                placeholder="Add investigation notes..."
                value={noteText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleNoteChange(e.target.value)}
                rows={4}
                className="border-content-border bg-content-surface text-sm text-content-text placeholder:text-content-text-muted focus-visible:ring-primary"
              />
              {noteText && (
                <p className="mt-1.5 text-xs text-content-text-muted">
                  {draftSaved ? "Draft saved 2 seconds ago" : "Saving draft..."}
                </p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-content-border bg-transparent text-content-text hover:bg-content-bg-alt hover:text-content-text-strong"
                  onClick={() => setNoteText("")}
                >
                  Cancel
                </Button>
                <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                  Save Note
                </Button>
              </div>

              {adminNotes.length > 0 && (
                <div className="mt-5 space-y-4">
                  <p className="text-xs font-medium text-content-text-muted">
                    Previous Notes ({adminNotes.length}):
                  </p>
                  {adminNotes.map((note, idx) => (
                    <div key={idx}>
                      <Separator className="mb-3 bg-content-border" />
                      <p className="text-xs text-content-text-muted">
                        {note.date} - {note.author}
                      </p>
                      <p className="mt-1 text-sm text-content-text">
                        &ldquo;{note.content}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
