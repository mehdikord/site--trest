import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/common/CategoryCard";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

/** بخش دسته‌بندی‌ها در صفحه اصلی */
export function CategoriesSection() {
  return (
    <section id="cats" className="max-w-7xl mx-auto px-4 lg:px-6 pt-14">
      <Reveal>
        <SectionHeading
          eyebrow="کشف دنیای تی‌رست"
          title="دسته‌بندی‌ها"
          subtitle="هر فضا، یک انتخاب تولید کارخانه"
          action={
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm bg-white border border-blue-100 px-4 py-2.5 rounded-xl hover:shadow-card transition"
            >
              همه محصولات <i className="fa-solid fa-arrow-left text-xs" />
            </Link>
          }
        />
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {categories.map((category, i) => (
          <CategoryCard
            key={category.key}
            category={category}
            delay={i % 4 === 1 ? 1 : i % 4 === 2 ? 2 : i % 4 === 3 ? 3 : undefined}
          />
        ))}
      </div>
    </section>
  );
}
