"use client";

import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const kpiCards = [
  {
    title: "Total SKUs",
    value: "1,247",
    change: "+12",
    trend: "up" as const,
    icon: Package,
    description: "Active products tracked",
  },
  {
    title: "Forecast Accuracy",
    value: "94.2%",
    change: "+2.1%",
    trend: "up" as const,
    icon: TrendingUp,
    description: "7-day rolling average",
  },
  {
    title: "Low Stock Alerts",
    value: "18",
    change: "-5",
    trend: "down" as const,
    icon: AlertTriangle,
    description: "Items below reorder point",
  },
  {
    title: "Monthly Waste Cost",
    value: "$2,340",
    change: "-18.3%",
    trend: "down" as const,
    icon: DollarSign,
    description: "vs. last month",
  },
];

const salesForecastData = [
  { date: "Mar 10", actual: 4200, forecast: 4100, lower: 3800, upper: 4400 },
  { date: "Mar 11", actual: 3800, forecast: 3900, lower: 3600, upper: 4200 },
  { date: "Mar 12", actual: 4500, forecast: 4300, lower: 4000, upper: 4600 },
  { date: "Mar 13", actual: 5100, forecast: 4800, lower: 4400, upper: 5200 },
  { date: "Mar 14", actual: 5600, forecast: 5500, lower: 5100, upper: 5900 },
  { date: "Mar 15", actual: 6200, forecast: 5900, lower: 5500, upper: 6300 },
  { date: "Mar 16", actual: null, forecast: 5400, lower: 4900, upper: 5900 },
  { date: "Mar 17", actual: null, forecast: 4800, lower: 4300, upper: 5300 },
  { date: "Mar 18", actual: null, forecast: 5100, lower: 4600, upper: 5600 },
  { date: "Mar 19", actual: null, forecast: 5500, lower: 4900, upper: 6100 },
  { date: "Mar 20", actual: null, forecast: 5800, lower: 5200, upper: 6400 },
  { date: "Mar 21", actual: null, forecast: 6100, lower: 5400, upper: 6800 },
  { date: "Mar 22", actual: null, forecast: 6500, lower: 5700, upper: 7300 },
  { date: "Mar 23", actual: null, forecast: 5200, lower: 4500, upper: 5900 },
];

const inventoryByCategoryData = [
  { category: "Produce", value: 320, color: "hsl(142, 76%, 36%)" },
  { category: "Proteins", value: 215, color: "hsl(221, 83%, 53%)" },
  { category: "Dairy", value: 180, color: "hsl(38, 92%, 50%)" },
  { category: "Dry Goods", value: 290, color: "hsl(280, 65%, 60%)" },
  { category: "Beverages", value: 145, color: "hsl(340, 75%, 55%)" },
  { category: "Frozen", value: 97, color: "hsl(200, 70%, 50%)" },
];

const topMoversData = [
  { name: "Chicken Breast", sold: 340, trend: 15.2 },
  { name: "Avocados", sold: 280, trend: 22.1 },
  { name: "Sourdough Bread", sold: 245, trend: -5.3 },
  { name: "Oat Milk", sold: 210, trend: 31.4 },
  { name: "Salmon Fillet", sold: 195, trend: 8.7 },
];

const recentAlerts = [
  {
    id: 1,
    type: "low_stock" as const,
    message: "Roma Tomatoes below reorder point (23 lbs remaining)",
    time: "12 min ago",
    severity: "danger" as const,
  },
  {
    id: 2,
    type: "waste_risk" as const,
    message: "Fresh Basil expires in 2 days (8 bunches at risk)",
    time: "1 hr ago",
    severity: "warning" as const,
  },
  {
    id: 3,
    type: "forecast" as const,
    message: "Weekend demand spike predicted: +35% for burger patties",
    time: "2 hrs ago",
    severity: "success" as const,
  },
  {
    id: 4,
    type: "po_ready" as const,
    message: "Purchase order #PO-1247 ready for approval ($3,240)",
    time: "3 hrs ago",
    severity: "warning" as const,
  },
  {
    id: 5,
    type: "low_stock" as const,
    message: "Mozzarella Cheese at 30% of max level",
    time: "4 hrs ago",
    severity: "danger" as const,
  },
];

