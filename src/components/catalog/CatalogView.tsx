"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { CatalogFilters } from "@/types";
import { products } from "@/data/products";
import {
  activeFilterCount,
  filterProducts,
  filtersToQuery,
  PRICE_MAX,
} from "@/lib/catalog";
import { fa } from "@/lib/format";
import { useUI } from "@/context/UIContext";
import { ProductCard } from "@/components/products/ProductCard";
import { FiltersPanel } from "./FiltersPanel";
import { InstallmentStrip } from "./InstallmentStrip";

const SORT_OPTIONS = [
  { value: "new", label: "جدیدترین" },
  { value: "pop", label: "محبوب‌ترین" },
  { value: "cheap", label: "ارزان‌ترین" },
  { value: "exp", label: "گران‌ترین" },
  { value: "off", label: "بیشترین تخفیف" },
] as const;

interface CatalogViewProps {
  /** فیلترهای اولیه که سمت سرور از پارامترهای آدرس خوانده می‌شوند */
  initialFilters: CatalogFilters;
}

/**
 * کاتالوگ محصولات
 * فیلترها هم با آدرس صفحه همگام هستند (لینک قابل اشتراک) و هم به‌صورت آنی روی
 * لیست اعمال می‌شوند؛ نسخه اولیه توسط سرور رندر می‌شود و هر بار ناوبری سمت سرور،
 * این کامپوننت با key جدید بازنشانی می‌شود.
 */
