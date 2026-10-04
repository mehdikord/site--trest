import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageBanner } from "@/components/common/PageBanner";
import { OrderButton } from "@/components/common/Buttons";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباط با فروشگاه و کارخانه تی‌رست؛ تلفن شوروم، واتساپ، ایمیل و آدرس شوروم یافت‌آباد و کارخانه پرند.",
};

const INFO_CARDS = [
  {
    icon: "fa-phone",
    theme: "bg-blue-50 text-primary",
    title: "تلفن شوروم",
    value: site.phoneDisplay,
    sub: "شنبه تا جمعه ۱۰ تا ۲۲",
    tone: "text-primary",
    dir: "ltr" as const,
  },
  {
    icon: "fa-mobile-screen",
    theme: "bg-emerald-50 text-emerald-600",
    title: "موبایل و واتساپ",
    value: site.mobileDisplay,
    sub: "مشاوره و ارسال عکس",
    tone: "text-ink",
    dir: "ltr" as const,
  },
  {
    icon: "fa-envelope",
    theme: "bg-violet-50 text-violet-600",
    title: "ایمیل",
    value: site.email,
    sub: "پاسخ در کمتر از ۲۴ ساعت",
    tone: "text-ink",
    dir: "ltr" as const,
    small: true,
  },
  {
    icon: "fa-clock",
    theme: "bg-amber-50 text-amber-600",
    title: "ساعات کاری",
    value: "۱۰ صبح تا ۱۰ شب",
    sub: "کارخانه: ۸ تا ۱۸",
    tone: "text-ink",
    dir: "rtl" as const,
  },
];

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.showroom)}`;

export default function ContactPage() {
  return (
    <>
      <PageBanner
        breadcrumb="تماس با ما"
        title="در کنار شماییم — از مشاوره تا نصب"
        subtitle="کارشناسان فروش و فنی کارخانه، هر روز پاسخ‌گو هستند"
        titleClassName="font-black text-[26px] lg:text-[34px]"
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 text-center"
            >
              <div
                className={`w-12 h-12 mx-auto rounded-2xl ${card.theme} flex items-center justify-center text-xl mb-2`}
              >
                <i className={`fa-solid ${card.icon}`} />
              </div>
              <div className="font-black text-[14px]">{card.title}</div>
              <div
                dir={card.dir}
                className={`${card.tone} ${card.small ? "font-bold text-[13px]" : "font-black tick"} mt-1`}
              >
                {card.value}
              </div>
              <div className="text-[12px] text-slate-400">{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          <ContactForm />

          <div className="lg:col-span-3 space-y-4">
            {/* نقشه نمایشی */}
            <div className="relative bg-white rounded-[1.8rem] border border-slate-100 shadow-card overflow-hidden">
              <div className="h-[300px] relative bg-[#e8eef6] flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(#d3dfee 1px,transparent 1px),linear-gradient(90deg,#d3dfee 1px,transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
                <div className="absolute w-[280px] h-[90px] bg-white/80 rounded-full rotate-[-18deg] right-[8%] top-[18%]" />
                <div className="absolute w-[200px] h-[60px] bg-white/70 rounded-full rotate-[14deg] left-[12%] bottom-[22%]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                  <div className="relative mx-auto w-fit">
                    <span className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
                    <div className="relative w-14 h-14 rounded-2xl bg-deep text-white flex items-center justify-center text-2xl shadow-pop">
                      <i className="fa-solid fa-location-dot" />
                    </div>
                  </div>
                  <div className="mt-3 bg-white rounded-2xl shadow-pop border border-slate-100 px-5 py-3">
                    <div className="font-black text-[14px]">شوروم مرکزی تی‌رست</div>
                    <div className="text-[12.5px] text-slate-500">{site.showroom}</div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 rounded-xl px-3 py-1.5 text-[11.5px] font-bold text-slate-500 shadow">
                  نقشه نمایشی — مسیریابی با گوگل‌مپ
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                    <i className="fa-solid fa-store" />
                  </div>
                  <div>
                    <div className="font-black text-[14px]">{site.showroom}</div>
                    <div className="text-[12.5px] text-slate-500">{site.factory}</div>
                  </div>
                </div>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-mist hover:bg-deep hover:text-white transition text-[13px] font-bold px-4 py-2.5 rounded-xl"
                >
                  مسیریابی <i className="fa-solid fa-diamond-turn-right mr-1" />
                </a>
              </div>
            </div>

            {/* دعوت به بازدید */}
            <div className="bg-gradient-to-l from-deep to-primary rounded-[1.8rem] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
              <div>
                <div className="font-black text-[16px]">بازدید حضوری + مشاوره دکوراسیون رایگان</div>
                <div className="text-white/70 text-[13px]">رزرو کن، جای پارک و پذیرایی با ما</div>
              </div>
              <OrderButton
                subject="رزرو بازدید شوروم"
                className="bg-white text-deep font-black text-sm px-6 py-3 rounded-xl shrink-0"
              >
                رزرو بازدید
              </OrderButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
