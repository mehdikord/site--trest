import type { CatalogFilters, Product } from "@/types";
import { products } from "@/data/products";
import { discount } from "./format";

/** سقف و کف اسلایدر قیمت در کاتالوگ */
export const PRICE_MIN = 8_000_000;
export const PRICE_MAX = 120_000_000;

export const DEFAULT_FILTERS: CatalogFilters = {
  cats: [],
  maxPrice: PRICE_MAX,
  colors: [],
  styles: [],
  avail: false,
  offOnly: false,
  priceStatus: "all",
  search: "",
  sort: "new",
};

/** گزینه‌های رنگ فیلتر کاتالوگ */
export const colorOptions = [
  { n: "آبی", c: "#0B3A6E" },
  { n: "طوسی", c: "#9AA5B1" },
  { n: "کرمی", c: "#D9C5A0" },
  { n: "گردویی", c: "#6B4A2B" },
  { n: "سبز", c: "#5B7A6B" },
  { n: "مشکی", c: "#1F2937" },
];

/** سبک‌های یکتای موجود در محصولات (برای فیلتر سبک) */
export const allStyles: string[] = [...new Set(products.map((p) => p.style))];

/** مرتب‌سازی و فیلتر محصولات کاتالوگ */
export function filterProducts(list: Product[], f: CatalogFilters): Product[] {
  let out = [...list];

  if (f.cats.length) out = out.filter((p) => f.cats.includes(p.cat));
  if (f.priceStatus === "priced") out = out.filter((p) => p.price);
  if (f.priceStatus === "inquiry") out = out.filter((p) => !p.price);
  out = out.filter((p) => !p.price || p.price <= f.maxPrice);
  if (f.avail) out = out.filter((p) => p.available);
  if (f.offOnly) out = out.filter((p) => discount(p) > 0);
  if (f.styles.length) out = out.filter((p) => f.styles.includes(p.style));

  const q = f.search.trim();
  if (q) out = out.filter((p) => p.name.includes(q) || p.cat.includes(q) || p.code.includes(q));

  switch (f.sort) {
    case "new":
      out.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
      break;
    case "pop":
      out.sort((a, b) => b.pop - a.pop);
      break;
    case "cheap":
      out.sort((a, b) => (a.price ?? 1e12) - (b.price ?? 1e12));
      break;
    case "exp":
      out.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "off":
      out.sort((a, b) => discount(b) - discount(a));
      break;
  }

  return out;
}

/** تعداد فیلترهای فعال (برای نشان اعداد روی دکمه فیلتر) */
export const activeFilterCount = (f: CatalogFilters): number =>
  f.cats.length +
  f.colors.length +
  f.styles.length +
  (f.avail ? 1 : 0) +
  (f.offOnly ? 1 : 0) +
  (f.priceStatus !== "all" ? 1 : 0);

/** تبدیل فیلترها به کوئری‌استرینگ آدرس (تا لینک‌ها قابل اشتراک باشند) */
export function filtersToQuery(f: CatalogFilters): string {
  const sp = new URLSearchParams();
  if (f.cats.length) sp.set("cat", f.cats.join(","));
  if (f.styles.length) sp.set("style", f.styles.join(","));
  if (f.colors.length) sp.set("color", f.colors.join(","));
  if (f.maxPrice !== PRICE_MAX) sp.set("max", String(f.maxPrice));
  if (f.priceStatus !== "all") sp.set("price", f.priceStatus);
  if (f.avail) sp.set("avail", "1");
  if (f.offOnly) sp.set("off", "1");
  if (f.search.trim()) sp.set("q", f.search.trim());
  if (f.sort !== "new") sp.set("sort", f.sort);
  return sp.toString();
}

/** خواندن فیلترها از کوئری‌استرینگ */
export function queryToFilters(sp: URLSearchParams): CatalogFilters {
  const list = (key: string) =>
    (sp.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const sort = (sp.get("sort") ?? "new") as CatalogFilters["sort"];
  const price = (sp.get("price") ?? "all") as CatalogFilters["priceStatus"];
  const max = Number(sp.get("max"));

  return {
    cats: list("cat"),
    styles: list("style"),
    colors: list("color"),
    maxPrice: Number.isFinite(max) && max > 0 ? max : PRICE_MAX,
    priceStatus: ["all", "priced", "inquiry"].includes(price) ? price : "all",
    avail: sp.get("avail") === "1",
    offOnly: sp.get("off") === "1",
    search: sp.get("q") ?? "",
    sort: ["new", "pop", "cheap", "exp", "off"].includes(sort) ? sort : "new",
  };
}
