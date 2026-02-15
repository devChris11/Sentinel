"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TopRisk {
  id: string
  category: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  affectedUsers: number
  impact: string
}

interface TopRisksTableProps {
  risks: TopRisk[]
}

const severityStyles: Record<
  string,
  string
> = {
  critical: "border-danger/20 bg-danger/10 text-danger",
  high: "border-orange/20 bg-orange/10 text-orange",
  medium: "border-warning/20 bg-warning/10 text-warning",
  low: "border-success/20 bg-success/10 text-success",
}

export function TopRisksTable({ risks }: TopRisksTableProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Top 5 Risks Requiring Attention
        </CardTitle>
        <CardDescription>
          Prioritized by severity and user impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase text-card-foreground">
                Risk Category
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-card-foreground">
                Description
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-card-foreground">
                Severity
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-card-foreground text-right">
                Affected Users
              </TableHead>
              <TableHead className="hidden text-xs font-semibold uppercase text-card-foreground lg:table-cell">
                Impact
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {risks.map((risk) => (
              <TableRow
                key={risk.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="font-medium text-card-foreground">
                  {risk.category}
                </TableCell>
                <TableCell className="max-w-[240px] text-muted-foreground">
                  {risk.description}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                      severityStyles[risk.severity]
                    )}
                  >
                    {risk.severity}
                  </span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground tabular-nums">
                  {risk.affectedUsers} users
                </TableCell>
                <TableCell className="hidden max-w-[260px] text-muted-foreground lg:table-cell">
                  {risk.impact}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
