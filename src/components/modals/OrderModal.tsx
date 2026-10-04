"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { cities } from "@/data/site";
import { fa, isValidEmail, isValidMobile } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { useToast } from "@/context/ToastContext";

const fieldBase =
  "w-full bg-mist border border-slate-200 rounded-xl px-3.5 py-3 text-[13.5px]";
const fieldClass = (hasError: boolean) =>
  `${fieldBase} ${hasError ? "border-rose-400! bg-rose-50/50!" : ""}`;

/** مودال سراسری فرم‌های سفارش و خرید اقساطی */
export function OrderModal() {
  const { modal, closeModal } = useUI();
  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-[97] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-deep/65 backdrop-blur-md" onClick={closeModal} />
      <div className="relative bg-white rounded-[1.8rem] max-w-2xl w-full shadow-pop max-h-[93vh] overflow-y-auto">
        <div className="p-6 lg:p-8">
          {modal.kind === "order" ? (
            <OrderForm
              key={`order-${modal.productId ?? "auto"}-${modal.subject}`}
              productId={modal.productId}
              subject={modal.subject}
            />
          ) : (
            <InstallmentForm key={`installment-${modal.productId ?? "auto"}`} productId={modal.productId} />
          )}
        </div>
      </div>
    </div>
  );
}

