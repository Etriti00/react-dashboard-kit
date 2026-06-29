// ─── DashboardShell Layout Component ─────────────────────────────────────────
// Full dashboard layout with sidebar, topbar, and content area

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Settings,
  User,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  badge?: string | number;
  active?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

interface DashboardShellProps {
  children: React.ReactNode;
  sidebarSections: NavSection[];
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  onNavigate?: (href: string) => void;
  onSearch?: (query: string) => void;
  onSignOut?: () => void;
  brand?: React.ReactNode;
  className?: string;
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({
  sections,
  collapsed,
  brand,
  onNavigate,
  className,
}: {
  sections: NavSection[];
  collapsed: boolean;
  brand?: React.ReactNode;
  onNavigate?: (href: string) => void;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Brand */}
      <div className="flex h-14 items-center border-b px-4">
        {brand || <span className="font-bold text-lg">Dashboard</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-4">
            {section.title && !collapsed && (
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
            )}
            {section.items.map((item, iIdx) => (
              <button
                key={iIdx}
                onClick={() => item.href && onNavigate?.(item.href)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                {item.icon && <span className="h-4 w-4 shrink-0">{item.icon}</span>}
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge !== undefined && (
                  <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─── TopBar ──────────────────────────────────────────────────────────────────

function TopBar({
  collapsed,
  onToggle,
  user,
  onSearch,
  onSignOut,
}: {
  collapsed: boolean;
  onToggle: () => void;
  user?: DashboardShellProps["user"];
  onSearch?: (query: string) => void;
  onSignOut?: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {searchOpen ? (
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="h-8 rounded-md border border-input bg-background px-3 text-sm"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-8 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground hover:bg-accent"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline-flex h-5 items-center rounded border bg-muted px-1 text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent"
          >
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
              {user?.name?.[0] || "U"}
            </div>
            <span className="hidden md:inline text-sm font-medium">{user?.name || "User"}</span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-10 w-48 rounded-md border bg-card shadow-lg z-50">
              <div className="border-b px-3 py-2">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
              </div>
              <div className="p-1">
                <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent">
                  <User className="h-4 w-4" /> Profile
                </button>
                <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent">
                  <Settings className="h-4 w-4" /> Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={onSignOut}
                  className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── DashboardShell ──────────────────────────────────────────────────────────

export function DashboardShell({
  children,
  sidebarSections,
  user,
  onNavigate,
  onSearch,
  onSignOut,
  brand,
  className,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn("flex h-screen overflow-hidden bg-background", className)}>
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          sections={sidebarSections}
          collapsed={collapsed}
          brand={brand}
          onNavigate={onNavigate}
        />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          user={user}
          onSearch={onSearch}
          onSignOut={onSignOut}
        />
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
