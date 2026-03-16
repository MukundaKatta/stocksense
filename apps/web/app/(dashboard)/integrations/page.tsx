"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Plug,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Settings,
  ExternalLink,
  Cloud,
  Calendar,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: "pos" | "weather" | "events" | "payments";
  icon: React.ElementType;
  connected: boolean;
  lastSync: string | null;
  syncFrequency: string;
  itemsSynced: number;
  status: "active" | "error" | "disconnected";
  errorMessage?: string;
}

const integrations: Integration[] = [
  {
    id: "square",
    name: "Square POS",
    description: "Sync sales data, inventory, and product catalog from Square.",
    category: "pos",
    icon: ShoppingBag,
    connected: true,
    lastSync: "2026-03-16 14:30",
    syncFrequency: "Every 15 minutes",
    itemsSynced: 847,
    status: "active",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Import online orders and inventory levels from your Shopify store.",
    category: "pos",
    icon: ShoppingBag,
    connected: false,
    lastSync: null,
    syncFrequency: "Every 30 minutes",
    itemsSynced: 0,
    status: "disconnected",
  },
  {
    id: "clover",
    name: "Clover POS",
    description: "Connect your Clover system for real-time sales and inventory tracking.",
    category: "pos",
    icon: ShoppingBag,
    connected: false,
    lastSync: null,
    syncFrequency: "Every 15 minutes",
    itemsSynced: 0,
    status: "disconnected",
  },
  {
    id: "toast",
    name: "Toast POS",
    description: "Restaurant-specific POS integration for menu items, modifiers, and sales.",
    category: "pos",
    icon: ShoppingBag,
    connected: true,
    lastSync: "2026-03-16 14:25",
    syncFrequency: "Every 15 minutes",
    itemsSynced: 312,
    status: "active",
  },
  {
    id: "openweather",
    name: "OpenWeatherMap",
    description: "14-day weather forecasts for demand prediction models.",
    category: "weather",
    icon: Cloud,
    connected: true,
    lastSync: "2026-03-16 06:00",
    syncFrequency: "Daily at 6:00 AM",
    itemsSynced: 14,
    status: "active",
  },
  {
    id: "events",
    name: "Local Events API",
    description: "Upcoming local events, concerts, sports games, and festivals.",
    category: "events",
    icon: Calendar,
    connected: true,
    lastSync: "2026-03-16 06:00",
    syncFrequency: "Daily at 6:00 AM",
    itemsSynced: 8,
    status: "error",
    errorMessage: "API rate limit reached. Will retry in 2 hours.",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing for StockSense subscription and supplier payments.",
    category: "payments",
    icon: CreditCard,
    connected: true,
    lastSync: "2026-03-16 13:00",
    syncFrequency: "Real-time webhooks",
    itemsSynced: 0,
    status: "active",
  },
];

const syncHistory = [
  { time: "14:30", source: "Square POS", items: 23, status: "success" },
  { time: "14:25", source: "Toast POS", items: 15, status: "success" },
  { time: "13:00", source: "Stripe", items: 2, status: "success" },
  { time: "06:00", source: "OpenWeatherMap", items: 14, status: "success" },
  { time: "06:00", source: "Local Events API", items: 0, status: "error" },
];

export default function IntegrationsPage() {
  const connectedCount = integrations.filter((i) => i.connected).length;
  const errorCount = integrations.filter((i) => i.status === "error").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your POS systems, data sources, and payment processor
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync All
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <Plug className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connectedCount} / {integrations.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items Synced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.reduce((s, i) => s + i.itemsSynced, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* POS Systems */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Point of Sale Systems</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {integrations
            .filter((i) => i.category === "pos")
            .map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <integration.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Switch checked={integration.connected} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      {integration.connected ? (
                        <>
                          <div className="flex items-center gap-1 text-sm">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            <span className="text-green-600">Connected</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Last sync: {integration.lastSync}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {integration.itemsSynced} items synced | {integration.syncFrequency}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      )}
                    </div>
                    {integration.connected ? (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" className="gap-1">
                        Connect <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <Separator />

      {/* External Data Sources */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">External Data Sources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {integrations
            .filter((i) => i.category === "weather" || i.category === "events")
            .map((integration) => (
              <Card
                key={integration.id}
                className={integration.status === "error" ? "border-red-200" : ""}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <integration.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        integration.status === "active"
                          ? "success"
                          : integration.status === "error"
                          ? "danger"
                          : "secondary"
                      }
                    >
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      Last sync: {integration.lastSync} | {integration.syncFrequency}
                    </p>
                    {integration.errorMessage && (
                      <p className="text-red-600">{integration.errorMessage}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <Separator />

      {/* Payments */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Payments</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {integrations
            .filter((i) => i.category === "payments")
            .map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <integration.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.syncFrequency}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Recent Sync Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sync Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {syncHistory.map((entry, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  {entry.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{entry.source}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.items} items synced
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{entry.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
