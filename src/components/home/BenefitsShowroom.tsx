import Link from "next/link";
import { IMG } from "@/data/images";
import { benefits } from "@/data/site";
import { OrderButton } from "@/components/common/Buttons";
import { Reveal } from "@/components/common/Reveal";

const THEMES: Record<string, string> = {
  blue: "bg-blue-50 text-primary",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
};

const SHOWROOM_IMAGE =
  IMG.aria;

/** مزیت‌های خرید از تولیدکننده + معرفی شوروم */
export function BenefitsShowroom() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-14 grid lg:grid-cols-3 gap-4">
      <Reveal className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-card p-7 lg:p-9">
        <h3 className="font-black text-[20px] text-deep mb-1">چرا خرید از تولیدکننده؟</h3>
        <p className="text-slate-500 text-[13.5px] mb-6">شفاف، مطمئن و به‌صرفه — مستقیم از کارخانه</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-3">
              <div
                className={`w-12 h-12 shrink-0 rounded-2xl ${THEMES[b.theme]} flex items-center justify-center`}
              >
                <i className={`fa-solid ${b.icon}`} />
              </div>
              <div>
                <div className="font-black text-[14px]">{b.title}</div>
                <p className="text-[12.5px] text-slate-500 leading-6">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal
        delay={1}
        className="relative rounded-[2rem] overflow-hidden shadow-card min-h-[320px]"
      >
        <img
          src={SHOWROOM_IMAGE}
          className="absolute inset-0 w-full h-full object-cover"
          alt="شوروم"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="text-[12px] font-bold text-amber-300 mb-1">شوروم مرکزی یافت‌آباد — ۱۲۰۰ متر</div>
          <div className="font-black text-[19px] leading-7 mb-2">
            قبل از خرید، لمس کن،
            <br />
            بنشین و مقایسه کن
          </div>
          <div className="flex gap-2 mt-3">
            <Link
              href="/contact"
              className="bg-white text-deep text-[13px] font-black px-4 py-2.5 rounded-xl"
            >
              آدرس و ساعات بازدید
            </Link>
            <OrderButton
              subject="رزرو بازدید شوروم"
              className="bg-white/15 border border-white/30 backdrop-blur text-white text-[13px] font-bold px-4 py-2.5 rounded-xl"
            >
              رزرو بازدید
            </OrderButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