export function CatalogView({ initialFilters }: CatalogViewProps) {
  const pathname = usePathname();
  const { panels, openPanel } = useUI();

  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const [searchInput, setSearchInput] = useState(initialFilters.search);

  const apply = (patch: Partial<CatalogFilters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const query = filtersToQuery(next);
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  const toggleInList = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const resetFilters = () => {
    setSearchInput("");
    apply({
      cats: [],
      colors: [],
      styles: [],
      maxPrice: PRICE_MAX,
      priceStatus: "all",
      avail: false,
      offOnly: false,
      search: "",
      sort: "new",
    });
  };

  const list = useMemo(() => filterProducts(products, filters), [filters]);
  const filterCount = activeFilterCount(filters);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col lg:flex-row gap-6 items-start">
        {/* سایدبار فیلتر دسکتاپ */}
        <aside className="hidden lg:block w-[290px] shrink-0 sticky top-[150px] bg-white rounded-[1.6rem] border border-slate-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-black text-[15px] flex items-center gap-2">
              <i className="fa-solid fa-sliders text-primary" /> فیلترها
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="text-[12px] text-rose-500 font-bold hover:underline"
            >
              حذف همه
            </button>
          </div>
          <FiltersPanel
            filters={filters}
            onToggleCat={(key) => apply({ cats: toggleInList(filters.cats, key) })}
            onToggleColor={(name) => apply({ colors: toggleInList(filters.colors, name) })}
            onToggleStyle={(style) => apply({ styles: toggleInList(filters.styles, style) })}
            onSetPriceStatus={(priceStatus) => apply({ priceStatus })}
            onSetMaxPrice={(maxPrice) => apply({ maxPrice })}
            onToggleAvail={(avail) => apply({ avail })}
            onToggleOffOnly={(offOnly) => apply({ offOnly })}
          />
        </aside>

        {/* ستون اصلی */}
        <div className="flex-1 w-full min-w-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-3.5 flex flex-wrap items-center gap-2.5 mb-4">
            <button
              type="button"
              onClick={() => openPanel("filterDrawer")}
              className="lg:hidden flex items-center gap-2 bg-deep text-white text-[13px] font-bold px-4 py-2.5 rounded-xl"
            >
              <i className="fa-solid fa-sliders" /> فیلترها{" "}
              <span className="bg-white/20 rounded-full px-2 text-[11px]">{fa(filterCount)}</span>
            </button>

            <div className="flex-1 flex items-center gap-2 bg-mist rounded-xl px-3 py-2.5 min-w-[180px]">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm" />
              <input
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  apply({ search: e.target.value });
                }}
                placeholder="جستجو در کاتالوگ..."
                className="bg-transparent flex-1 text-[13.5px]"
              />
            </div>

            <select
              value={filters.sort}
              onChange={(e) => apply({ sort: e.target.value as CatalogFilters["sort"] })}
              className="bg-mist rounded-xl px-3 py-2.5 text-[13px] font-bold text-deep border border-transparent cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* چیپ‌های فیلتر فعال */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => apply({ cats: toggleInList(filters.cats, c) })}
                className="flex items-center gap-1.5 bg-deep text-white text-[12px] font-bold px-3 py-1.5 rounded-full"
              >
                {c} <i className="fa-solid fa-xmark text-[10px]" />
              </button>
            ))}
            {filters.offOnly && (
              <button
                type="button"
                onClick={() => apply({ offOnly: false })}
                className="flex items-center gap-1.5 bg-rose-500 text-white text-[12px] font-bold px-3 py-1.5 rounded-full"
              >
                تخفیف‌دار <i className="fa-solid fa-xmark text-[10px]" />
              </button>
            )}
            {filters.avail && (
              <button
                type="button"
                onClick={() => apply({ avail: false })}
                className="flex items-center gap-1.5 bg-emerald-500 text-white text-[12px] font-bold px-3 py-1.5 rounded-full"
              >
                موجود <i className="fa-solid fa-xmark text-[10px]" />
              </button>
            )}
          </div>

          <div className="text-[13px] text-slate-500 font-semibold mb-4">
            <span className="text-deep font-black">{fa(list.length)}</span> محصول یافت شد • مستقیم از
            کارخانه تی‌رست
          </div>

          {list.length > 0 ? (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-[2rem] border border-dashed border-slate-300">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-mist flex items-center justify-center text-2xl text-slate-300 mb-3">
                <i className="fa-solid fa-couch" />
              </div>
              <div className="font-black text-[16px] mb-1">محصولی پیدا نشد</div>
              <p className="text-[13px] text-slate-500 mb-4">
                فیلترها را تغییر بده یا همه را حذف کن
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="bg-deep text-white text-sm font-bold px-6 py-2.5 rounded-xl"
              >
                حذف فیلترها
              </button>
            </div>
          )}
        </div>
      </div>

      {/* کشوی فیلتر موبایل */}
      <div className={`fixed inset-0 z-[95] lg:hidden ${panels.filterDrawer ? "" : "hidden"}`}>
        <div
          className="absolute inset-0 bg-deep/50 backdrop-blur-sm"
          onClick={() => openPanel("filterDrawer", false)}
        />
        <div className="absolute bottom-0 inset-x-0 max-h-[88vh] bg-white rounded-t-[1.8rem] flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
            <div className="font-black">فیلترها</div>
            <button
              type="button"
              aria-label="بستن فیلترها"
              onClick={() => openPanel("filterDrawer", false)}
              className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <FiltersPanel
              filters={filters}
              onToggleCat={(key) => apply({ cats: toggleInList(filters.cats, key) })}
              onToggleColor={(name) => apply({ colors: toggleInList(filters.colors, name) })}
              onToggleStyle={(style) => apply({ styles: toggleInList(filters.styles, style) })}
              onSetPriceStatus={(priceStatus) => apply({ priceStatus })}
              onSetMaxPrice={(maxPrice) => apply({ maxPrice })}
              onToggleAvail={(avail) => apply({ avail })}
              onToggleOffOnly={(offOnly) => apply({ offOnly })}
            />
          </div>
          <div className="p-4 border-t border-slate-100 grid grid-cols-2 gap-2 bg-white">
            <button
              type="button"
              onClick={resetFilters}
              className="border-2 border-slate-200 font-bold py-3 rounded-2xl text-sm"
            >
              حذف همه
            </button>
            <button
              type="button"
              onClick={() => openPanel("filterDrawer", false)}
              className="bg-deep text-white font-black py-3 rounded-2xl text-sm"
            >
              نمایش نتایج
            </button>
          </div>
        </div>
      </div>

      <InstallmentStrip />
    </>
  );
}
