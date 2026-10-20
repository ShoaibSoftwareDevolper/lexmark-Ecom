"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

export default function PriceBuyButton({ product, className }) {
  const { addItem, openCart } = useStore();

  const handleBuy = () => {
    addItem(product);
    openCart();
  };

  return (
    <div className={cn("inline-flex h-7 text-[11px] font-medium", className)}>
      <span className="flex items-center border border-ink bg-white px-3">{product.price}</span>
      <button
        type="button"
        onClick={handleBuy}
        className="cursor-pointer border border-ink bg-ink px-3 text-white transition-colors duration-300 hover:bg-white hover:text-ink"
      >
        Buy now price
      </button>
    </div>
  );
}
