"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import SocialIcon from "@/components/ui/SocialIcon";
import { siteData } from "@/data/siteData";

const footerColumns = siteData.footer.columns;
const footerLegalLinks = siteData.footer.legalLinks;
const socialLinks = siteData.footer.socialLinks;

const headingClass = "mb-4 text-[10px] font-semibold uppercase tracking-wider text-white";
const linkClass = "text-[11px] text-white/60 transition-colors hover:text-white";

export default function Footer() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setValue("");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 400);
  };

  return (
    <footer id="about" className="bg-footer text-white">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <Logo light />
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {footerLegalLinks.map((link, i) => (
              <li key={`${link.label}-${i}`}>
                <Link href={link.href} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="space-y-1.5">
            <form onSubmit={handleSubmit} className="mt-2 flex h-9 max-w-[300px]">
              <label className="flex flex-1 items-center gap-2 border border-white/30 px-3 focus-within:border-white">
                <Search size={12} className="text-white/60" />
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={status === "success" ? "Subscribed!" : "Search..."}
                  aria-label="Search or Subscribe"
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-transparent text-[11px] text-white outline-none placeholder:text-white/50 disabled:opacity-70"
                />
              </label>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="cursor-pointer bg-white px-4 text-[10px] font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-white/80 disabled:opacity-90 flex items-center gap-1 shrink-0"
              >
                {status === "loading" && "..."}
                {status === "success" && (
                  <>
                    <Check size={11} strokeWidth={3} />
                    <span>Done</span>
                  </>
                )}
                {status === "idle" && "Subscribe"}
              </button>
            </form>
            {status === "success" && (
              <p className="text-[10px] text-white/70">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 className={headingClass}>{col.title}</h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className={headingClass}>{siteData.footer.newsletterTitle}</h3>
          <p className="max-w-[220px] text-[11px] leading-relaxed text-white/60">
            {siteData.footer.newsletterSubtitle}
          </p>
          <div className="mt-4 flex gap-2">
            {socialLinks.map((s) => (
              <SocialIcon key={s.name} {...s} />
            ))}
          </div>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-5">
        <p className="text-[10px] text-white/40">{siteData.footer.copyright}</p>
      </Container>
    </footer>
  );
}
