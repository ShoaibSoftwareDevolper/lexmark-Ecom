"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { parsePrice } from "@/lib/utils";

const StoreContext = createContext(null);
const STORAGE_KEY = "lexmark-cart-v1";

export function StoreProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
        if (Array.isArray(saved)) setItems(saved);
      } catch {}
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen]);

  const openCart = useCallback(() => {
    setSearchOpen(false);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openSearch = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      const { id, title, price, image, alt } = product;
      return [...prev, { id, title, price, image, alt, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const removeItem = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0),
      addItem,
      setQty,
      removeItem,
      clearCart,
      cartOpen,
      openCart,
      closeCart,
      searchOpen,
      openSearch,
      closeSearch,
    }),
    [items, hydrated, addItem, setQty, removeItem, clearCart, cartOpen, openCart, closeCart, searchOpen, openSearch, closeSearch],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
