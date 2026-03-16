export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          type: "restaurant" | "retail" | "grocery" | "other";
          address: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          lat: number | null;
          lng: number | null;
          timezone: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan: "free" | "starter" | "pro" | "enterprise";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["organizations"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["organizations"]["Insert"]
        >;
      };
      products: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          sku: string | null;
          category: string;
          subcategory: string | null;
          unit: string;
          cost_per_unit: number;
          price_per_unit: number | null;
          is_perishable: boolean;
          shelf_life_days: number | null;
          min_order_qty: number;
          order_lead_time_days: number;
          pos_item_id: string | null;
          pos_source: "square" | "shopify" | "clover" | "toast" | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["products"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["products"]["Insert"]
        >;
      };
      inventory_levels: {
        Row: {
          id: string;
          org_id: string;
          product_id: string;
          quantity_on_hand: number;
          reorder_point: number;
          max_level: number;
          last_counted_at: string;
          last_received_at: string | null;
          daily_usage_rate: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["inventory_levels"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["inventory_levels"]["Insert"]
        >;
      };
      sales_history: {
        Row: {
          id: string;
          org_id: string;
          product_id: string;
          sale_date: string;
          quantity_sold: number;
          revenue: number;
          cost: number;
          pos_transaction_id: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["sales_history"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["sales_history"]["Insert"]
        >;
      };
      forecasts: {
        Row: {
          id: string;
          org_id: string;
          product_id: string;
          forecast_date: string;
          predicted_demand: number;
          lower_bound: number;
          upper_bound: number;
          confidence: number;
          model_version: string;
          features_used: Json;
          actual_demand: number | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["forecasts"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["forecasts"]["Insert"]
        >;
      };
      purchase_orders: {
        Row: {
          id: string;
          org_id: string;
          supplier_id: string | null;
          status: "draft" | "pending_approval" | "approved" | "sent" | "received" | "cancelled";
          order_date: string;
          expected_delivery: string | null;
          total_amount: number;
          notes: string | null;
          auto_generated: boolean;
          items: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["purchase_orders"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["purchase_orders"]["Insert"]
        >;
      };
      waste_logs: {
        Row: {
          id: string;
          org_id: string;
          product_id: string;
          quantity_wasted: number;
          waste_cost: number;
          reason: "expired" | "damaged" | "overproduction" | "quality" | "other";
          logged_at: string;
          logged_by: string;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["waste_logs"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["waste_logs"]["Insert"]
        >;
      };
      weather_data: {
        Row: {
          id: string;
          org_id: string;
          date: string;
          temp_high: number;
          temp_low: number;
          precipitation_mm: number;
          weather_condition: string;
          wind_speed_kph: number;
          humidity_percent: number;
          is_forecast: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["weather_data"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["weather_data"]["Insert"]
        >;
      };
      events_data: {
        Row: {
          id: string;
          org_id: string;
          event_name: string;
          event_date: string;
          event_type: "holiday" | "sports" | "concert" | "festival" | "convention" | "other";
          expected_impact: "high" | "medium" | "low";
          distance_km: number | null;
          expected_attendance: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["events_data"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["events_data"]["Insert"]
        >;
      };
      supplier_contacts: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          company: string;
          email: string | null;
          phone: string | null;
          categories: string[];
          lead_time_days: number;
          min_order_amount: number;
          notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["supplier_contacts"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["supplier_contacts"]["Insert"]
        >;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      org_type: "restaurant" | "retail" | "grocery" | "other";
      plan_type: "free" | "starter" | "pro" | "enterprise";
      po_status: "draft" | "pending_approval" | "approved" | "sent" | "received" | "cancelled";
      waste_reason: "expired" | "damaged" | "overproduction" | "quality" | "other";
      event_type: "holiday" | "sports" | "concert" | "festival" | "convention" | "other";
      impact_level: "high" | "medium" | "low";
      pos_source: "square" | "shopify" | "clover" | "toast";
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
