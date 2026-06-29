// ─── StatCard Component ─────────────────────────────────────────────────────
// KPI card with trend indicator for dashboard metrics

"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;          // Percent change (positive = green, negative = red)
  period?: string;          // "vs last month", "vs previous quarter"
  icon?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StatCard({
  title,
  value,
  change,
  period,
  icon,
  className,
  size = "md",
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === 0;

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
        size === "sm" && "p-3",
        size === "lg" && "p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <p
          className={cn(
            "font-bold tracking-tight",
            size === "sm" && "text-xl",
            size === "md" && "text-2xl",
            size === "lg" && "text-3xl"
          )}
        >
          {value}
        </p>

        {change !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-sm font-medium",
              isPositive && "text-emerald-600 dark:text-emerald-400",
              isNegative && "text-red-600 dark:text-red-400",
              isNeutral && "text-muted-foreground"
            )}
          >
            {isPositive && <TrendingUp className="h-3 w-3" />}
            {isNegative && <TrendingDown className="h-3 w-3" />}
            {isNeutral && <Minus className="h-3 w-3" />}
            {isPositive && "+"}
            {change}%
          </span>
        )}
      </div>

      {period && (
        <p className="mt-1 text-xs text-muted-foreground">{period}</p>
      )}
    </div>
  );
}

// ─── MetricRow Component ────────────────────────────────────────────────────
// Inline metric display

interface MetricRowProps {
  label: string;
  value: string | number;
  change?: number;
  className?: string;
}

export function MetricRow({ label, value, change, className }: MetricRowProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="font-semibold">{value}</span>
        {change !== undefined && (
          <span
            className={cn(
              "text-xs font-medium",
              isPositive && "text-emerald-600",
              isNegative && "text-red-600"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
    </div>
  );
}
