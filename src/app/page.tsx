import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/common/TrustStrip";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FlashSale } from "@/components/home/FlashSale";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ManufacturingStory } from "@/components/home/ManufacturingStory";
import { InstallmentSection } from "@/components/home/InstallmentSection";
import { BenefitsShowroom } from "@/components/home/BenefitsShowroom";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoriesSection />
      <FlashSale />
      <FeaturedProducts />
      <ManufacturingStory />
      <InstallmentSection />
      <BenefitsShowroom />
      <Testimonials />
      <FinalCta />
    </>
  );
}
