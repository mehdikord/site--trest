import Link from "next/link";
import { heroStats, marqueeItems } from "@/data/site";
import { IMG } from "@/data/images";
import { Counter } from "@/components/common/Counter";

const HERO_IMAGE = IMG.modern;

/** بخش هیرو صفحه اصلی */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-deep via-[#0E4A8A] to-primary text-white">
      <div className="absolute inset-0 hero-pattern opacity-60" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-accent/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-10 lg:pt-16 pb-10 lg:pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="reveal visible">
          <div className="inline-flex items-center gap-2 bg-white/12 border border-white/20 backdrop-blur rounded-full pl-2 pr-3 py-1.5 text-[12.5px] font-semibold mb-5">
            <span className="bg-gold text-deep text-[11px] font-black px-2.5 py-1 rounded-full">
              تولیدکننده واقعی
            </span>
            <span className="text-white/90">طراحی • تولید • craftsmanship در کارخانه تی‌رست</span>
          </div>

          <h1 className="hero-h font-black text-[2.9rem] leading-[1.25] mb-4">
            تی رست؛ فروشگاه و
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-white to-sky-200">
              تولیدکننده مبلمان
            </span>
          </h1>

          <p className="text-white/75 leading-8 text-[15.5px] mb-7 max-w-xl">
            از انتخاب چوب و پارچه تا دوخت، رنگ و کنترل کیفیت — همه‌چیز زیر یک سقف در کارخانه تی‌رست
            انجام می‌شود. مبلمانی که می‌خری، مستقیم از خط تولید ماست؛ بدون واسطه، با ضمانت‌نامه
            کتبی و امکان سفارشی‌سازی کامل.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/products"
              className="btn-sheen bg-white text-deep font-black px-7 py-3.5 rounded-2xl shadow-pop hover:-translate-y-0.5 transition flex items-center gap-2"
            >
              مشاهده محصولات <i className="fa-solid fa-arrow-left text-sm" />
            </Link>
            <Link
              href="/about"
              className="border border-white/30 bg-white/10 backdrop-blur px-7 py-3.5 rounded-2xl font-bold hover:bg-white/20 transition flex items-center gap-2"
            >
              <i className="fa-solid fa-industry text-sm" /> درباره تی رست
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/15 rounded-2xl p-3 text-center backdrop-blur"
              >
                <div className="font-black text-xl tick">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-[11.5px] text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal visible reveal-d1">
          <div className="relative rounded-[2rem] overflow-hidden shadow-pop border-4 border-white/20">
            <img
              src={HERO_IMAGE}
              className="w-full h-[420px] lg:h-[520px] object-cover"
              alt="شوروم تی رست"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between gap-3">
              <div className="bg-white/95 backdrop-blur rounded-2xl p-3.5 flex-1">
                <div className="text-[11px] text-slate-500 font-semibold">
                  پیشنهاد کارخانه این هفته
                </div>
                <div className="font-black text-deep text-[14px]">
                  ست راحتی آریا — ۲۱٪ تخفیف + اقساط
                </div>
              </div>
              <Link
                href="/products/1"
                aria-label="مشاهده ست راحتی آریا"
                className="w-12 h-12 shrink-0 rounded-2xl bg-gold text-deep flex items-center justify-center shadow-pop hover:scale-105 transition"
              >
                <i className="fa-solid fa-arrow-left" />
              </Link>
            </div>
          </div>

          <div className="floaty absolute -top-4 -right-2 sm:right-6 bg-white rounded-2xl shadow-pop p-3 flex items-center gap-3 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-badge-check" />
            </div>
            <div>
              <div className="font-black text-[13px] text-ink">کیفیت کنترل‌شده</div>
              <div className="text-[11px] text-slate-500">تست ۴۸ ساعته نشست</div>
            </div>
          </div>

          <div className="floaty2 absolute top-1/2 -left-2 sm:left-4 bg-white rounded-2xl shadow-pop p-3 flex items-center gap-3 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
              <i className="fa-solid fa-truck-fast" />
            </div>
            <div>
              <div className="font-black text-[13px] text-ink">ارسال سراسری</div>
              <div className="text-[11px] text-slate-500">بسته‌بندی صادراتی</div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-8 bg-deep rounded-2xl shadow-pop px-4 py-3 flex items-center gap-3 border border-white/15">
            <div className="flex -space-x-2 space-x-reverse">
              {[12, 32, 47].map((n) => (
                <img
                  key={n}
                  src={`/images/avatar-${n}.jpg`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  alt=""
                />
              ))}
            </div>
            <div className="text-[12px]">
              <span className="font-black">۴.۹ از ۵</span>{" "}
              <span className="text-white/70">رضایت خریداران</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15 bg-deep/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-3 overflow-hidden">
          <div className="marquee-track text-[13px] text-white/70 font-medium">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
