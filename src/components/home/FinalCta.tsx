import Link from "next/link";
import { IMG } from "@/data/images";
import { site } from "@/data/site";
import { OrderButton } from "@/components/common/Buttons";
import { Reveal } from "@/components/common/Reveal";

const CTA_IMAGE =
  IMG.living;

/** بخش دعوت نهایی صفحه اصلی */
export function FinalCta() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-card">
        <div className="grid lg:grid-cols-2 items-center">
          <div className="p-8 lg:p-12">
            <h2 className="font-black text-[24px] lg:text-[30px] text-deep leading-[1.5] mb-3">
              مبلِ خانه بعدی‌ات را
              <br />
              مستقیم از کارخانه بخر
            </h2>
            <p className="text-slate-500 text-[14px] leading-7 mb-6">
              مشاوره رایگان دکوراسیون + بازدید شوروم + پیش‌فاکتور شفاف کارخانه. همین امروز شروع کن.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="btn-sheen bg-gradient-to-l from-deep to-primary text-white font-black px-7 py-3.5 rounded-2xl text-sm shadow-card"
              >
                مشاهده محصولات
              </Link>
              <OrderButton
                subject="درخواست مشاوره رایگان"
                className="border-2 border-slate-200 font-bold px-7 py-3.5 rounded-2xl text-sm hover:border-deep hover:text-deep transition"
              >
                درخواست مشاوره
              </OrderButton>
            </div>
            <div className="flex items-center gap-4 mt-6 text-[12.5px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-phone text-primary" /> {site.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-brands fa-whatsapp text-emerald-500" /> {site.mobile}
              </span>
            </div>
          </div>
          <div className="relative h-64 lg:h-full min-h-[280px]">
            <img src={CTA_IMAGE} className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
