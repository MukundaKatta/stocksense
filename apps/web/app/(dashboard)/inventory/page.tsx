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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Search,
  Plus,
  Filter,
  Download,
  AlertTriangle,
  Clock,
  ArrowUpDown,
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  onHand: number;
  unit: string;
  reorderPoint: number;
  maxLevel: number;
  dailyUsage: number;
  costPerUnit: number;
  isPerishable: boolean;
  shelfLifeDays: number | null;
  daysReceived: number | null;
  supplier: string;
  lastCounted: string;
}

const inventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Roma Tomatoes",
    sku: "PRD-001",
    category: "Produce",
    onHand: 23,
    unit: "lbs",
    reorderPoint: 50,
    maxLevel: 200,
    dailyUsage: 15,
    costPerUnit: 2.49,
    isPerishable: true,
    shelfLifeDays: 7,
    daysReceived: 4,
    supplier: "Valley Fresh Farms",
    lastCounted: "2026-03-15",
  },
  {
    id: "2",
    name: "Chicken Breast",
    sku: "PRO-001",
    category: "Proteins",
    onHand: 85,
    unit: "lbs",
    reorderPoint: 40,
    maxLevel: 150,
    dailyUsage: 20,
    costPerUnit: 4.99,
    isPerishable: true,
    shelfLifeDays: 5,
    daysReceived: 1,
    supplier: "Metro Meats",
    lastCounted: "2026-03-16",
  },
  {
    id: "3",
    name: "Mozzarella Cheese",
    sku: "DAI-001",
    category: "Dairy",
    onHand: 30,
    unit: "lbs",
    reorderPoint: 25,
    maxLevel: 100,
    dailyUsage: 10,
    costPerUnit: 6.99,
    isPerishable: true,
    shelfLifeDays: 21,
    daysReceived: 8,
    supplier: "Artisan Dairy Co",
    lastCounted: "2026-03-14",
  },
  {
    id: "4",
    name: "Olive Oil (Extra Virgin)",
    sku: "DRY-001",
    category: "Dry Goods",
    onHand: 12,
    unit: "gal",
    reorderPoint: 5,
    maxLevel: 24,
    dailyUsage: 0.8,
    costPerUnit: 18.99,
    isPerishable: false,
    shelfLifeDays: null,
    daysReceived: null,
    supplier: "Mediterranean Imports",
    lastCounted: "2026-03-12",
  },
  {
    id: "5",
    name: "All-Purpose Flour",
    sku: "DRY-002",
    category: "Dry Goods",
    onHand: 145,
    unit: "lbs",
    reorderPoint: 50,
    maxLevel: 200,
    dailyUsage: 7,
    costPerUnit: 0.89,
    isPerishable: false,
    shelfLifeDays: null,
    daysReceived: null,
    supplier: "BulkBuy Supply",
    lastCounted: "2026-03-10",
  },
  {
    id: "6",
    name: "Fresh Basil",
    sku: "PRD-002",
    category: "Produce",
    onHand: 8,
    unit: "bunches",
    reorderPoint: 10,
    maxLevel: 30,
    dailyUsage: 4,
    costPerUnit: 2.99,
    isPerishable: true,
    shelfLifeDays: 5,
    daysReceived: 3,
    supplier: "Valley Fresh Farms",
    lastCounted: "2026-03-15",
  },
  {
    id: "7",
    name: "Salmon Fillet",
    sku: "PRO-002",
    category: "Proteins",
    onHand: 42,
    unit: "lbs",
    reorderPoint: 20,
    maxLevel: 80,
    dailyUsage: 8,
    costPerUnit: 12.99,
    isPerishable: true,
    shelfLifeDays: 3,
    daysReceived: 1,
    supplier: "Pacific Seafood",
    lastCounted: "2026-03-16",
  },
  {
    id: "8",
    name: "Avocados",
    sku: "PRD-003",
    category: "Produce",
    onHand: 45,
    unit: "each",
    reorderPoint: 30,
    maxLevel: 120,
    dailyUsage: 40,
    costPerUnit: 1.49,
    isPerishable: true,
    shelfLifeDays: 4,
    daysReceived: 2,
    supplier: "Valley Fresh Farms",
    lastCounted: "2026-03-16",
  },
  {
    id: "9",
    name: "Sourdough Bread",
    sku: "DRY-003",
    category: "Dry Goods",
    onHand: 60,
    unit: "loaves",
    reorderPoint: 25,
    maxLevel: 80,
    dailyUsage: 25,
    costPerUnit: 4.49,
    isPerishable: true,
    shelfLifeDays: 3,
    daysReceived: 0,
    supplier: "City Bakehouse",
    lastCounted: "2026-03-16",
  },
  {
    id: "10",
    name: "Oat Milk",
    sku: "BEV-001",
    category: "Beverages",
    onHand: 90,
    unit: "cartons",
    reorderPoint: 30,
    maxLevel: 120,
    dailyUsage: 12,
    costPerUnit: 3.99,
    isPerishable: true,
    shelfLifeDays: 14,
    daysReceived: 5,
    supplier: "Natural Bev Dist",
    lastCounted: "2026-03-15",
  },
];

