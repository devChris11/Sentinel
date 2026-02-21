"use client";

import Link from "next/link";
import {
  Construction,
  ArrowLeft,
  Bell,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * ComingSoonFeature interface
 *
 * Defines the structure for a feature that is planned but not yet implemented.
 * Used across Settings, User Profile, and placeholder report pages.
 */
export interface ComingSoonFeature {
  /** Unique identifier for the feature */
  id: string;
  /** Display title shown in the card header */
  title: string;
  /** 1-2 sentence description of what the feature will do */
  description: string;
  /** List of 3-5 specific capabilities or included features */
  features: string[];
  /** Expected release timeframe (e.g., "Q2 2026" or "March 2026") */
  expectedRelease: string;
  /** Category for organizational grouping */
  category: "executive" | "operational" | "secops";
  /** Optional flag for future email notification feature */
  notifyOnRelease?: boolean;
}

interface ComingSoonCardProps {
  feature: ComingSoonFeature;
}

/**
 * ComingSoonCard Component
 *
 * A reusable card that communicates planned features with transparency.
 * Displays feature details, expected timeline, and provides navigation back
 * to the main Reports page.
 *
 * @example
 * ```tsx
 * const feature: ComingSoonFeature = {
 *   id: "compliance",
 *   title: "Compliance Overview",
 *   description: "Track regulatory compliance...",
 *   features: ["Feature 1", "Feature 2"],
 *   expectedRelease: "Q2 2026",
 *   category: "executive"
 * }
 *
 * <ComingSoonCard feature={feature} />
 * ```
 */
export function ComingSoonCard({ feature }: ComingSoonCardProps) {
  function handleNotifyMe() {
    toast.success("We'll notify you when this report is ready");
  }

  return (
    <Card
      role="region"
      aria-label="Coming Soon Feature"
      className="w-full max-w-2xl gap-0 rounded-lg border border-border bg-card p-6 py-6 shadow-sm md:p-8"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Construction
          aria-hidden="true"
          className="h-12 w-12 text-primary md:h-16 md:w-16"
          strokeWidth={1.5}
        />
      </div>

      {/* Status Badge */}
      <div className="flex justify-center mb-4">
        <Badge
          variant="outline"
          className="rounded-full border-info/20 bg-info/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-info"
        >
          Coming Soon
        </Badge>
      </div>

      {/* Title */}
      <h1 className="mb-3 text-center text-xl font-bold text-foreground md:text-2xl text-balance">
        {feature.title}
      </h1>

      {/* Description */}
      <p className="mx-auto mb-8 max-w-lg text-center text-base text-muted-foreground text-pretty">
        {feature.description}
      </p>

      {/* Divider */}
      <div className="mb-6 border-t border-border" />

      {/* What's Included */}
      <div className="mb-6">
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          {"What's Included"}
        </h2>
        <ul className="flex flex-col gap-3" aria-label="Included features">
          {feature.features.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-success"
              />
              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expected Timeline */}
      <div className="mb-6 flex items-center gap-2 rounded-md bg-muted/50 p-4">
        <Calendar
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-muted-foreground"
        />
        <span className="text-sm text-muted-foreground">
          Expected release: {feature.expectedRelease}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/reports">
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Link>
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleNotifyMe}
        >
          <Bell className="h-4 w-4" />
          Notify Me
        </Button>
      </div>
    </Card>
  );
}
