"use client";

import { useRef } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

/** ردیف افقی محصولات ویژه */
export function FeaturedProducts() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollRow = (dir: 1 | -1) => {
    rowRef.current?.scrollBy({ left: dir * -320, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-14">
      <Reveal>
        <SectionHeading
          eyebrow="انتخاب کارشناسان کارخانه"
          title="محصولات ویژه"
          action={
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="اسکرول به راست"
                onClick={() => scrollRow(1)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-deep hover:text-white transition"
              >
                <i className="fa-solid fa-arrow-right text-sm" />
              </button>
              <button
                type="button"
                aria-label="اسکرول به چپ"
                onClick={() => scrollRow(-1)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-deep hover:text-white transition"
              >
                <i className="fa-solid fa-arrow-left text-sm" />
              </button>
            </div>
          }
        />
      </Reveal>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4 lg:mx-0 lg:px-0"
      >
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} row />
        ))}
      </div>

      <div className="text-center mt-7">
        <Link
          href="/products"
          className="btn-sheen inline-block bg-deep text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-primary transition shadow-card"
        >
          مشاهده کاتالوگ کامل <i className="fa-solid fa-arrow-left mr-1 text-xs" />
        </Link>
      </div>
    </section>
  );
}