function ModalHeader({ badge, title, onClose }: { badge?: React.ReactNode; title: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between mb-1">
      <div>
        {badge}
        <h3 className="font-black text-[20px] text-deep">{title}</h3>
      </div>
      <button
        type="button"
        aria-label="بستن"
        onClick={onClose}
        className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center shrink-0"
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* فرم ثبت سفارش / مشاوره                                             */
/* ------------------------------------------------------------------ */
function OrderForm({ productId, subject }: { productId: number | null; subject: string }) {
  const { cartLines } = useStore();
  const { closeModal } = useUI();
  const { toast } = useToast();

  const product =
    (productId ? products.find((p) => p.id === productId) : undefined) ??
    (cartLines.length ? cartLines[0].product : products[0]);

  const isConsult = /مشاوره|بازدید|کاتالوگ/.test(subject);
  const title = isConsult && subject ? subject : "ثبت درخواست سفارش";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [color, setColor] = useState(product.colorNames[0] ?? "");
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [way, setWay] = useState("تماس تلفنی");
  const [errors, setErrors] = useState({ name: false, phone: false, email: false, city: false });
  const [ticket, setTicket] = useState<string | null>(null);

  const submit = () => {
    const next = {
      name: !name.trim(),
      phone: !isValidMobile(phone),
      city: !city,
      email: Boolean(email) && !isValidEmail(email),
    };
    setErrors(next);

    if (next.name || next.phone || next.city || next.email) {
      toast("لطفاً خطاهای فرم را اصلاح کن (موبایل ۱۱ رقم با 09)", "warn");
      return;
    }

    setTicket(`TR-${Math.floor(10000 + Math.random() * 89999)}`);
    toast("درخواست سفارش ثبت شد — به‌زودی تماس می‌گیریم");
  };

  if (ticket) {
    return (
      <div className="text-center py-8">
        <div className="pop-check w-20 h-20 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-3xl text-emerald-500 mb-4">
          <i className="fa-solid fa-check" />
        </div>
        <h3 className="font-black text-[22px] text-deep mb-2">درخواست سفارش ثبت شد</h3>
        <p className="text-[13.5px] text-slate-500 leading-7 max-w-md mx-auto mb-5">
          {name} عزیز، درخواستت برای <b className="text-deep">«{product.name}»</b> با موفقیت ثبت شد.
          کارشناس ما از طریق <b>{way}</b> با شماره <b className="tick">{phone}</b> تماس می‌گیرد. کد
          پیگیری نمایشی: <b className="tick text-primary">{ticket}</b>
        </p>
        <div className="bg-mist rounded-2xl p-4 text-[12.5px] text-slate-500 leading-7 max-w-md mx-auto mb-6">
          قدم بعدی: پیش‌فاکتور رسمی + هماهنگی زمان تحویل و نصب. برای سرعت بیشتر می‌توانی در واتساپ
          پیام بدهی.
        </div>
        <div className="flex gap-2 justify-center">
          <Link
            href="/products"
            onClick={closeModal}
            className="bg-deep text-white font-bold px-6 py-3 rounded-xl text-sm"
          >
            ادامه خرید
          </Link>
          <button
            type="button"
            onClick={closeModal}
            className="border-2 border-slate-200 font-bold px-6 py-3 rounded-xl text-sm"
          >
            بستن
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ModalHeader
        title={title}
        onClose={closeModal}
        badge={
          <div className="text-accent text-[12.5px] font-black mb-1">فرم نمایشی — بدون پرداخت واقعی</div>
        }
      />
      <p className="text-[13px] text-slate-500 mb-5">
        اطلاعاتت را بگذار؛ کارشناس فروش تی‌رست برای هماهنگی زنگ می‌زند.
      </p>

      <div className="flex gap-3 bg-mist border border-blue-100 rounded-2xl p-3 mb-5">
        <img src={product.img} className="w-16 h-16 rounded-xl object-cover" alt={product.name} />
        <div className="flex-1">
          <div className="font-black text-[13.5px]">{product.name}</div>
          <div className="text-[12px] text-slate-500">
            کد {product.code} • {product.price ? `${fa(product.price)} تومان` : "استعلام قیمت"}
          </div>
        </div>
        <Link
          href="/products"
          onClick={closeModal}
          className="text-[12px] font-bold text-primary hover:underline shrink-0"
        >
          تغییر
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">نام و نام خانوادگی *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام کامل"
            className={fieldClass(errors.name)}
          />
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">شماره تماس *</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="numeric"
            placeholder="09123456789"
            className={`${fieldClass(errors.phone)} tick`}
          />
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">ایمیل (اختیاری)</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
            placeholder="you@mail.com"
            className={`${fieldClass(errors.email)} text-left`}
          />
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">شهر *</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={fieldClass(errors.city)}
          >
            <option value="">انتخاب شهر...</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-[12.5px] font-black block mb-1.5">آدرس دقیق</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="خیابان، کوچه، پلاک، واحد..."
            className={fieldBase}
          />
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">رنگ / مدل انتخابی</label>
          <select value={color} onChange={(e) => setColor(e.target.value)} className={fieldBase}>
            {product.colorNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="مشاوره برای انتخاب رنگ">مشاوره برای انتخاب رنگ</option>
          </select>
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">تعداد</label>
          <div className="flex items-center gap-1 bg-mist border border-slate-200 rounded-xl p-1">
            <button
              type="button"
              aria-label="کاهش تعداد"
              onClick={() => setQty((q) => Math.max(1, Math.min(9, q - 1)))}
              className="w-10 h-10 rounded-lg bg-white shadow-sm font-black"
            >
              −
            </button>
            <span className="flex-1 text-center font-black tick">{fa(qty)}</span>
            <button
              type="button"
              aria-label="افزایش تعداد"
              onClick={() => setQty((q) => Math.max(1, Math.min(9, q + 1)))}
              className="w-10 h-10 rounded-lg bg-white shadow-sm font-black"
            >
              +
            </button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="text-[12.5px] font-black block mb-1.5">
            توضیحات (ابعاد خاص، زمان تحویل...)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="مثلا: ابعاد کوچک‌تر می‌خوام، تحویل آخر ماه..."
            className={fieldBase}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[12.5px] font-black block mb-2">روش تماس ترجیحی</label>
          <div className="grid grid-cols-3 gap-2">
            {["تماس تلفنی", "واتساپ", "پیامک"].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWay(w)}
                className={`py-2.5 rounded-xl border-2 text-[13px] font-bold ${
                  way === w ? "border-deep bg-deep text-white" : "border-slate-200 text-slate-500"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={submit}
        className="mt-5 w-full btn-sheen bg-gradient-to-l from-deep to-primary text-white font-black py-4 rounded-2xl text-[14px] shadow-card"
      >
        ثبت درخواست سفارش
      </button>
      <p className="text-center text-[11.5px] text-slate-400 mt-2.5">
        با ثبت فرم، قوانین خرید و ارسال تی‌رست را می‌پذیرید. (نمایشی)
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* فرم خرید اقساطی                                                    */
/* ------------------------------------------------------------------ */
function InstallmentForm({ productId }: { productId: number | null }) {
  const { closeModal } = useUI();
  const { toast } = useToast();
  const firstProducts = products.slice(0, 8);
  const product = (productId ? products.find((p) => p.id === productId) : undefined) ?? products[0];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState(product.name);
  const [months, setMonths] = useState("۱۲ ماهه");
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [done, setDone] = useState(false);

  const submit = () => {
    const next = { name: !name.trim(), phone: !isValidMobile(phone) };
    setErrors(next);
    if (next.name || next.phone) {
      toast("نام و موبایل معتبر (09...) لازم است", "warn");
      return;
    }
    setDone(true);
    toast("درخواست خرید اقساطی ثبت شد");
  };

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="pop-check w-20 h-20 mx-auto rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-3xl text-amber-500 mb-4">
          <i className="fa-solid fa-file-signature" />
        </div>
        <h3 className="font-black text-[22px] text-deep mb-2">درخواست اقساط ثبت شد</h3>
        <p className="text-[13.5px] text-slate-500 leading-7 max-w-md mx-auto mb-6">
          کارشناس اعتبارسنجی تی‌رست امروز با شما تماس می‌گیرد و پیش‌فاکتور اقساطی صادر می‌کند.
        </p>
        <button
          type="button"
          onClick={closeModal}
          className="bg-deep text-white font-bold px-8 py-3 rounded-xl text-sm"
        >
          باشه، ممنون
        </button>
      </div>
    );
  }

  return (
    <>
      <ModalHeader
        title="درخواست خرید اقساطی"
        onClose={closeModal}
        badge={
          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-black px-3 py-1 rounded-full mb-2">
            <i className="fa-solid fa-credit-card text-[11px]" /> خرید اقساطی تی‌رست
          </div>
        }
      />
      <p className="text-[13px] text-slate-500 leading-7 mb-4">
        بدون ضامن کارمند، با چک/سفته؛ پاسخ اعتبارسنجی معمولاً همان روز.{" "}
        <span className="text-slate-400">
          (متن نمایشی و قابل ویرایش — شرایط نهایی در مشاوره اعلام می‌شود.)
        </span>
      </p>

      <div className="grid sm:grid-cols-3 gap-2 mb-5 text-center">
        <div className="bg-mist rounded-2xl p-3.5">
          <div className="font-black text-deep text-[15px]">۳۰٪</div>
          <div className="text-[11.5px] text-slate-500 font-bold">پیش‌پرداخت منعطف</div>
        </div>
        <div className="bg-mist rounded-2xl p-3.5">
          <div className="font-black text-deep text-[15px]">۶ تا ۲۴ ماه</div>
          <div className="text-[11.5px] text-slate-500 font-bold">بازپرداخت</div>
        </div>
        <div className="bg-mist rounded-2xl p-3.5">
          <div className="font-black text-deep text-[15px]">تحویل فوری</div>
          <div className="text-[11.5px] text-slate-500 font-bold">پس از تایید + ضمانت</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">نام و نام خانوادگی *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام کامل"
            className={fieldClass(errors.name)}
          />
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">شماره تماس *</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="numeric"
            placeholder="09123456789"
            className={`${fieldClass(errors.phone)} tick`}
          />
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">مدل موردنظر</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className={fieldBase}>
            {firstProducts.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[12.5px] font-black block mb-1.5">مدت اقساط</label>
          <select value={months} onChange={(e) => setMonths(e.target.value)} className={fieldBase}>
            <option>۶ ماهه</option>
            <option>۱۲ ماهه</option>
            <option>۱۸ ماهه</option>
            <option>۲۴ ماهه</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={submit}
        className="mt-5 w-full btn-sheen bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black py-4 rounded-2xl text-[14px] shadow-card"
      >
        ثبت درخواست خرید اقساطی
      </button>
      <Link
        href="/rules"
        onClick={closeModal}
        className="block w-full text-center text-[12.5px] font-bold text-slate-400 hover:text-deep mt-2.5"
      >
        مشاهده شرایط اقساط در قوانین ←
      </Link>
    </>
  );
}
