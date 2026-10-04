"use client";

import Link from "next/link";
import type { Category } from "@/types";
import { useReveal } from "./Reveal";

interface CategoryCardProps {
  category: Category;
  /** تاخیر انیمیشن ورود */
  delay?: 1 | 2 | 3;
  /** اندازه کارت: صفحه اصلی یا صفحه دسته‌بندی‌ها */
  size?: "home" | "page";
}

/** کارت دسته‌بندی با لینک به کاتالوگ فیلترشده */
export function CategoryCard({ category, delay, size = "home" }: CategoryCardProps) {
  const { ref, className } = useReveal<HTMLAnchorElement>();

  const height = size === "home" ? "h-44 sm:h-52" : "h-56 sm:h-64 lg:h-72";

  return (
    <Link
      ref={ref}
      href={`/products?cat=${encodeURIComponent(category.key)}`}
      className={`reveal ${delay ? `reveal-d${delay}` : ""} ${className} group relative rounded-[1.4rem] overflow-hidden text-right shadow-card hover:shadow-pop transition-all hover:-translate-y-1 ${height} block`}
    >
      <img
        src={category.img}
        className="absolute inset-0 w-full h-full object-cover img-zoom"
        alt={category.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/25 to-transparent" />
      <div className="absolute bottom-0 p-4 text-white w-full">
        <div className="text-[11px] bg-white/20 backdrop-blur border border-white/25 rounded-full px-2.5 py-0.5 w-fit mb-1.5 font-bold">
          {category.count}
        </div>
        <div className="font-black text-[15px] sm:text-[17px]">{category.name}</div>
        <div className="text-[12px] text-white/70">{category.desc}</div>
      </div>
      <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white flex items-center justify-center group-hover:bg-white group-hover:text-deep transition">
        <i className="fa-solid fa-arrow-left text-sm" />
      </div>
    </Link>
  );
}
