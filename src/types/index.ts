/** تایپ‌های مشترک پروژه تی‌رست */

export interface Product {
  id: number;
  name: string;
  cat: string;
  /** در صورت null بودن، قیمت استعلامی است */
  price: number | null;
  old: number | null;
  rating: number;
  reviews: number;
  img: string;
  gallery: string[];
  colors: string[];
  colorNames: string[];
  material: string;
  style: string;
  available: boolean;
  badge: string;
  isFlash: boolean;
  isNew: boolean;
  /** امتیاز محبوبیت برای مرتب‌سازی */
  pop: number;
  code: string;
  dims: string;
  desc: string;
}

export interface Category {
  name: string;
  /** کلید اتصال به محصولات */
  key: string;
  img: string;
  count: string;
  desc: string;
}

export interface Testimonial {
  n: string;
  c: string;
  t: string;
  img: string;
  s: number;
}

export interface Review {
  n: string;
  d: string;
  s: number;
  t: string;
  like: number;
}

export interface RuleItem {
  t: string;
  i: string;
  c: string;
  b: string[];
}

export interface CartLine {
  id: number;
  qty: number;
}

export type ToastType = "ok" | "info" | "warn";

export interface Toast {
  id: number;
  msg: string;
  type: ToastType;
}

export interface CatalogFilters {
  cats: string[];
  maxPrice: number;
  colors: string[];
  styles: string[];
  avail: boolean;
  offOnly: boolean;
  priceStatus: "all" | "priced" | "inquiry";
  search: string;
  sort: "new" | "pop" | "cheap" | "exp" | "off";
}

/** مودال‌های سراسری سایت */
export type SiteModal =
  | { kind: "order"; productId: number | null; subject: string }
  | { kind: "installment"; productId: number | null };
