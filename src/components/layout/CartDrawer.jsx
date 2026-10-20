"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { cn, formatPrice } from "@/lib/utils";

const qtyButton =
  "flex h-6 w-6 cursor-pointer items-center justify-center border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white";

export default function CartDrawer() {
  const { items, count, subtotal, setQty, removeItem, clearCart, cartOpen, closeCart } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  return (
    <div className={cn("fixed inset-0 z-[70]", !cartOpen && "pointer-events-none")} inert={!cartOpen}>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500",
          cartOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em]">
            Your cart <span className="text-muted">({count})</span>
          </h2>
          <button aria-label="Close cart" onClick={closeCart} className="cursor-pointer p-1 transition-opacity hover:opacity-60">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag size={40} strokeWidth={1.2} className="text-slate" />
            <p className="text-sm font-medium">Your cart is empty</p>
            <p className="text-xs text-muted">Pick something stylish and it will show up here.</p>
            <Link
              href="/#shop"
              onClick={closeCart}
              className="mt-2 border border-ink bg-ink px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-white hover:text-ink"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-surface">
                    <Image src={item.image} alt={item.alt} fill sizes="80px" className="object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="line-clamp-2 text-xs font-medium leading-snug">{item.title}</p>
                    <p className="mt-1 text-xs text-muted">{item.price}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button aria-label="Decrease quantity" onClick={() => setQty(item.id, item.qty - 1)} className={qtyButton}>
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs font-medium" aria-live="polite">{item.qty}</span>
                        <button aria-label="Increase quantity" onClick={() => setQty(item.id, item.qty + 1)} className={qtyButton}>
                          <Plus size={11} />
                        </button>
                      </div>
                      <button
                        aria-label={`Remove ${item.title}`}
                        onClick={() => removeItem(item.id)}
                        className="cursor-pointer p-1 text-muted transition-colors hover:text-ink"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-line bg-surface-soft px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted">Shipping and taxes calculated at checkout.</p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 block w-full border border-ink bg-ink py-3 text-center text-xs font-medium text-white transition-colors hover:bg-white hover:text-ink"
              >
                Checkout
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="mt-2 w-full cursor-pointer py-2 text-[11px] text-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
