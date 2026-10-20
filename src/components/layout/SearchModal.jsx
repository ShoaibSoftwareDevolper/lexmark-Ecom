"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CornerDownLeft, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { siteData } from "@/data/siteData";
import { cn } from "@/lib/utils";

const categories = siteData.categoriesSection.items;
const navLinks = siteData.header.navLinks;
const products = [
  ...siteData.featuredSection.products,
  ...siteData.spotlightSection.products,
];
const popularTerms = ["Headphones", "Earbuds", "Sennheiser", "Speaker"];

const matches = (haystack, tokens) => tokens.every((t) => haystack.includes(t));

export default function SearchModal() {
  const { searchOpen, openSearch, closeSearch, addItem, openCart } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const close = () => {
    closeSearch();
    setQuery("");
  };

  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape" && searchOpen) {
        closeSearch();
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, openSearch, closeSearch]);

  useEffect(() => {
    if (!searchOpen) return;
    const id = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(id);
  }, [searchOpen]);

  const tokens = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);
  const searching = tokens.length > 0;

  const results = useMemo(() => {
    if (!searching) return { products: products.slice(0, 3), categories: [], pages: [] };
    return {
      products: products.filter((p) => matches(`${p.title} ${p.alt} ${p.description ?? ""}`.toLowerCase(), tokens)),
      categories: categories.filter((c) => matches(`${c.name} ${c.alt}`.toLowerCase(), tokens)),
      pages: navLinks.filter((l) => matches(l.label.toLowerCase(), tokens)),
    };
  }, [tokens, searching]);

  const total = results.products.length + results.categories.length + results.pages.length;

  const buy = (product) => {
    addItem(product);
    close();
    openCart();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (results.products[0] && searching) buy(results.products[0]);
  };

  return (
    <div className={cn("fixed inset-0 z-[80]", !searchOpen && "pointer-events-none")} inert={!searchOpen}>
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300",
          searchOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={cn(
          "absolute left-1/2 top-[8vh] flex max-h-[84vh] w-[calc(100%-2rem)] max-w-[680px] -translate-x-1/2 flex-col overflow-hidden bg-white shadow-2xl",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          searchOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
        )}
      >
        <form onSubmit={onSubmit} role="search" className="flex shrink-0 items-center gap-3 border-b border-line px-5">
          <Search size={18} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, pages…"
            aria-label="Search the store"
            autoComplete="off"
            className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="cursor-pointer p-1 text-muted hover:text-ink">
              <X size={16} />
            </button>
          )}
          <kbd className="hidden border border-line px-1.5 py-0.5 text-[10px] text-muted sm:block">ESC</kbd>
        </form>

        <div className="overflow-y-auto px-5 py-4" aria-live="polite">
          {!searching && (
            <div className="mb-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {popularTerms.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="cursor-pointer border border-line px-3 py-1 text-xs transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searching && total === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm font-medium">No results for “{query.trim()}”</p>
              <p className="mt-1 text-xs text-muted">Try a brand name like Sennheiser, or “earbuds”.</p>
            </div>
          )}

          {results.products.length > 0 && (
            <section className="mb-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                {searching ? `Products (${results.products.length})` : "Featured"}
              </p>
              <ul className="divide-y divide-line/70">
                {results.products.map((p) => (
                  <li key={p.id} className="flex items-center gap-4 py-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-surface">
                      <Image src={p.image} alt={p.alt} fill sizes="56px" className="object-cover mix-blend-multiply" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-medium">{p.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{p.alt}</p>
                    </div>
                    <span className="text-xs font-medium">{p.price}</span>
                    <button
                      type="button"
                      onClick={() => buy(p)}
                      aria-label={`Add ${p.title} to cart`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border border-ink bg-ink text-white transition-colors hover:bg-white hover:text-ink"
                    >
                      <ShoppingBag size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {results.categories.length > 0 && (
            <section className="mb-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Brands</p>
              <ul>
                {results.categories.map((c) => (
                  <li key={c.id}>
                    <Link href="/#category" onClick={close} className="flex items-center justify-between py-2 text-xs font-medium transition-colors hover:text-ink">
                      {c.name}
                      <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {results.pages.length > 0 && (
            <section className="mb-2">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Pages</p>
              <ul>
                {results.pages.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} onClick={close} className="flex items-center justify-between py-2 text-xs font-medium transition-colors hover:text-ink">
                      {l.label}
                      <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {searching && results.products.length > 0 && (
          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-line bg-surface-soft px-5 py-2 text-[11px] text-muted">
            <CornerDownLeft size={12} /> Press Enter to add the first product to your cart
          </div>
        )}
      </div>
    </div>
  );
}