function getStockStatus(item: InventoryItem) {
  if (item.onHand <= item.reorderPoint) return "critical";
  if (item.onHand / item.maxLevel < 0.35) return "low";
  return "healthy";
}

function getDaysUntilExpiry(item: InventoryItem): number | null {
  if (!item.isPerishable || !item.shelfLifeDays || item.daysReceived === null) return null;
  return item.shelfLifeDays - item.daysReceived;
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || getStockStatus(item) === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const criticalCount = inventoryData.filter(
    (i) => getStockStatus(i) === "critical"
  ).length;
  const lowCount = inventoryData.filter(
    (i) => getStockStatus(i) === "low"
  ).length;
  const healthyCount = inventoryData.filter(
    (i) => getStockStatus(i) === "healthy"
  ).length;
  const totalValue = inventoryData.reduce(
    (sum, i) => sum + i.onHand * i.costPerUnit,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Current stock levels and inventory management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low/Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className="text-red-600">{criticalCount}</span>
              {" / "}
              <span className="text-yellow-600">{lowCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{healthyCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Produce">Produce</SelectItem>
                <SelectItem value="Proteins">Proteins</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Dry Goods">Dry Goods</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Product <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>On Hand</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Days Supply</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const status = getStockStatus(item);
                const pct = (item.onHand / item.maxLevel) * 100;
                const daysSupply = item.dailyUsage > 0
                  ? Math.floor(item.onHand / item.dailyUsage)
                  : null;
                const daysToExpiry = getDaysUntilExpiry(item);

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{item.onHand}</span>{" "}
                      <span className="text-muted-foreground">{item.unit}</span>
                    </TableCell>
                    <TableCell className="w-40">
                      <div className="space-y-1">
                        <Progress
                          value={pct}
                          className="h-2"
                          indicatorClassName={
                            status === "critical"
                              ? "bg-red-500"
                              : status === "low"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }
                        />
                        <p className="text-[10px] text-muted-foreground">
                          {item.onHand} / {item.maxLevel} (ROP: {item.reorderPoint})
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {daysSupply !== null ? (
                        <span
                          className={
                            daysSupply <= 2
                              ? "font-medium text-red-600"
                              : daysSupply <= 5
                              ? "text-yellow-600"
                              : ""
                          }
                        >
                          {daysSupply}d
                        </span>
                      ) : (
                        <span className="text-muted-foreground">--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {daysToExpiry !== null ? (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span
                            className={
                              daysToExpiry <= 2
                                ? "font-medium text-red-600"
                                : daysToExpiry <= 4
                                ? "text-yellow-600"
                                : "text-muted-foreground"
                            }
                          >
                            {daysToExpiry}d
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{item.supplier}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          status === "critical"
                            ? "danger"
                            : status === "low"
                            ? "warning"
                            : "success"
                        }
                      >
                        {status === "critical"
                          ? "Critical"
                          : status === "low"
                          ? "Low"
                          : "Healthy"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
