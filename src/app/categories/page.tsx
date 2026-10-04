import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/common/CategoryCard";
import { PageBanner } from "@/components/common/PageBanner";
import { TrustStrip } from "@/components/common/TrustStrip";
import { Reveal } from "@/components/common/Reveal";
import { InstallmentStrip } from "@/components/catalog/InstallmentStrip";

export const metadata: Metadata = {
  title: "دسته‌بندی محصولات",
  description:
    "دسته‌بندی‌های مبلمان تی‌رست: مبل راحتی، کلاسیک، مدرن، سرویس خواب، صندلی و میز؛ هر دسته با تولید کارخانه و امکان سفارشی‌سازی.",
};

const GUIDES = [
  {
    icon: "fa-ruler-combined",
    theme: "bg-blue-50 text-primary",
    title: "ابعاد فضا را بسنج",
    text: "متراژ پذیرایی و مسیر عبور را اندازه بگیر؛ کارشناسان ما ابعاد پیشنهادی را اعلام می‌کنند.",
  },
  {
    icon: "fa-swatchbook",
    theme: "bg-violet-50 text-violet-600",
    title: "پارچه و رنگ را انتخاب کن",
    text: "۴۰ رنگ و چندین جنس پارچه در شوروم موجود است؛ سفارشی‌سازی رنگ بدون هزینه اضافه.",
  },
  {
    icon: "fa-sack-dollar",
    theme: "bg-amber-50 text-amber-600",
    title: "بودجه و شرایط پرداخت",
    text: "قیمت کارخانه، بدون واسطه؛ در صورت نیاز خرید اقساطی تا ۲۴ ماه با پیش‌پرداخت منعطف.",
  },
];

export default function CategoriesPage() {
  return (
    <>
      <PageBanner
        breadcrumb="دسته‌بندی‌ها"
        title="دسته‌بندی‌های مبلمان تی‌رست"
        subtitle="هر فضا، یک انتخاب تولید کارخانه — برای هر سبک و هر متراژ"
        pattern
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.key}
              category={category}
              size="page"
              delay={i % 3 === 1 ? 1 : i % 3 === 2 ? 2 : undefined}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/products"
            className="btn-sheen inline-block bg-deep text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-primary transition shadow-card"
          >
            مشاهده همه محصولات <i className="fa-solid fa-arrow-left mr-1 text-xs" />
          </Link>
        </div>
      </section>

      <TrustStrip className="max-w-7xl mx-auto px-4 lg:px-6 pt-14" />

      <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-14">
        <Reveal className="text-center mb-6">
          <div className="text-accent font-bold text-[13px]">راهنمای انتخاب</div>
          <h2 className="font-black text-[24px] lg:text-[30px] text-deep">
            قبل از خرید، این سه قدم را بردار
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {GUIDES.map((g, i) => (
            <Reveal
              key={g.title}
              delay={i > 0 ? (i as 1 | 2) : undefined}
              className="bg-white rounded-[1.6rem] border border-slate-100 shadow-card p-7 text-center hover:shadow-pop hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-14 h-14 mx-auto rounded-2xl ${g.theme} flex items-center justify-center text-2xl mb-3`}
              >
                <i className={`fa-solid ${g.icon}`} />
              </div>
              <div className="font-black text-[16px] mb-1">{g.title}</div>
              <p className="text-[13px] text-slate-500 leading-7">{g.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <InstallmentStrip className="max-w-7xl mx-auto px-4 lg:px-6 pt-14 pb-12" />
    </>
  );
}
