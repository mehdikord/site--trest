"use client";

import { useState } from "react";
import { contactSubjects, socials } from "@/data/site";
import { isValidMobile } from "@/lib/format";
import { useToast } from "@/context/ToastContext";

const fieldBase = "w-full bg-mist border border-slate-200 rounded-xl px-3.5 py-3 text-[13.5px]";
const fieldClass = (hasError: boolean) =>
  `${fieldBase} ${hasError ? "border-rose-400! bg-rose-50/50!" : ""}`;

/** فرم تماس صفحه «تماس با ما» */
export function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(contactSubjects[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: false, phone: false, message: false });

  const submit = () => {
    const next = {
      name: !name.trim(),
      phone: !isValidMobile(phone),
      message: !message.trim(),
    };
    setErrors(next);

    if (next.name || next.phone || next.message) {
      toast("فرم را کامل کن (موبایل 09...)", "warn");
      return;
    }

    setName("");
    setPhone("");
    setMessage("");
    setErrors({ name: false, phone: false, message: false });
    toast("پیامت ارسال شد؛ کارشناس ما به‌زودی زنگ می‌زند");
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-[1.8rem] border border-slate-100 shadow-card p-6 lg:p-8">
      <h3 className="font-black text-[18px] text-deep mb-1">فرم تماس</h3>
      <p className="text-[13px] text-slate-500 mb-5">پیامت را بفرست، کارشناس ما زنگ می‌زند</p>

      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[12.5px] font-bold block mb-1.5">نام و نام خانوادگی *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلا: سارا محمدی"
              className={fieldClass(errors.name)}
            />
          </div>
          <div>
            <label className="text-[12.5px] font-bold block mb-1.5">شماره تماس *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              placeholder="0912..."
              className={`${fieldClass(errors.phone)} tick`}
            />
          </div>
        </div>

        <div>
          <label className="text-[12.5px] font-bold block mb-1.5">موضوع</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={fieldBase}
          >
            {contactSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[12.5px] font-bold block mb-1.5">متن پیام *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="سلام، برای مبل راحتی ۷ نفره مشاوره می‌خوام..."
            className={`${fieldClass(errors.message)} leading-7`}
          />
        </div>

        <button
          type="button"
          onClick={submit}
          className="btn-sheen bg-gradient-to-l from-deep to-primary text-white font-black py-3.5 rounded-2xl text-[14px] shadow-card"
        >
          ارسال پیام <i className="fa-solid fa-paper-plane mr-1 text-xs" />
        </button>

        <div className="flex items-center justify-center gap-3 text-slate-400">
          <span className="h-px flex-1 bg-slate-100" />
          <span className="text-[12px]">یا در شبکه‌های اجتماعی</span>
          <span className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="flex justify-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              aria-label={s.label}
              className={`w-11 h-11 rounded-xl ${s.className} text-white flex items-center justify-center hover:scale-105 transition`}
            >
              <i className={`fa-brands ${s.icon}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
