// ─── Chart Components ────────────────────────────────────────────────────────
// Area, Bar, Line, Pie, and Sparkline charts using Recharts

"use client";

import React from "react";
import {
  AreaChart as RechartsArea,
  Area,
  BarChart as RechartsBar,
  Bar,
  LineChart as RechartsLine,
  Line,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

// ─── Shared Colors ───────────────────────────────────────────────────────────

const COLORS = [
  "hsl(222, 47%, 11%)",
  "hsl(215, 20%, 65%)",
  "hsl(142, 71%, 45%)",
  "hsl(47, 96%, 53%)",
  "hsl(0, 84%, 60%)",
  "hsl(262, 83%, 58%)",
];

// ─── Area Chart ──────────────────────────────────────────────────────────────

interface AreaChartProps {
  data: Record<string, any>[];
  xKey: string;
  yKeys: { key: string; color?: string; name?: string }[];
  height?: number;
  gradient?: boolean;
  className?: string;
}

export function AreaChart({
  data,
  xKey,
  yKeys,
  height = 300,
  gradient = true,
  className,
}: AreaChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsArea data={data}>
          {gradient && (
            <defs>
              {yKeys.map((y, i) => (
                <linearGradient
                  key={y.key}
                  id={`gradient-${y.key}`}
                  x1="0" y1="0" x2="0" y2="1"
                >
                  <stop offset="5%" stopColor={y.color || COLORS[i]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={y.color || COLORS[i]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
          )}
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={xKey} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          {yKeys.map((y, i) => (
            <Area
              key={y.key}
              type="monotone"
              dataKey={y.key}
              name={y.name || y.key}
              stroke={y.color || COLORS[i]}
              fill={gradient ? `url(#gradient-${y.key})` : y.color || COLORS[i]}
              strokeWidth={2}
            />
          ))}
        </RechartsArea>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Bar Chart ───────────────────────────────────────────────────────────────

interface BarChartProps {
  data: Record<string, any>[];
  xKey: string;
  yKeys: { key: string; color?: string; name?: string; stackId?: string }[];
  height?: number;
  className?: string;
}

export function BarChart({ data, xKey, yKeys, height = 300, className }: BarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBar data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={xKey} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          {yKeys.map((y, i) => (
            <Bar
              key={y.key}
              dataKey={y.key}
              name={y.name || y.key}
              fill={y.color || COLORS[i]}
              stackId={y.stackId}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Line Chart ──────────────────────────────────────────────────────────────

interface LineChartProps {
  data: Record<string, any>[];
  xKey: string;
  yKeys: { key: string; color?: string; name?: string; dashed?: boolean }[];
  height?: number;
  className?: string;
}

export function LineChartComponent({ data, xKey, yKeys, height = 300, className }: LineChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLine data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={xKey} className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          {yKeys.map((y, i) => (
            <Line
              key={y.key}
              type="monotone"
              dataKey={y.key}
              name={y.name || y.key}
              stroke={y.color || COLORS[i]}
              strokeWidth={2}
              strokeDasharray={y.dashed ? "5 5" : undefined}
              dot={false}
            />
          ))}
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Pie / Donut Chart ───────────────────────────────────────────────────────

interface PieChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  donut?: boolean;
  className?: string;
}

export function PieChartComponent({ data, height = 300, donut = true, className }: PieChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={donut ? 60 : 0}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color || COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Sparkline ───────────────────────────────────────────────────────────────

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export function Sparkline({ data, color = COLORS[0], height = 32, className }: SparklineProps) {
  const chartData = data.map((value, i) => ({ i, value }));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLine data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}

export { LineChartComponent as LineChart };
export { PieChartComponent as PieChart };
