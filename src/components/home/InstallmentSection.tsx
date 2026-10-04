"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { installmentSteps } from "@/data/site";
import { fa } from "@/lib/format";
import { useUI } from "@/context/UIContext";
import { Reveal } from "@/components/common/Reveal";

const MONTH_OPTIONS = [6, 12, 18, 24];

/** بخش خرید اقساطی + محاسبه‌گر اقساط */
export function InstallmentSection() {
  const { openInstallment } = useUI();
  const [price, setPrice] = useState(60_000_000);
  const [months, setMonths] = useState(12);

  const { prepayment, monthly } = useMemo(() => {
    const pre = Math.round(price * 0.3);
    return { prepayment: pre, monthly: Math.round(((price - pre) * 1.1) / months) };
  }, [price, months]);

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-14">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-deep via-primary to-accent text-white shadow-pop">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/10 blur-[80px] rounded-full" />

        <div className="relative grid lg:grid-cols-2 gap-8 p-7 lg:p-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-[12.5px] font-bold mb-4">
              <i className="fa-solid fa-credit-card" /> مزیت بزرگ تی‌رست — خرید اقساطی
            </div>
            <h2 className="font-black text-[24px] lg:text-[32px] leading-[1.5] mb-3">
              خرید اقساطی تی رست؛
              <br />
              مبلِ امروز، پرداختِ فردا
            </h2>
            <p className="text-white/75 leading-8 text-[14.5px] mb-5">
              بدون نیاز به ضامن کارمند، بدون پیچیدگی بانکی. با پیش‌پرداخت منعطف و اقساط تا ۲۴ ماه،
              همین امروز مبل کارخانه را تحویل بگیر و راحت پرداخت کن.{" "}
              <span className="text-white/60 text-[12.5px]">
                (شرایط دقیق در شوروم و مشاوره اعلام می‌شود.)
              </span>
            </p>

            <div className="grid sm:grid-cols-3 gap-2.5 mb-6">
              {installmentSteps.map((step) => (
                <div key={step.title} className="bg-white/12 border border-white/20 rounded-2xl p-3.5">
                  <i className={`fa-solid ${step.icon} mb-2 block text-amber-300`} />
                  <div className="font-black text-[13px]">{step.title}</div>
                  <div className="text-[12px] text-white/70">{step.sub}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openInstallment()}
                className="btn-sheen bg-white text-deep font-black px-7 py-3.5 rounded-2xl text-sm shadow-pop"
              >
                درخواست خرید اقساطی
              </button>
              <Link
                href="/rules"
                className="text-white/90 text-sm font-bold underline underline-offset-8 decoration-white/40 hover:decoration-white"
              >
                مشاهده شرایط اقساط
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-[1.6rem] p-6 lg:p-7 text-ink shadow-pop">
            <div className="font-black text-[16px] mb-1 flex items-center gap-2">
              <i className="fa-solid fa-calculator text-primary" /> محاسبه‌گر اقساط (نمایشی)
            </div>
            <p className="text-[12.5px] text-slate-500 mb-5">
              مبلغ و مدت را انتخاب کن تا قسط ماهانه را ببینی
            </p>

            <label className="text-[13px] font-bold mb-2 block">مبلغ خرید (تومان)</label>
            <input
              type="range"
              min={10_000_000}
              max={200_000_000}
              step={5_000_000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#0B3A6E] mb-2"
            />
            <div className="flex justify-between text-[13px] font-black text-deep mb-4">
              <span className="tick">{fa(price)}</span>
              <span className="text-slate-400 font-medium">تومان</span>
            </div>

            <label className="text-[13px] font-bold mb-2 block">مدت بازپرداخت</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {MONTH_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMonths(option)}
                  className={`py-2.5 rounded-xl border-2 font-bold text-[13px] transition ${
                    months === option
                      ? "border-deep bg-deep text-white"
                      : "border-slate-100 hover:border-deep"
                  }`}
                >
                  {fa(option)} ماهه
                </button>
              ))}
            </div>

            <div className="bg-mist border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[12px] text-slate-500 font-semibold">پیش‌پرداخت ۳۰٪</div>
                <div className="font-black text-deep tick">{fa(prepayment)} تومان</div>
              </div>
              <div className="text-left">
                <div className="text-[12px] text-slate-500 font-semibold">قسط ماهانه ≈</div>
                <div className="font-black text-primary text-xl tick">{fa(monthly)}</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 leading-5">
              * محاسبه نمایشی و بدون کارمزد قطعی است؛ مبلغ دقیق پس از مشاوره و اعتبارسنجی اعلام
              می‌شود.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
