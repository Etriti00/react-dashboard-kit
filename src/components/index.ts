// ─── Barrel Export ─────────────────────────────────────────────────────────────
// All components re-exported for clean imports

// Layout
export { DashboardShell } from "./dashboard-shell";
export type { NavItem, NavSection } from "./dashboard-shell";

// Data Display
export { DataTable } from "./data-table";
export type { Column } from "./data-table";
export { StatCard, MetricRow } from "./stat-card";

// Charts
export { AreaChart, BarChart, LineChartComponent as LineChart, PieChartComponent as PieChart, Sparkline } from "./charts";

// Feedback & Status
export {
  Modal,
  ConfirmDialog,
  LoadingSkeleton,
  FileUpload,
  EmptyState,
  StatusBadge,
  PageHeader,
  ClipboardCopy,
} from "./feedback";

// Utilities
export { cn } from "../lib/utils";
