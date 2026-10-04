"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

/** فرم عضویت در خبرنامه (فوتر) */
export function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const subscribe = () => {
    if (!email.trim() || !email.includes("@")) {
      toast("ایمیل معتبر وارد کن", "warn");
      return;
    }
    setEmail("");
    toast("عضویتت در خبرنامه تی‌رست ثبت شد");
  };

  return (
    <div className="mt-4 bg-white rounded-2xl p-1.5 flex">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ایمیل برای تخفیف‌ها"
        className="flex-1 bg-transparent text-ink text-[12.5px] px-3 min-w-0"
      />
      <button
        type="button"
        onClick={subscribe}
        className="bg-deep text-white text-[12.5px] font-bold px-4 py-2.5 rounded-xl"
      >
        عضویت
      </button>
    </div>
  );
}
