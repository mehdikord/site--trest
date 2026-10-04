import Link from "next/link";
import { IMG } from "@/data/images";
import { processSteps, productionFeatures } from "@/data/site";
import { OrderButton } from "@/components/common/Buttons";
import { Reveal } from "@/components/common/Reveal";

const FACTORY_IMAGE =
  IMG.factory;

/** بخش داستان تولید کارخانه */
export function ManufacturingStory() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-16">
      <Reveal className="bg-white rounded-[2rem] border border-slate-100 shadow-card overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-7 lg:p-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-primary text-[12.5px] font-black px-3.5 py-1.5 rounded-full mb-4">
              <i className="fa-solid fa-industry text-xs" /> ما فقط فروشنده نیستیم — تولیدکننده‌ایم
            </div>
            <h2 className="font-black text-[24px] lg:text-[32px] leading-[1.5] text-deep mb-4">
              از تخته چوب تا مبلِ خانه شما؛
              <br />
              همه‌چیز در کارخانه تی‌رست
            </h2>
            <p className="text-slate-500 leading-8 text-[14.5px] mb-6">
              کارخانه ۶٬۰۰۰ متری تی‌رست در یافت‌آباد با ۸۰ استادکار، ۵ خط تولید و آزمایشگاه کنترل
              کیفیت، ماهانه بیش از ۹۰۰ ست مبلمان تولید می‌کند. چون تولید دست خودمان است، هم قیمت
              منصفانه‌تر است، هم می‌توانی رنگ، پارچه و ابعاد را دقیقاً باب سلیقه‌ات سفارش بدهی.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-7">
              {productionFeatures.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-3 bg-mist rounded-2xl p-3.5 border border-slate-100"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm">
                    <i className={`fa-solid ${f.icon}`} />
                  </div>
                  <div>
                    <div className="font-black text-[13.5px]">{f.title}</div>
                    <div className="text-[12px] text-slate-500 leading-5">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="bg-deep text-white font-bold px-6 py-3 rounded-2xl text-sm hover:bg-primary transition"
              >
                سفر تولید ما را ببین
              </Link>
              <OrderButton
                subject="مشاوره تولید سفارشی"
                className="bg-white border-2 border-deep/15 text-deep font-bold px-6 py-3 rounded-2xl text-sm hover:border-deep transition"
              >
                سفارش تولید اختصاصی
              </OrderButton>
            </div>
          </div>

          <div className="relative min-h-[380px]">
            <img src={FACTORY_IMAGE} className="absolute inset-0 w-full h-full object-cover" alt="کارخانه" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/20 to-transparent" />

            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 flex items-center gap-3 shadow-pop">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <div className="text-[12.5px] font-black text-ink">
                خط تولید فعال است
                <div className="font-medium text-slate-500 text-[11px]">امروز ۳۴ ست در حال ساخت</div>
              </div>
            </div>

            <div className="absolute bottom-5 right-5 left-5 grid grid-cols-3 gap-2">
              <div className="bg-white/12 backdrop-blur border border-white/20 rounded-2xl p-3 text-center text-white">
                <div className="font-black">
                  ۶۰۰۰<span className="text-[11px] font-medium"> متر</span>
                </div>
                <div className="text-[11px] text-white/70">مساحت کارخانه</div>
              </div>
              <div className="bg-white/12 backdrop-blur border border-white/20 rounded-2xl p-3 text-center text-white">
                <div className="font-black">
                  ۸۰<span className="text-[11px] font-medium"> نفر</span>
                </div>
                <div className="text-[11px] text-white/70">استادکار</div>
              </div>
              <div className="bg-white/12 backdrop-blur border border-white/20 rounded-2xl p-3 text-center text-white">
                <div className="font-black">
                  ۹۰۰<span className="text-[11px] font-medium"> ست</span>
                </div>
                <div className="text-[11px] text-white/70">تولید ماهانه</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 p-4 lg:p-6 bg-mist/60 border-t border-slate-100">
          {processSteps.map((step) => {
            const isLast = step.n === "check";
            const spanClass = isLast ? "col-span-2 lg:col-span-1" : "";
            return (
              <div key={step.title} className={`text-center p-3 ${spanClass}`}>
                <div
                  className={`w-11 h-11 mx-auto rounded-2xl shadow-card flex items-center justify-center font-black mb-2 ${
                    isLast ? "bg-deep text-white" : "bg-white text-primary"
                  }`}
                >
                  {isLast ? <i className="fa-solid fa-check text-sm" /> : step.n}
                </div>
                <div className="font-black text-[13px]">{step.title}</div>
                <div className="text-[11.5px] text-slate-500">{step.sub}</div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
