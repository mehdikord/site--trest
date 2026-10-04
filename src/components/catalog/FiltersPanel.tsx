"use client";

import type { CatalogFilters } from "@/types";
import { allStyles, colorOptions, PRICE_MAX, PRICE_MIN } from "@/lib/catalog";
import { fa } from "@/lib/format";
import { categories } from "@/data/categories";

interface FiltersPanelProps {
  filters: CatalogFilters;
  onToggleCat: (key: string) => void;
  onToggleColor: (name: string) => void;
  onToggleStyle: (style: string) => void;
  onSetPriceStatus: (status: CatalogFilters["priceStatus"]) => void;
  onSetMaxPrice: (value: number) => void;
  onToggleAvail: (value: boolean) => void;
  onToggleOffOnly: (value: boolean) => void;
}

/** محتوای فیلترهای کاتالوگ (دسکتاپ و موبایل) */
export function FiltersPanel({
  filters,
  onToggleCat,
  onToggleColor,
  onToggleStyle,
  onSetPriceStatus,
  onSetMaxPrice,
  onToggleAvail,
  onToggleOffOnly,
}: FiltersPanelProps) {
  return (
    <>
      <div className="mb-5">
        <div className="font-black text-[13.5px] mb-2.5">دسته‌بندی</div>
        <div className="space-y-1.5">
          {categories.map((c) => {
            const active = filters.cats.includes(c.key);
            return (
              <label
                key={c.key}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-mist cursor-pointer transition text-[13.5px] font-semibold ${
                  active ? "bg-blue-50 text-deep" : "text-slate-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onToggleCat(c.key)}
                  className="w-4 h-4 accent-[#0B3A6E]"
                />
                {c.name}
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <div className="font-black text-[13.5px] mb-2.5">
          سقف قیمت: <span className="text-primary tick">{fa(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={2_000_000}
          value={filters.maxPrice}
          onChange={(e) => onSetMaxPrice(Number(e.target.value))}
          className="w-full accent-[#0B3A6E]"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>۸ میلیون</span>
          <span>۱۲۰ میلیون</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="font-black text-[13.5px] mb-2.5">رنگ</div>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((o) => (
            <button
              key={o.n}
              type="button"
              title={o.n}
              aria-label={o.n}
              onClick={() => onToggleColor(o.n)}
              className={`swatch w-9 h-9 rounded-xl border border-slate-200 ${
                filters.colors.includes(o.n) ? "active" : ""
              }`}
              style={{ background: o.c }}
            />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <div className="font-black text-[13.5px] mb-2.5">سبک</div>
        <div className="flex flex-wrap gap-2">
          {allStyles.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onToggleStyle(s)}
              className={`px-3 py-1.5 rounded-full border text-[12.5px] font-bold transition ${
                filters.styles.includes(s)
                  ? "chip-active border-deep"
                  : "border-slate-200 text-slate-500 hover:border-deep"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <div className="font-black text-[13.5px] mb-2.5">وضعیت قیمت</div>
        <div className="grid grid-cols-3 gap-1.5">
          {(
            [
              { key: "all", label: "همه" },
              { key: "priced", label: "قیمت‌دار" },
              { key: "inquiry", label: "استعلامی" },
            ] as const
          ).map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => onSetPriceStatus(option.key)}
              className={`py-2 rounded-xl text-[12px] font-bold border ${
                filters.priceStatus === option.key
                  ? "bg-deep text-white border-deep"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="flex items-center justify-between bg-mist rounded-xl px-3.5 py-3 cursor-pointer text-[13px] font-bold">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-check text-emerald-500" /> فقط موجودها
          </span>
          <input
            type="checkbox"
            checked={filters.avail}
            onChange={(e) => onToggleAvail(e.target.checked)}
            className="w-5 h-5 accent-[#0B3A6E]"
          />
        </label>
        <label className="flex items-center justify-between bg-gradient-to-l from-rose-50 to-orange-50 border border-rose-100 rounded-xl px-3.5 py-3 cursor-pointer text-[13px] font-bold">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-percent text-rose-500" /> فقط تخفیف‌دارها
          </span>
          <input
            type="checkbox"
            checked={filters.offOnly}
            onChange={(e) => onToggleOffOnly(e.target.checked)}
            className="w-5 h-5 accent-rose-500"
          />
        </label>
      </div>
    </>
  );
}
