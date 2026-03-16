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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Lightbulb,
  TrendingUp,
  DollarSign,
  ChefHat,
  ShoppingCart,
  Trash2,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

interface Insight {
  id: string;
  type: "cost_saving" | "menu_optimization" | "reorder" | "waste_reduction" | "demand_spike";
  title: string;
  description: string;
  impact: string;
  impactValue: number;
  confidence: number;
  status: "new" | "viewed" | "applied" | "dismissed";
  createdAt: string;
  actions: string[];
}

const insights: Insight[] = [
  {
    id: "1",
    type: "demand_spike",
    title: "St. Patrick's Day Demand Surge Expected",
    description:
      "Based on last year's data and local event calendars, demand for beer, corned beef, and cabbage-based items is expected to increase 35-45% on March 17th. Current stock levels may be insufficient.",
    impact: "Revenue at risk: $2,400 if understocked",
    impactValue: 2400,
    confidence: 0.92,
    status: "new",
    createdAt: "2026-03-16 08:00",
    actions: [
      "Increase corned beef order by 50 lbs",
      "Order additional cabbage and root vegetables",
      "Prep extra Irish soda bread batch",
      "Consider St. Patrick's Day special menu",
    ],
  },
  {
    id: "2",
    type: "waste_reduction",
    title: "Reduce Fresh Herb Waste by 40%",
    description:
      "Analysis shows fresh basil and cilantro waste has been consistently high (28% waste rate). Switching to smaller, more frequent orders from Valley Fresh Farms could reduce waste by an estimated 40%.",
    impact: "Save $180/month on herb waste",
    impactValue: 180,
    confidence: 0.88,
    status: "new",
    createdAt: "2026-03-16 07:30",
    actions: [
      "Switch basil orders to 3x/week (10 bunches) instead of 1x/week (30 bunches)",
      "Negotiate daily herb delivery with Valley Fresh Farms",
      "Implement herb preservation techniques for kitchen staff",
    ],
  },
  {
    id: "3",
    type: "cost_saving",
    title: "Switch Olive Oil Supplier for 15% Savings",
    description:
      "Mediterranean Imports has increased prices 12% over 6 months. Comparable extra-virgin olive oil from BulkBuy Supply is available at $16.29/gal vs current $18.99/gal with similar quality ratings.",
    impact: "Save $324/month",
    impactValue: 324,
    confidence: 0.85,
    status: "viewed",
    createdAt: "2026-03-15 14:00",
    actions: [
      "Request sample from BulkBuy Supply",
      "Run taste comparison with kitchen team",
      "Negotiate volume discount for 10+ gallons/order",
    ],
  },
  {
    id: "4",
    type: "menu_optimization",
    title: "Slow-Moving Inventory: Create Weekend Specials",
    description:
      "Calamari and cod fillets have been moving 30% slower than forecast. Creating a weekend seafood special could move excess inventory before quality degrades and reduce waste.",
    impact: "Recover $450 in at-risk inventory",
    impactValue: 450,
    confidence: 0.82,
    status: "new",
    createdAt: "2026-03-15 10:00",
    actions: [
      "Create 'Fisherman's Platter' weekend special ($18.99)",
      "Feature calamari in happy hour appetizer menu",
      "Add cod fish tacos as Tuesday special",
    ],
  },
  {
    id: "5",
    type: "reorder",
    title: "Optimize Chicken Breast Safety Stock",
    description:
      "Current safety stock of 40 lbs is too low given demand variability. Analysis of 90-day sales data shows optimal safety stock should be 55 lbs to maintain 98% service level.",
    impact: "Reduce stockout risk by 60%",
    impactValue: 0,
    confidence: 0.94,
    status: "applied",
    createdAt: "2026-03-14 09:00",
    actions: [
      "Update reorder point from 40 to 55 lbs",
      "Adjust auto-ordering threshold",
      "Review lead time with Metro Meats",
    ],
  },
  {
    id: "6",
    type: "cost_saving",
    title: "Consolidate Tuesday/Wednesday Deliveries",
    description:
      "Separate deliveries from Valley Fresh Farms on Tuesday and Wednesday can be combined into a single larger order, saving on delivery fees and qualifying for a volume discount.",
    impact: "Save $240/month on delivery fees",
    impactValue: 240,
    confidence: 0.91,
    status: "viewed",
    createdAt: "2026-03-13 16:00",
    actions: [
      "Contact Valley Fresh Farms about combined delivery",
      "Adjust order schedule in system",
      "Ensure walk-in cooler has capacity for larger Tuesday delivery",
    ],
  },
];

