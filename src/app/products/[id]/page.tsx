import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, products } from "@/data/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/** پیش‌رندر همه محصولات در زمان build */
export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: "محصول یافت نشد" };

  return {
    title: product.name,
    description: product.desc,
    openGraph: {
      title: `${product.name} | تی رست`,
      description: product.desc,
      images: [{ url: product.img }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <Link
        href="/products"
        className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-deep mb-4 transition w-fit"
      >
        <i className="fa-solid fa-arrow-right" /> بازگشت به کاتالوگ
      </Link>

      <ProductDetail product={product} />

      <div className="mt-8">
        <h3 className="font-black text-[20px] text-deep mb-4">محصولات مرتبط</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
