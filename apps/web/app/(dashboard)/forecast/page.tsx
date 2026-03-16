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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Scatter,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  CloudRain,
  Zap,
  RefreshCw,
  Download,
  Target,
} from "lucide-react";

const forecastData14Day = [
  { date: "Mar 16", predicted: 520, lower: 460, upper: 580, weather: "sunny", event: null },
  { date: "Mar 17", predicted: 480, lower: 420, upper: 540, weather: "sunny", event: null },
  { date: "Mar 18", predicted: 510, lower: 445, upper: 575, weather: "cloudy", event: null },
  { date: "Mar 19", predicted: 495, lower: 430, upper: 560, weather: "rain", event: null },
  { date: "Mar 20", predicted: 530, lower: 465, upper: 595, weather: "sunny", event: null },
  { date: "Mar 21", predicted: 680, lower: 600, upper: 760, weather: "sunny", event: "St. Patrick's Festival" },
  { date: "Mar 22", predicted: 720, lower: 635, upper: 805, weather: "sunny", event: "St. Patrick's Festival" },
  { date: "Mar 23", predicted: 490, lower: 425, upper: 555, weather: "cloudy", event: null },
  { date: "Mar 24", predicted: 460, lower: 395, upper: 525, weather: "rain", event: null },
  { date: "Mar 25", predicted: 505, lower: 435, upper: 575, weather: "sunny", event: null },
  { date: "Mar 26", predicted: 515, lower: 440, upper: 590, weather: "sunny", event: null },
  { date: "Mar 27", predicted: 540, lower: 460, upper: 620, weather: "cloudy", event: null },
  { date: "Mar 28", predicted: 650, lower: 560, upper: 740, weather: "sunny", event: "College Basketball" },
  { date: "Mar 29", predicted: 670, lower: 575, upper: 765, weather: "sunny", event: "College Basketball" },
];

const accuracyHistoryData = [
  { week: "Feb W1", mape: 6.2, accuracy: 93.8 },
  { week: "Feb W2", mape: 5.8, accuracy: 94.2 },
  { week: "Feb W3", mape: 7.1, accuracy: 92.9 },
  { week: "Feb W4", mape: 4.9, accuracy: 95.1 },
  { week: "Mar W1", mape: 5.3, accuracy: 94.7 },
  { week: "Mar W2", mape: 4.5, accuracy: 95.5 },
];

const categoryForecastData = [
  { category: "Produce", current: 320, predicted7d: 2240, predicted14d: 4480, trend: 12 },
  { category: "Proteins", current: 215, predicted7d: 1505, predicted14d: 3010, trend: 8 },
  { category: "Dairy", current: 180, predicted7d: 1260, predicted14d: 2520, trend: -3 },
  { category: "Dry Goods", current: 290, predicted7d: 580, predicted14d: 1160, trend: 2 },
  { category: "Beverages", current: 145, predicted7d: 1015, predicted14d: 2030, trend: 18 },
  { category: "Frozen", current: 97, predicted7d: 291, predicted14d: 582, trend: -5 },
];

const featureImportanceData = [
  { feature: "Day of Week", importance: 0.32 },
  { feature: "Historical Sales", importance: 0.28 },
  { feature: "Weather", importance: 0.15 },
  { feature: "Local Events", importance: 0.12 },
  { feature: "Season/Month", importance: 0.08 },
  { feature: "Holidays", importance: 0.05 },
];

const productForecasts = [
  {
    name: "Chicken Breast",
    category: "Proteins",
    currentStock: 85,
    predictedDemand7d: 210,
    reorderNeeded: true,
    reorderQty: 150,
    confidence: 0.94,
  },
  {
    name: "Roma Tomatoes",
    category: "Produce",
    currentStock: 23,
    predictedDemand7d: 180,
    reorderNeeded: true,
    reorderQty: 200,
    confidence: 0.91,
  },
  {
    name: "Avocados",
    category: "Produce",
    currentStock: 45,
    predictedDemand7d: 280,
    reorderNeeded: true,
    reorderQty: 300,
    confidence: 0.89,
  },
  {
    name: "Sourdough Bread",
    category: "Dry Goods",
    currentStock: 60,
    predictedDemand7d: 175,
    reorderNeeded: true,
    reorderQty: 150,
    confidence: 0.92,
  },
  {
    name: "Oat Milk",
    category: "Dairy",
    currentStock: 90,
    predictedDemand7d: 140,
    reorderNeeded: false,
    reorderQty: 0,
    confidence: 0.96,
  },
  {
    name: "Olive Oil",
    category: "Dry Goods",
    currentStock: 12,
    predictedDemand7d: 6,
    reorderNeeded: false,
    reorderQty: 0,
    confidence: 0.97,
  },
];