const savingsByTypeData = [
  { type: "Waste Reduction", monthly: 580, annual: 6960 },
  { type: "Supplier Optimization", monthly: 564, annual: 6768 },
  { type: "Order Consolidation", monthly: 240, annual: 2880 },
  { type: "Menu Optimization", monthly: 450, annual: 5400 },
];

const typeIcons: Record<string, React.ElementType> = {
  cost_saving: DollarSign,
  menu_optimization: ChefHat,
  reorder: ShoppingCart,
  waste_reduction: Trash2,
  demand_spike: TrendingUp,
};

const typeColors: Record<string, string> = {
  cost_saving: "text-green-600",
  menu_optimization: "text-purple-600",
  reorder: "text-blue-600",
  waste_reduction: "text-orange-600",
  demand_spike: "text-red-600",
};

const statusIcons: Record<string, React.ElementType> = {
  new: Sparkles,
  viewed: Clock,
  applied: CheckCircle2,
  dismissed: Clock,
};

export default function InsightsPage() {
  const [filter, setFilter] = useState("all");

  const filteredInsights = insights.filter(
    (i) => filter === "all" || i.type === filter
  );

  const totalMonthlySavings = savingsByTypeData.reduce(
    (s, d) => s + d.monthly,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            Claude-powered recommendations to optimize your operations
          </p>
        </div>
        <Button className="gap-2">
          <Zap className="h-4 w-4" />
          Generate New Insights
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Insights</CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.filter((i) => i.status === "new").length}
            </div>
            <p className="text-xs text-muted-foreground">new recommendations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlySavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">if all applied</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Potential</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalMonthlySavings * 12).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.filter((i) => i.status === "applied").length}
            </div>
            <p className="text-xs text-muted-foreground">recommendations implemented</p>
          </CardContent>
        </Card>
      </div>

      {/* Savings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Potential Savings by Category</CardTitle>
          <CardDescription>Monthly and annualized savings estimates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsByTypeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="type" tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Bar dataKey="monthly" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} name="Monthly" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="demand_spike">Demand</TabsTrigger>
          <TabsTrigger value="waste_reduction">Waste</TabsTrigger>
          <TabsTrigger value="cost_saving">Cost</TabsTrigger>
          <TabsTrigger value="menu_optimization">Menu</TabsTrigger>
          <TabsTrigger value="reorder">Reorder</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredInsights.map((insight) => {
          const TypeIcon = typeIcons[insight.type];
          const StatusIcon = statusIcons[insight.status];

          return (
            <Card key={insight.id} className={insight.status === "new" ? "border-blue-200" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${typeColors[insight.type]}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant={
                            insight.status === "new"
                              ? "default"
                              : insight.status === "applied"
                              ? "success"
                              : "secondary"
                          }
                          className="gap-1"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {insight.status === "new"
                            ? "New"
                            : insight.status === "viewed"
                            ? "Reviewed"
                            : insight.status === "applied"
                            ? "Applied"
                            : "Dismissed"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Confidence: {(insight.confidence * 100).toFixed(0)}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {insight.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  {insight.impactValue > 0 && (
                    <Badge variant="success" className="text-base">
                      {insight.impact}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {insight.description}
                </p>
                <div className="rounded-md border bg-muted/30 p-4">
                  <p className="mb-2 text-sm font-medium">Recommended Actions:</p>
                  <ul className="space-y-2">
                    {insight.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                {insight.status !== "applied" && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm">Apply Recommendation</Button>
                    <Button size="sm" variant="outline">
                      Dismiss
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
