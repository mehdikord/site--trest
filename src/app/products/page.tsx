import type { Metadata } from "next";
import { filtersToQuery, queryToFilters } from "@/lib/catalog";
import { PageBanner } from "@/components/common/PageBanner";
import { CatalogView } from "@/components/catalog/CatalogView";

export const metadata: Metadata = {
  title: "کاتالوگ محصولات",
  description:
    "کاتالوگ کامل مبلمان تی‌رست: مبل راحتی، کلاسیک، مدرن، سرویس خواب، صندلی و میز — تولید کارخانه با ضمانت ۵ ساله و امکان سفارشی‌سازی.",
};

type SearchParams = Record<string, string | string[] | undefined>;

/** تبدیل پارامترهای آدرس به فرمت URLSearchParams */
const toSearchParams = (params: SearchParams): URLSearchParams => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") sp.set(key, value);
    else if (Array.isArray(value) && value[0]) sp.set(key, value[0]);
  });
  return sp;
};

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  /* فیلترهای اولیه سمت سرور خوانده می‌شوند تا کاتالوگ با محتوای واقعی رندر شود
     (بهبود SEO) و سپس در مرورگر به‌صورت آنی فیلتر شود. */
  const filters = queryToFilters(toSearchParams(await searchParams));

  return (
    <>
      <PageBanner
        breadcrumb="کاتالوگ محصولات"
        title="کاتالوگ مبلمان تی‌رست"
        subtitle="تولید کارخانه • ضمانت ۵ ساله • امکان سفارشی‌سازی رنگ و ابعاد"
        pattern
      />

      {/* key بر اساس فیلترها: هر ناوبری سمت سرور، کاتالوگ را با فیلترهای درست بازنشانی می‌کند */}
      <CatalogView key={filtersToQuery(filters) || "all"} initialFilters={filters} />
    </>
  );
}
