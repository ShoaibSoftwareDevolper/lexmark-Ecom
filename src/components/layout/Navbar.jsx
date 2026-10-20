"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Headphones,
  Lock,
  LogOut,
  Mail,
  Menu,
  Radio,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  Volume2,
  X,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { useStore } from "@/context/StoreContext";
import { siteData } from "@/data/siteData";

const navLinks = siteData.header.navLinks;

const iconButton =
  "relative cursor-pointer p-2 rounded-full text-ink transition-colors duration-200 hover:bg-surface hover:text-ink";

const ICON_MAP = {
  Headphones,
  Radio,
  Volume2,
};

const shopCategories = siteData.header.shopDropdown.map((item) => ({
  ...item,
  icon: ICON_MAP[item.iconType] || Headphones,
}));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const shopMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const { count, openCart, openSearch } = useStore();

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(e.target)) {
        setShopOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShopOpen(false);
        setUserOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsLoggedIn(true);
      setUserOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmailInput("");
    setPasswordInput("");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-200 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
      <Container className="relative flex h-16 items-center justify-between">
        <Logo />

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  ref={shopMenuRef}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setShopOpen((prev) => !prev)}
                    aria-expanded={shopOpen}
                    aria-haspopup="true"
                    className="group relative flex items-center gap-1.5 py-2 text-[12px] font-medium tracking-wide text-ink/90 transition-colors hover:text-ink cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={12}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${
                        shopOpen ? "rotate-180 text-ink" : "text-muted"
                      }`}
                    />
                    <span
                      className={`absolute bottom-1 left-0 h-[2px] bg-ink transition-all duration-300 ${
                        shopOpen ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>

                  {shopOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 animate-dropdown">
                      <div className="w-[360px] rounded-2xl border border-line/70 bg-white p-3 shadow-2xl ring-1 ring-black/5">
                        <div className="mb-2 px-3 pt-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                            Explore Catalog
                          </p>
                        </div>
                        <div className="space-y-1">
                          {shopCategories.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setShopOpen(false)}
                                className="group flex items-center gap-3.5 rounded-xl p-2.5 transition-all duration-150 hover:bg-surface-soft"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-white">
                                  <Icon size={18} strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-semibold text-ink">
                                    {item.title}
                                  </span>
                                  <p className="truncate text-[11px] text-muted">
                                    {item.description}
                                  </p>
                                </div>
                                <ArrowRight
                                  size={13}
                                  className="text-muted/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink"
                                />
                              </Link>
                            );
                          })}
                        </div>

                        <div className="mt-2.5 border-t border-line/60 pt-2.5 px-2">
                          <Link
                            href="/#shop"
                            onClick={() => setShopOpen(false)}
                            className="flex items-center justify-between rounded-lg bg-surface-soft px-3 py-2 text-[11px] font-medium text-ink transition-colors hover:bg-surface"
                          >
                            <span className="flex items-center gap-1.5 text-ink font-semibold">
                              <Sparkles size={12} />
                              New Audio Arrivals
                            </span>
                            <span className="text-[10px] text-muted">View all &rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="group relative flex items-center gap-1 py-2 text-[12px] font-medium tracking-wide text-ink/90 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute bottom-1 left-0 h-[2px] w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            aria-label="Search"
            onClick={() => {
              setUserOpen(false);
              setMobileOpen(false);
              openSearch();
            }}
            className={iconButton}
            title="Search products (Ctrl+K)"
          >
            <Search size={16} strokeWidth={2.2} />
          </button>

          <div ref={userMenuRef} className="relative">
            <button
              aria-label="Account"
              onClick={() => {
                setMobileOpen(false);
                setUserOpen((prev) => !prev);
              }}
              aria-expanded={userOpen}
              className={`${iconButton} ${userOpen ? "bg-surface text-ink ring-2 ring-ink/10" : ""}`}
              title="Account & Login"
            >
              <User size={16} strokeWidth={2.2} />
              {isLoggedIn && (
                <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-ink ring-2 ring-white" />
              )}
            </button>

            {userOpen && (
              <>
                <div
                  className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/20 md:hidden"
                  onClick={() => setUserOpen(false)}
                  onPointerDown={() => setUserOpen(false)}
                  aria-hidden="true"
                />
                <div className="fixed left-4 right-4 top-[72px] z-50 mx-auto w-auto max-w-[340px] animate-dropdown md:absolute md:left-auto md:right-0 md:top-full md:mx-0 md:pt-2 md:w-[320px] md:max-w-none">
                  <div className="max-h-[calc(100vh-5.5rem)] w-full overflow-y-auto rounded-2xl border border-line/70 bg-white p-5 shadow-2xl ring-1 ring-black/5">
                    {isLoggedIn ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-line/60 pb-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white font-semibold text-sm">
                              {emailInput ? emailInput[0].toUpperCase() : "U"}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-semibold text-ink">
                                {emailInput || "audiofan@lexmark.com"}
                              </p>
                              <p className="text-[11px] text-muted">
                                Active Account
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUserOpen(false)}
                            className="shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-surface-soft hover:text-ink md:hidden cursor-pointer"
                            aria-label="Close account menu"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="space-y-1">
                          <Link
                            href="/#shop"
                            onClick={() => setUserOpen(false)}
                            className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-ink transition-colors hover:bg-surface-soft"
                          >
                            <span>My Orders &amp; Tracking</span>
                            <span className="text-[10px] text-muted">2 active</span>
                          </Link>
                          <Link
                            href="/#shop"
                            onClick={() => setUserOpen(false)}
                            className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-ink transition-colors hover:bg-surface-soft"
                          >
                            <span>Saved Wishlist</span>
                            <span className="text-[10px] text-muted">5 items</span>
                          </Link>
                          <Link
                            href="/about"
                            onClick={() => setUserOpen(false)}
                            className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-ink transition-colors hover:bg-surface-soft"
                          >
                            <span>Audio Preferences &amp; EQ</span>
                          </Link>
                        </div>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-line/80 py-2 text-xs font-medium text-muted transition-colors hover:border-ink hover:bg-surface-soft hover:text-ink cursor-pointer"
                        >
                          <LogOut size={13} />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-4 flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-logo text-base font-bold text-ink">
                              Welcome to LexMark
                            </h4>
                            <p className="text-[11px] text-muted">
                              Sign in to manage orders, wishlist &amp; audio gear.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUserOpen(false)}
                            className="shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-surface-soft hover:text-ink md:hidden cursor-pointer"
                            aria-label="Close sign in"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <form onSubmit={handleLoginSubmit} className="space-y-3">
                          <div>
                            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted">
                              Email address
                            </label>
                            <div className="relative">
                              <Mail
                                size={13}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                              />
                              <input
                                type="email"
                                required
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full rounded-xl border border-line bg-surface-soft/60 py-2 pl-8 pr-3 text-xs text-ink placeholder:text-muted/60 focus:border-ink focus:bg-white focus:outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted">
                              Password
                            </label>
                            <div className="relative">
                              <Lock
                                size={13}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                              />
                              <input
                                type="password"
                                required
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-line bg-surface-soft/60 py-2 pl-8 pr-3 text-xs text-ink placeholder:text-muted/60 focus:border-ink focus:bg-white focus:outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px]">
                            <label className="flex items-center gap-1.5 text-muted cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="rounded border-line text-ink accent-ink"
                              />
                              Remember me
                            </label>
                            <a href="#" className="font-medium text-ink hover:underline">
                              Forgot?
                            </a>
                          </div>

                          <button
                            type="submit"
                            className="w-full rounded-xl bg-ink py-2.5 text-center text-xs font-semibold text-white transition-all duration-200 hover:bg-black hover:shadow-md cursor-pointer"
                          >
                            Sign In
                          </button>

                          <p className="text-center text-[10px] text-muted">
                            New to LexMark?{" "}
                            <button
                              type="button"
                              onClick={() => {
                                setEmailInput("guest@lexmark.com");
                                setIsLoggedIn(true);
                                setUserOpen(false);
                              }}
                              className="font-semibold text-ink underline hover:text-black cursor-pointer"
                            >
                              Quick Demo Sign In
                            </button>
                          </p>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            aria-label={`Cart, ${count} items`}
            onClick={() => {
              setUserOpen(false);
              setMobileOpen(false);
              openCart();
            }}
            className={iconButton}
          >
            <ShoppingBag size={16} strokeWidth={2.2} />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-semibold leading-none text-white shadow-sm">
                {count}
              </span>
            )}
          </button>

          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setUserOpen(false);
              setMobileOpen((v) => !v);
            }}
            className={`${iconButton} md:hidden`}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="border-b border-line bg-white animate-dropdown md:hidden"
        >
          <Container className="flex flex-col py-3">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-line/60 py-2.5 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between text-sm font-medium text-ink"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} className="text-muted" />}
                </Link>

                {link.hasDropdown && (
                  <div className="mt-2 space-y-1.5 pl-3">
                    {shopCategories.map((c) => (
                      <Link
                        key={c.title}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-1 text-xs text-muted hover:text-ink"
                      >
                        <span>{c.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-3 pt-3 border-t border-line/60">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setUserOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface py-2.5 text-xs font-semibold text-ink"
              >
                <User size={14} />
                {isLoggedIn ? "Account Profile" : "Sign In to LexMark"}
              </button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
