import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ToastProvider } from "@/context/ToastContext";
import { StoreProvider } from "@/context/StoreContext";
import { UIProvider } from "@/context/UIContext";

import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PageTransition } from "@/components/layout/PageTransition";
import { CartDrawer } from "@/components/drawers/CartDrawer";
import { WishlistDrawer } from "@/components/drawers/WishlistDrawer";
import { QuickViewModal } from "@/components/modals/QuickViewModal";
import { OrderModal } from "@/components/modals/OrderModal";

export const metadata: Metadata = {
  title: {
    default: "تی رست | فروشگاه و تولیدکننده مبلمان",
    template: "%s | تی رست",
  },
  description:
    "فروشگاه و تولیدکننده مبلمان تی‌رست؛ خرید مستقیم از کارخانه با ضمانت ۵ ساله، خرید اقساطی تا ۲۴ ماه، ارسال و نصب سراسری.",
  keywords: ["مبل", "مبلمان", "تی رست", "خرید اقساطی مبل", "مبل کارخانه", "مبل راحتی"],
  authors: [{ name: "کارخانه تی‌رست" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B3A6E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir antialiased">
        <ToastProvider>
          <StoreProvider>
            <UIProvider>
              <TopBar />
              <Header />
              <MobileMenu />
              <SearchOverlay />

              <main>
                <PageTransition>{children}</PageTransition>
              </main>

              <Footer />
              <MobileBottomNav />

              <CartDrawer />
              <WishlistDrawer />
              <QuickViewModal />
              <OrderModal />
            </UIProvider>
          </StoreProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
