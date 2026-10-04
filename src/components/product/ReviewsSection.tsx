"use client";

import { useRef, useState } from "react";
import type { Product, Review } from "@/types";
import { mockReviews } from "@/data/reviews";
import { fa } from "@/lib/format";
import { useToast } from "@/context/ToastContext";
import { Stars } from "@/components/common/Stars";

const AVERAGE_RATING = 4.7;
const DISTRIBUTION = [72, 18, 6, 2, 2];

/** بخش دیدگاه خریداران در صفحه محصول */
export function ReviewsSection({ product }: { product: Product }) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(() => [...mockReviews]);
  const [stars, setStars] = useState(5);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const submit = () => {
    if (!name.trim() || !text.trim()) {
      toast("نام و متن دیدگاه لازم است", "warn");
      return;
    }
    setReviews((list) => [
      { n: name.trim(), d: "لحظاتی پیش", s: stars, t: text.trim(), like: 0 },
      ...list,
    ]);
    setName("");
    setText("");
    setTitle("");
    toast("دیدگاهت ثبت شد و پس از تایید نمایش داده می‌شود");
  };

  return (
    <div className="border-t border-slate-100 p-5 lg:p-8 bg-mist/40">
      <h3 className="font-black text-[18px] text-deep mb-1">دیدگاه خریداران</h3>
      <p className="text-[13px] text-slate-500 mb-5">
        تجربه واقعی کسانی که از کارخانه خریده‌اند
      </p>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 text-center h-fit">
          <div className="font-black text-5xl text-deep tick">{fa(AVERAGE_RATING)}</div>
          <div className="flex justify-center gap-0.5 my-2">
            <Stars rating={AVERAGE_RATING} />
          </div>
          <div className="text-[12.5px] text-slate-400 tick mb-4">
            بر اساس {fa(product.reviews)} دیدگاه
          </div>
          {[5, 4, 3, 2, 1].map((score) => {
            const pct = DISTRIBUTION[5 - score];
            return (
              <div key={score} className="flex items-center gap-2 text-[12px] mb-1.5">
                <span className="tick font-bold w-6">{fa(score)}</span>
                <div className="flex-1 h-2 bg-mist rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-amber-400 to-orange-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="tick text-slate-400 w-8">٪{fa(pct)}</span>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="mt-4 w-full border-2 border-deep/15 font-bold py-2.5 rounded-xl text-[13px] hover:border-deep hover:text-deep transition"
          >
            ثبت دیدگاه شما
          </button>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={`${r.n}-${i}`} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep to-accent text-white flex items-center justify-center font-black">
                    {r.n[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-[13.5px]">{r.n}</div>
                    <div className="text-[11.5px] text-slate-400">
                      {r.d} • خرید تاییدشده <i className="fa-solid fa-badge-check text-emerald-500" />
                    </div>
                  </div>
                  <Stars rating={r.s} />
                </div>
                <p className="text-[13.5px] text-slate-600 leading-7">{r.t}</p>
                <button
                  type="button"
                  className="text-[12px] text-slate-400 font-bold mt-2 hover:text-deep"
                >
                  <i className="fa-regular fa-thumbs-up ml-1" /> مفید بود (
                  <span className="tick">{fa(r.like)}</span>)
                </button>
              </div>
            ))}
          </div>

          <div ref={formRef} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="font-black text-[14px] mb-3">دیدگاهت را بنویس</div>
            <div className="flex gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`امتیاز ${i}`}
                  onClick={() => setStars(i)}
                  className={`rev-star text-2xl ${i <= stars ? "text-amber-400" : "text-slate-200"}`}
                >
                  <i className="fa-solid fa-star" />
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5 mb-2.5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام شما"
                className="bg-mist border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px]"
              />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان دیدگاه (مثلا: خیلی راحته)"
                className="bg-mist border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px]"
              />
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="تجربه‌ات از کیفیت، راحتی و ارسال..."
              className="w-full bg-mist border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] leading-7 mb-3"
            />
            <button
              type="button"
              onClick={submit}
              className="bg-deep text-white font-bold px-6 py-2.5 rounded-xl text-[13px]"
            >
              ثبت دیدگاه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
