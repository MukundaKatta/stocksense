import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}

export function getStockStatusColor(
  current: number,
  reorderPoint: number,
  maxLevel: number
): "success" | "warning" | "destructive" {
  const ratio = current / maxLevel;
  if (current <= reorderPoint) return "destructive";
  if (ratio < 0.35) return "warning";
  return "success";
}

export function daysUntilStockout(
  currentQty: number,
  dailyUsageRate: number
): number | null {
  if (dailyUsageRate <= 0) return null;
  return Math.floor(currentQty / dailyUsageRate);
}
