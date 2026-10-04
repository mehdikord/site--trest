"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, Product } from "@/types";
import { products } from "@/data/products";
import { useToast } from "./ToastContext";

const CART_KEY = "trest.cart";
const WISH_KEY = "trest.wishlist";

/** سبد و علاقه‌مندی‌های نمایشی اولیه (مطابق نسخه اولیه سایت) */
const DEMO_CART: CartLine[] = [{ id: 1, qty: 1 }];
const DEMO_WISH: number[] = [3];

const findProduct = (id: number): Product | undefined => products.find((p) => p.id === id);

interface StoreContextValue {
  cart: CartLine[];
  wishlist: number[];
  cartCount: number;
  cartTotal: number;
  addToCart: (id: number, qty?: number) => void;
  changeQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  inWishlist: (id: number) => boolean;
  toggleWishlist: (id: number) => void;
  cartLines: { product: Product; qty: number }[];
  wishProducts: Product[];
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartLine[]>(DEMO_CART);
  const [wishlist, setWishlist] = useState<number[]>(DEMO_WISH);
  const [hydrated, setHydrated] = useState(false);

  /* خواندن وضعیت ذخیره‌شده از localStorage پس از mount شدن؛
     این کار در effect انجام می‌شود تا رندر سرور و کلاینت یکسان بمانند
     و خطای hydration رخ ندهد. */
  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(CART_KEY);
      const rawWish = window.localStorage.getItem(WISH_KEY);
      /* setState در effect فقط یک‌بار و برای خواندن داده ذخیره‌شده کاربر است */
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (rawCart) setCart(JSON.parse(rawCart) as CartLine[]);
      if (rawWish) setWishlist(JSON.parse(rawWish) as number[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback(
    (id: number, qty = 1) => {
      setCart((lines) => {
        const found = lines.find((l) => l.id === id);
        return found
          ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
          : [...lines, { id, qty }];
      });
      const product = findProduct(id);
      if (product) toast(`«${product.name}» به سبد اضافه شد`);
    },
    [toast]
  );

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((lines) =>
      lines
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty >= 1)
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((lines) => lines.filter((l) => l.id !== id));
  }, []);

  const inWishlist = useCallback((id: number) => wishlist.includes(id), [wishlist]);

  const toggleWishlist = useCallback(
    (id: number) => {
      const exists = wishlist.includes(id);
      setWishlist(exists ? wishlist.filter((x) => x !== id) : [...wishlist, id]);
      toast(exists ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد", "info");
    },
    [toast, wishlist]
  );

  const cartLines = useMemo(
    () =>
      cart
        .map((l) => ({ product: findProduct(l.id)!, qty: l.qty }))
        .filter((l) => Boolean(l.product)),
    [cart]
  );

  const wishProducts = useMemo(
    () => wishlist.map((id) => findProduct(id)).filter((p): p is Product => Boolean(p)),
    [wishlist]
  );

  const cartCount = useMemo(() => cart.reduce((sum, l) => sum + l.qty, 0), [cart]);

  const cartTotal = useMemo(
    () => cartLines.reduce((sum, l) => sum + (l.product.price ?? 0) * l.qty, 0),
    [cartLines]
  );

  const value: StoreContextValue = {
    cart,
    wishlist,
    cartCount,
    cartTotal,
    addToCart,
    changeQty,
    removeFromCart,
    inWishlist,
    toggleWishlist,
    cartLines,
    wishProducts,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