const weeklyWasteData = [
  { day: "Mon", waste: 120, cost: 340 },
  { day: "Tue", waste: 85, cost: 245 },
  { day: "Wed", waste: 95, cost: 280 },
  { day: "Thu", waste: 110, cost: 310 },
  { day: "Fri", waste: 65, cost: 190 },
  { day: "Sat", waste: 140, cost: 410 },
  { day: "Sun", waste: 155, cost: 450 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Inventory health and demand forecasting overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-green-600" />
                )}
                <span className="text-green-600">{kpi.change}</span>
                <span className="text-muted-foreground">
                  {kpi.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Sales vs Forecast Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales vs Forecast</CardTitle>
            <CardDescription>
              Actual sales compared to AI predictions with confidence bands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesForecastData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    className="text-xs"
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stackId="confidence"
                    stroke="none"
                    fill="hsl(221, 83%, 53%)"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stackId="confidence"
                    stroke="none"
                    fill="hsl(0, 0%, 100%)"
                    fillOpacity={1}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="hsl(221, 83%, 53%)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="none"
                    name="Forecast"
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth={2}
                    fill="hsl(142, 76%, 36%)"
                    fillOpacity={0.1}
                    name="Actual Sales"
                    connectNulls={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inventory by Category */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Current stock distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryByCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {inventoryByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {inventoryByCategoryData.map((cat) => (
                <div key={cat.category} className="flex items-center gap-2 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-muted-foreground">{cat.category}</span>
                  <span className="ml-auto font-medium">{cat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Movers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Top Movers (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMoversData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.sold} units sold
                    </p>
                  </div>
                  <Badge variant={item.trend > 0 ? "success" : "danger"}>
                    {item.trend > 0 ? "+" : ""}
                    {item.trend}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-md border p-3"
                >
                  <Badge variant={alert.severity} className="mt-0.5 shrink-0">
                    {alert.type === "low_stock"
                      ? "Low"
                      : alert.type === "waste_risk"
                      ? "Waste"
                      : alert.type === "forecast"
                      ? "AI"
                      : "PO"}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-xs leading-relaxed">{alert.message}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Waste */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Weekly Waste
            </CardTitle>
            <CardDescription>Units wasted by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyWasteData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="day"
                    className="text-xs"
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="waste"
                    fill="hsl(0, 84%, 60%)"
                    radius={[4, 4, 0, 0]}
                    name="Units Wasted"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Health */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Health</CardTitle>
          <CardDescription>
            Stock levels relative to reorder points and maximums
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Roma Tomatoes", current: 23, reorder: 50, max: 200, unit: "lbs", daysLeft: 1.5 },
              { name: "Chicken Breast", current: 85, reorder: 40, max: 150, unit: "lbs", daysLeft: 4.2 },
              { name: "Mozzarella Cheese", current: 30, reorder: 25, max: 100, unit: "lbs", daysLeft: 3.1 },
              { name: "Olive Oil", current: 12, reorder: 5, max: 24, unit: "gal", daysLeft: 14 },
              { name: "All-Purpose Flour", current: 145, reorder: 50, max: 200, unit: "lbs", daysLeft: 21 },
              { name: "Fresh Basil", current: 8, reorder: 10, max: 30, unit: "bunches", daysLeft: 2 },
            ].map((item) => {
              const pct = (item.current / item.max) * 100;
              const isLow = item.current <= item.reorder;
              const isWarning = pct < 35 && !isLow;
              return (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-40 shrink-0">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.current} {item.unit} / {item.max} {item.unit}
                    </p>
                  </div>
                  <div className="flex-1">
                    <Progress
                      value={pct}
                      className="h-2"
                      indicatorClassName={
                        isLow
                          ? "bg-red-500"
                          : isWarning
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }
                    />
                  </div>
                  <div className="w-28 text-right">
                    <Badge variant={isLow ? "danger" : isWarning ? "warning" : "success"}>
                      {item.daysLeft < 3
                        ? `${item.daysLeft}d left`
                        : `${Math.round(item.daysLeft)}d supply`}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
