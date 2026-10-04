import { testimonials } from "@/data/testimonials";
import { Reveal } from "@/components/common/Reveal";

/** بخش نظرات خریداران */
export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-14">
      <Reveal className="text-center mb-6">
        <div className="text-accent font-bold text-[13px]">اعتماد ۱۴٬۸۰۰ خانواده</div>
        <h2 className="font-black text-[24px] lg:text-[30px] text-deep">حرف‌های خریداران تی‌رست</h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.n}
            delay={i > 0 ? (Math.min(i, 3) as 1 | 2 | 3) : undefined}
            className="bg-white rounded-[1.6rem] border border-slate-100 shadow-card p-6 hover:shadow-pop hover:-translate-y-1 transition-all"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.s }).map((_, index) => (
                <i key={index} className="fa-solid fa-star text-amber-400 text-sm" />
              ))}
            </div>
            <p className="text-[13.5px] leading-7 text-slate-600 mb-4">
              {`"${t.t}"`}
            </p>
            <div className="flex items-center gap-3">
              <img
                src={t.img}
                className="w-11 h-11 rounded-full object-cover border-2 border-blue-100"
                alt={t.n}
              />
              <div>
                <div className="font-black text-[13.5px]">{t.n}</div>
                <div className="text-[12px] text-slate-400">{t.c}</div>
              </div>
              <i className="fa-solid fa-quote-left mr-auto text-blue-100 text-2xl" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
