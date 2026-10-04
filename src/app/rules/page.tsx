import type { Metadata } from "next";
import { PageBanner } from "@/components/common/PageBanner";
import { RulesAccordion } from "@/components/rules/RulesAccordion";

export const metadata: Metadata = {
  title: "قوانین و مقررات",
  description:
    "قوانین خرید، ارسال، نصب، بازگشت کالا، گارانتی و شرایط خرید اقساطی فروشگاه و کارخانه تی‌رست.",
};

export default function RulesPage() {
  return (
    <>
      <PageBanner
        breadcrumb="قوانین و مقررات"
        title="قوانین خرید، ارسال و ضمانت"
        subtitle="شفاف و روشن؛ متن قابل ویرایش توسط تیم تی‌رست"
        titleClassName="font-black text-[26px] lg:text-[34px]"
      />

      <RulesAccordion />

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-[13px] leading-7 text-amber-900">
          <i className="fa-solid fa-circle-info ml-1" /> این متون جنبه نمایشی و قابل ویرایش دارند و
          ادعای حقوقی قطعی محسوب نمی‌شوند. نسخه نهایی شرایط فروش، هنگام صدور پیش‌فاکتور رسمی به اطلاع
          مشتری می‌رسد.
        </div>
      </div>
    </>
  );
}
