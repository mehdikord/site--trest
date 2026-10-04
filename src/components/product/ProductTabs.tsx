"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { fa } from "@/lib/format";
import { useUI } from "@/context/UIContext";

const TAB_TITLES = ["توضیحات", "مشخصات فنی", "ارسال و نصب", "شرایط اقساط"];

const HIGHLIGHTS = [
  "کلاف چوب راش گرجستان با اتصالات دوبل",
  "اسفنج ۳۵ کیلویی + الیاف ضدتعریق",
  "پارچه درجه‌یک با ضمانت ثبات رنگ",
  "شناسنامه تولید و ضمانت‌نامه ۵ ساله",
];

const SHIPPING_ITEMS = [
  "بسته‌بندی صادراتی چندلایه (نایلون حباب‌دار + کارتن + فوم)",
  "ارسال تهران ۲–۴ روزه، شهرستان ۵–۹ روزه با باربری بیمه‌شده",
  "نصب رایگان توسط تیم کارخانه + آموزش نگهداری",
  "هزینه ارسال در پیش‌فاکتور شفاف اعلام می‌شود؛ بالای ۳۰ میلیون در تهران رایگان",
];

/** تب‌های توضیحات، مشخصات، ارسال و اقساط صفحه محصول */
export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const { openInstallment } = useUI();

  const specs: [string, string][] = [
    ["کد محصول", product.code],
    ["دسته", product.cat],
    ["سبک", product.style],
    ["متریال", product.material],
    ["ابعاد", product.dims],
    ["رنگ‌های قابل سفارش", `${product.colorNames.join("، ")} + ۴۰ رنگ کاتالوگ`],
    ["گارانتی", "۵ سال اسکلت + ۱۸ ماه پارچه و فوم"],
    ["کشور سازنده", "ایران — کارخانه تی‌رست"],
  ];

  return (
    <div className="border-t border-slate-100">
      <div className="flex gap-1 px-4 lg:px-7 pt-4 overflow-x-auto no-scrollbar">
        {TAB_TITLES.map((title, i) => (
          <button
            key={title}
            type="button"
            onClick={() => setActive(i)}
            className={`dtabs shrink-0 px-5 py-2.5 rounded-xl text-[13.5px] font-black transition ${
              i === active ? "bg-deep text-white" : "text-slate-500 hover:bg-mist"
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="p-5 lg:p-8 text-[14px] leading-8 text-slate-600">
        {active === 0 && (
          <>
            <p>{product.desc}</p>
            <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
              {HIGHLIGHTS.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl p-3 text-[13px] font-bold"
                >
                  <i className="fa-solid fa-circle-check text-emerald-500" />
                  {f}
                </div>
              ))}
            </div>
          </>
        )}

        {active === 1 && (
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <table className="w-full text-[13px]">
              <tbody>
                {specs.map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-mist/60" : ""}>
                    <td className="p-3 font-black text-deep w-40">{row[0]}</td>
                    <td className="p-3">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 2 && (
          <div className="space-y-2.5">
            {SHIPPING_ITEMS.map((t) => (
              <div
                key={t}
                className="flex gap-2.5 bg-white border border-slate-100 rounded-xl p-3.5 text-[13px]"
              >
                <i className="fa-solid fa-truck-fast text-primary mt-1" />
                {t}
              </div>
            ))}
          </div>
        )}

        {active === 3 && (
          <div className="bg-gradient-to-l from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
            <div className="font-black text-deep mb-2">خرید اقساطی همین مدل</div>
            <p className="text-[13px] leading-7 mb-3">
              پیش‌پرداخت منعطف، اقساط تا ۲۴ ماه و تحویل فوری پس از تایید. شرایط دقیق در مشاوره اعلام
              می‌شود و جنبه نمایشی دارد.
            </p>
            <button
              type="button"
              onClick={() => openInstallment(product.id)}
              className="bg-deep text-white text-[13px] font-bold px-5 py-2.5 rounded-xl"
            >
              درخواست خرید اقساطی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** توزیع امتیازها (نمایشی) */
export const ratingDistribution = [72, 18, 6, 2, 2];

/** نمایش درصد فارسی */
export const percent = (value: number) => `٪${fa(value)}`;
