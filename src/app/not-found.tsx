import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
      <div className="max-w-xl mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-card p-8 lg:p-12 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-deep via-primary to-accent text-white flex items-center justify-center text-3xl font-black shadow-pop mb-5">
          ۴۰۴
        </div>
        <h1 className="font-black text-[22px] text-deep mb-2">این صفحه در کارخانه پیدا نشد</h1>
        <p className="text-[13.5px] text-slate-500 leading-7 mb-6">
          آدرس وارد شده وجود ندارد یا صفحه جابه‌جا شده است. می‌توانی از کاتالوگ محصولات یا صفحه
          اصلی ادامه بدهی.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-deep text-white font-bold px-6 py-3 rounded-2xl text-sm hover:bg-primary transition"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link
            href="/products"
            className="border-2 border-slate-200 font-bold px-6 py-3 rounded-2xl text-sm hover:border-deep hover:text-deep transition"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </div>
  );
}