export default function ForecastPage() {
  const [timeRange, setTimeRange] = useState("14d");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demand Forecasts</h1>
          <p className="text-muted-foreground">
            AI-powered demand predictions for the next 14 days
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="produce">Produce</SelectItem>
              <SelectItem value="proteins">Proteins</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="dry-goods">Dry Goods</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="frozen">Frozen</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retrain Models
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Model Performance Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MAPE (7-day)</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5%</div>
            <p className="text-xs text-green-600">Best performing period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.5%</div>
            <p className="text-xs text-green-600">+0.8% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather Impact</CardTitle>
            <CloudRain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-12%</div>
            <p className="text-xs text-muted-foreground">Rain days avg. impact</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Impact</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+28%</div>
            <p className="text-xs text-muted-foreground">2 events this period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demand" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
          <TabsTrigger value="products">By Product</TabsTrigger>
          <TabsTrigger value="accuracy">Model Accuracy</TabsTrigger>
          <TabsTrigger value="features">Feature Importance</TabsTrigger>
        </TabsList>

        <TabsContent value="demand" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>14-Day Demand Forecast</CardTitle>
                  <CardDescription>
                    Total daily units with confidence intervals
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {["7d", "14d", "30d"].map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      variant={timeRange === range ? "default" : "outline"}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={forecastData14Day}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(214, 32%, 91%)",
                        borderRadius: "8px",
                      }}
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0]?.payload;
                        return (
                          <div className="rounded-lg border bg-white p-3 shadow-sm">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-blue-600">
                              Predicted: {data.predicted} units
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Range: {data.lower} - {data.upper}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Weather: {data.weather}
                            </p>
                            {data.event && (
                              <p className="mt-1 text-xs font-medium text-orange-600">
                                Event: {data.event}
                              </p>
                            )}
                          </div>
                        );
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="upper"
                      stroke="none"
                      fill="hsl(221, 83%, 53%)"
                      fillOpacity={0.1}
                    />
                    <Area
                      type="monotone"
                      dataKey="lower"
                      stroke="none"
                      fill="white"
                      fillOpacity={0.8}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="hsl(221, 83%, 53%)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "hsl(221, 83%, 53%)" }}
                      name="Predicted Demand"
                    />
                    <Scatter
                      dataKey="predicted"
                      fill="hsl(38, 92%, 50%)"
                      shape={(props: Record<string, unknown>) => {
                        const data = forecastData14Day[props.index as number];
                        if (!data?.event) return <></>;
                        return (
                          <circle
                            cx={props.cx as number}
                            cy={(props.cy as number) - 20}
                            r={6}
                            fill="hsl(38, 92%, 50%)"
                            stroke="white"
                            strokeWidth={2}
                          />
                        );
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  Predicted Demand
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500/20" />
                  Confidence Interval
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500" />
                  Local Event
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Demand Forecast</CardTitle>
              <CardDescription>Predicted demand totals by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryForecastData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="category" tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="predicted7d" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} name="7-Day Demand" />
                    <Bar dataKey="predicted14d" fill="hsl(221, 83%, 73%)" radius={[4, 4, 0, 0]} name="14-Day Demand" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product-Level Forecasts</CardTitle>
              <CardDescription>Individual product demand predictions and reorder recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productForecasts.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{product.name}</p>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Current: {product.currentStock} units | 7-day demand:{" "}
                        {product.predictedDemand7d} units
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <p className="font-medium">
                          {(product.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                      {product.reorderNeeded ? (
                        <Button size="sm" className="gap-1">
                          <Zap className="h-3 w-3" />
                          Order {product.reorderQty}
                        </Button>
                      ) : (
                        <Badge variant="success">Sufficient</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accuracy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecast Accuracy History</CardTitle>
              <CardDescription>Weekly MAPE and accuracy trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} domain={[85, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth={2}
                      dot={{ r: 5 }}
                      name="Accuracy %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Importance</CardTitle>
              <CardDescription>
                Which factors contribute most to forecast accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureImportanceData}
                    layout="vertical"
                    margin={{ left: 120 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      type="number"
                      domain={[0, 0.4]}
                      tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                      tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="feature"
                      type="category"
                      tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
                    />
                    <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
                    <Bar
                      dataKey="importance"
                      fill="hsl(221, 83%, 53%)"
                      radius={[0, 4, 4, 0]}
                      name="Importance"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
