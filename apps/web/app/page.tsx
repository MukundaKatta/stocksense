import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Package,
  ShoppingCart,
  Trash2,
  Lightbulb,
  Plug,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Inventory Dashboard",
    description:
      "Real-time view of stock levels across all locations with health indicators and alerts.",
  },
  {
    icon: TrendingUp,
    title: "AI Demand Forecasting",
    description:
      "Prophet-powered predictions using sales history, weather, events, and seasonal trends.",
  },
  {
    icon: Package,
    title: "Smart Inventory Management",
    description:
      "Automated reorder points, safety stock calculations, and lead-time optimization.",
  },
  {
    icon: ShoppingCart,
    title: "Auto Purchase Orders",
    description:
      "System-generated POs based on forecasts with one-click approval and supplier routing.",
  },
  {
    icon: Trash2,
    title: "Waste Reduction",
    description:
      "Track and predict perishable waste. Get AI suggestions for specials on slow-moving items.",
  },
  {
    icon: Lightbulb,
    title: "AI Insights",
    description:
      "Claude-powered recommendations for menu planning, prep quantities, and cost savings.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">StockSense</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Stop guessing.
            <br />
            <span className="text-primary">Start forecasting.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            StockSense uses AI to predict demand, optimize inventory levels, and
            auto-generate purchase orders — so you never overstock or run out.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/overview">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900"
              >
                <feature.icon className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t bg-muted/50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Connects with your POS</h2>
            <p className="mt-2 text-muted-foreground">
              Seamlessly integrate with the systems you already use.
            </p>
            <div className="mt-8 flex items-center justify-center gap-12">
              {["Square", "Shopify", "Clover", "Toast"].map((pos) => (
                <div
                  key={pos}
                  className="flex items-center gap-2 text-lg font-medium text-muted-foreground"
                >
                  <Plug className="h-5 w-5" />
                  {pos}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} StockSense. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
