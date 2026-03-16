"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Trash2,
  DollarSign,
  TrendingDown,
  AlertTriangle,
  Plus,
  Lightbulb,
  Calendar,
} from "lucide-react";

const wasteTrendData = [
  { week: "Feb W1", cost: 780, units: 245 },
  { week: "Feb W2", cost: 920, units: 310 },
  { week: "Feb W3", cost: 650, units: 198 },
  { week: "Feb W4", cost: 840, units: 275 },
  { week: "Mar W1", cost: 710, units: 230 },
  { week: "Mar W2", cost: 580, units: 185 },
];

const wasteByReasonData = [
  { reason: "Expired", value: 42, color: "hsl(0, 84%, 60%)" },
  { reason: "Overproduction", value: 28, color: "hsl(38, 92%, 50%)" },
  { reason: "Quality Issue", value: 15, color: "hsl(280, 65%, 60%)" },
  { reason: "Damaged", value: 10, color: "hsl(221, 83%, 53%)" },
  { reason: "Other", value: 5, color: "hsl(215, 16%, 47%)" },
];

const wasteByCategoryData = [
  { category: "Produce", current: 340, previous: 520 },
  { category: "Proteins", current: 280, previous: 310 },
  { category: "Dairy", current: 180, previous: 240 },
  { category: "Prepared", current: 150, previous: 210 },
  { category: "Bread/Baked", current: 120, previous: 180 },
];

const recentWasteLogs = [
  {
    id: "1",
    product: "Mixed Greens",
    quantity: 12,
    unit: "lbs",
    cost: 63.24,
    reason: "expired",
    loggedAt: "2026-03-16 14:30",
    loggedBy: "Maria S.",
  },
  {
    id: "2",
    product: "Sourdough Bread",
    quantity: 8,
    unit: "loaves",
    cost: 35.92,
    reason: "overproduction",
    loggedAt: "2026-03-16 10:15",
    loggedBy: "James K.",
  },
  {
    id: "3",
    product: "Salmon Fillet",
    quantity: 3,
    unit: "lbs",
    cost: 38.97,
    reason: "quality",
    loggedAt: "2026-03-15 18:45",
    loggedBy: "Maria S.",
  },
  {
    id: "4",
    product: "Fresh Basil",
    quantity: 5,
    unit: "bunches",
    cost: 14.95,
    reason: "expired",
    loggedAt: "2026-03-15 16:00",
    loggedBy: "Tom R.",
  },
  {
    id: "5",
    product: "Avocados",
    quantity: 15,
    unit: "each",
    cost: 22.35,
    reason: "quality",
    loggedAt: "2026-03-15 11:30",
    loggedBy: "James K.",
  },
  {
    id: "6",
    product: "Chicken Breast",
    quantity: 6,
    unit: "lbs",
    cost: 29.94,
    reason: "expired",
    loggedAt: "2026-03-14 17:00",
    loggedBy: "Tom R.",
  },
];

const atRiskItems = [
  {
    name: "Fresh Basil",
    quantity: 8,
    unit: "bunches",
    daysToExpiry: 2,
    estimatedWasteCost: 23.92,
    suggestion: "Run basil pesto special tonight",
  },
  {
    name: "Sourdough Bread",
    quantity: 15,
    unit: "loaves",
    daysToExpiry: 1,
    estimatedWasteCost: 67.35,
    suggestion: "Offer bread pudding dessert or crouton prep",
  },
  {
    name: "Strawberries",
    quantity: 10,
    unit: "lbs",
    daysToExpiry: 2,
    estimatedWasteCost: 39.9,
    suggestion: "Add strawberry smoothie to specials board",
  },
  {
    name: "Heavy Cream",
    quantity: 4,
    unit: "gal",
    daysToExpiry: 3,
    estimatedWasteCost: 35.96,
    suggestion: "Increase cream-based soup portions",
  },
];

const reasonBadgeVariant: Record<string, "danger" | "warning" | "secondary" | "default"> = {
  expired: "danger",
  overproduction: "warning",
  quality: "secondary",
  damaged: "secondary",
  other: "default",
};

export default function WastePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Waste Tracking</h1>
          <p className="text-muted-foreground">
            Monitor waste, identify patterns, and reduce losses
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Log Waste
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Waste Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$580</div>
            <p className="text-xs text-green-600">-18% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Units Wasted</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185</div>
            <p className="text-xs text-green-600">-19.6% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">of total inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atRiskItems.length}</div>
            <p className="text-xs text-muted-foreground">
              ${atRiskItems.reduce((s, i) => s + i.estimatedWasteCost, 0).toFixed(0)} potential loss
            </p>
          </CardContent>
        </Card>
      </div>

      {/* At-Risk Items */}
      <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Perishable Items at Risk
          </CardTitle>
          <CardDescription>
            Items approaching expiry with AI-suggested actions to minimize waste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {atRiskItems.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border bg-white p-4 dark:bg-gray-950"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} {item.unit} - expires in {item.daysToExpiry}d
                    </p>
                  </div>
                  <Badge variant="danger">${item.estimatedWasteCost.toFixed(2)}</Badge>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-md bg-blue-50 p-2 dark:bg-blue-950/30">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {item.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Waste Cost Trend</CardTitle>
            <CardDescription>Weekly waste costs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wasteTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(v: number) => `$${v}`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="hsl(0, 84%, 60%)"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    name="Waste Cost ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste by Reason</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteByReasonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {wasteByReasonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1">
              {wasteByReasonData.map((r) => (
                <div key={r.reason} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: r.color }} />
                    {r.reason}
                  </div>
                  <span className="font-medium">{r.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Waste by Category (This Week vs Last)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteByCategoryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="category" tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v: number) => `$${v}`} />
                <Legend />
                <Bar dataKey="previous" fill="hsl(0, 84%, 80%)" radius={[4, 4, 0, 0]} name="Last Week" />
                <Bar dataKey="current" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} name="This Week" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Waste Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Waste Logs</CardTitle>
          <CardDescription>Latest waste entries recorded by staff</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Logged By</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentWasteLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.product}</TableCell>
                  <TableCell>
                    {log.quantity} {log.unit}
                  </TableCell>
                  <TableCell className="text-red-600">${log.cost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={reasonBadgeVariant[log.reason] || "default"}>
                      {log.reason}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.loggedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{log.loggedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
