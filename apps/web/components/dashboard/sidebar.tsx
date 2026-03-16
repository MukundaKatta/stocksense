"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  Package,
  ShoppingCart,
  Trash2,
  Lightbulb,
  Plug,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { href: "/overview", label: "Overview", icon: BarChart3 },
  { href: "/forecast", label: "Forecasts", icon: TrendingUp },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/orders", label: "Purchase Orders", icon: ShoppingCart },
  { href: "/waste", label: "Waste Tracking", icon: Trash2 },
  { href: "/insights", label: "AI Insights", icon: Lightbulb },
  { href: "/integrations", label: "Integrations", icon: Plug },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Package className="h-7 w-7 text-primary" />
        <span className="text-lg font-bold">StockSense</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dashboard
        </div>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-auto">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Support
          </div>
          {bottomItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t p-4">
        <div className="rounded-md bg-primary/5 p-3">
          <p className="text-xs font-medium text-primary">Pro Plan</p>
          <p className="mt-1 text-xs text-muted-foreground">
            14-day forecast, unlimited products
          </p>
        </div>
      </div>
    </aside>
  );
}
