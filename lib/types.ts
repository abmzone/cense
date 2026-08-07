export type OrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type ProfileRole = "customer" | "admin";

export interface ProductVariant {
  id: string;
  product_id: string;
  label: string; // e.g. "40g"
  weight_grams: number;
  burn_time_minutes: number;
  price: number; // paise
  compare_at_price: number | null; // paise
  stock: number;
  sku: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string;
  position: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  fragrance_notes: string[];
  ingredients: string[];
  directions: string;
  collection: "floral" | "fresh" | "woody";
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  product_name: string;
  variant_label: string;
  unit_price: number; // paise
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  email: string;
  phone: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  tax: number;
  total: number;
  coupon_code: string | null;
  payment_method: "razorpay" | "cod";
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  shipping_address: Address | Record<string, string>;
  tracking_number: string | null;
  created_at: string;
  items: OrderItem[];
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  min_order_value: number;
  usage_limit: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
}

export interface Settings {
  free_shipping_threshold: number; // paise
  standard_shipping_fee: number; // paise
  tax_rate_percent: number;
  cod_enabled: boolean;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
}

export interface Faq {
  id: string;
  category: "shipping" | "returns" | "safety" | "burning" | "ingredients";
  question: string;
  answer: string;
  position: number;
}

export interface Banner {
  id: string;
  key: string; // e.g. "home-hero"
  heading: string;
  subheading: string;
  cta_label: string;
  cta_href: string;
  is_active: boolean;
}

export interface CartLine {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantLabel: string;
  unitPrice: number; // paise
  quantity: number;
  image: string | null;
}
