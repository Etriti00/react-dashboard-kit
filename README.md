# React Dashboard Component Kit 🎨

50+ production-ready dashboard components built with React, TypeScript, and TailwindCSS.

## Quick Start

```bash
npm install
npm run storybook    # View all components
npm run build        # Build for production
npm run test         # Run tests
```

## What's Included

### Layout Components
- `DashboardShell` — Full dashboard layout with sidebar & topbar
- `Sidebar` — Collapsible sidebar with icons & nested menu
- `TopBar` — App bar with user menu, search, notifications
- `PageHeader` — Page title + action buttons
- `ContentGrid` — Responsive grid for dashboard cards

### Data Display
- `DataTable` — Sortable, filterable, paginated table
- `StatCard` — KPI card with trend indicator
- `MetricRow` — Inline metric display (label + value + change)
- `AvatarGroup` — Stacked avatars with +N overflow
- `BadgeList` — Tag/badge collection
- `ProgressBar` — Animated progress bars (linear & circular)
- `Timeline` — Activity timeline
- `EmptyState` — Placeholder for no-data views
- `JsonViewer` — Formatted JSON display

### Forms & Inputs
- `SearchInput` — Debounced search with clear button
- `DateRangePicker` — Date range selector with presets
- `FilterBar` — Grouped filter controls
- `ToggleGroup` — Multi-option toggle
- `SliderInput` — Range slider with value display
- `ColorPicker` — Color selection input
- `FileUpload` — Drag-and-drop file upload zone
- `FormBuilder` — Dynamic form from JSON schema

### Feedback & Status
- `Alert` — Dismissible alert variants
- `Toast` — Toast notification system
- `Modal` — Accessible dialog/modal
- `ConfirmDialog` — Confirmation dialog with async actions
- `LoadingSkeleton` — Shimmer loading placeholders
- `Spinner` — Loading spinners (5 variants)
- `StatusDot` — Status indicator dot (green/yellow/red)
- `StatusBadge` — Colored status badge

### Navigation
- `Breadcrumbs` — Breadcrumb navigation
- `Tabs` — Tab navigation with lazy loading
- `CommandPalette` — Keyboard-first command menu
- `VerticalNav` — Vertical navigation with sections
- `Wizard` — Multi-step form wizard

### Charts (with Recharts)
- `AreaChart` — Area chart with gradient fill
- `BarChart` — Grouped/stacked bar chart
- `LineChart` — Multi-line chart
- `PieChart` — Donut chart with labels
- `Sparkline` — Inline mini chart

### Utility
- `ClipboardCopy` — Copy-to-clipboard button
- `ThemeToggle` — Dark/light mode switch
- `KeyboardShortcut` — Keyboard shortcut display
- `RelativeTime` — "3 minutes ago" timestamps
- `Truncate` — Text truncation with tooltip
- `Collapse` — Collapsible sections

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 18 + TypeScript |
| Styling | TailwindCSS 3 + CSS Variables |
| Primitives | Radix UI |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Animations | Framer Motion |
| Testing | Vitest + Testing Library |
| Docs | Storybook 7 |

## Usage

Each component is independently importable:

```tsx
import { DataTable } from '@/components/data-table';
import { StatCard } from '@/components/stat-card';
import { DashboardShell } from '@/components/dashboard-shell';

export default function Page() {
  return (
    <DashboardShell>
      <StatCard
        title="Revenue"
        value="$48,290"
        change={12.5}
        period="vs last month"
      />
    </DashboardShell>
  );
}
```

## Customization

All components use TailwindCSS with CSS custom properties. Override the theme:

```css
:root {
  --primary: 222 47% 11%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.5rem;
}
```

## License

MIT — use for any personal or commercial project.

## Get the Premium Version

**$19** — React Dashboard Kit (Premium)

The premium version includes everything in the free tier plus:

- ✅ **Priority support** — Get direct help when you're stuck
- ✅ **Lifetime updates** — All future improvements, free forever
- ✅ **Example configurations** — Production-ready theme presets, custom color schemes, and real-world dashboard layouts

[🛒 Buy on Gumroad →](https://gum.co/react-dashboard-kit)
