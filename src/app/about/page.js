import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

import { siteData } from "@/data/siteData";

export const metadata = {
  title: "About us — LexMark",
  description: siteData.meta.description,
};

const stats = siteData.aboutPage.stats;
const values = siteData.aboutPage.values;

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="pt-8 sm:pt-10">
        <Container>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em]">About us</p>
          <h1
            id="about-title"
            className="animate-fade-up mt-4 max-w-5xl text-[clamp(2.4rem,7vw,5.5rem)] font-medium uppercase leading-[1.02] tracking-tight"
          >
            Good brands, <br className="hidden sm:block" />
            stylish audio.
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-sm leading-relaxed text-ink/80 [animation-delay:150ms]">
            LexMark is an industrial design store and blog. We find the best headphones, earbuds and speakers, and
            tell the story behind how they are made.
          </p>

          <div className="animate-fade-up relative mt-10 aspect-[16/6] min-h-[220px] w-full overflow-hidden bg-ink [animation-delay:300ms]">
            <Image
              src="/images/hero.jpg"
              alt="Macro shot of a knurled aluminium audio dial"
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section aria-label="LexMark in numbers" className="mt-16 sm:mt-20">
        <Container>
          <dl className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white px-5 py-8 text-center sm:py-10">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-medium tracking-tight sm:text-4xl">{s.value}</dd>
                <p className="mt-2 text-[11px] text-muted" aria-hidden="true">{s.label}</p>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="story-title" className="mt-24 sm:mt-28">
        <Container className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          <div className="relative aspect-[4/3.6] w-full max-w-[460px] shrink-0 overflow-hidden bg-surface">
            <Image
              src="/images/feature-headphones.jpg"
              alt="Blue over-ear headphones"
              fill
              sizes="(min-width: 768px) 460px, 100vw"
              className="object-cover mix-blend-multiply"
            />
          </div>
          <div className="max-w-xl">
            <h2 id="story-title" className="text-2xl font-medium leading-snug tracking-tight sm:text-[28px]">
              Our story
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              LexMark started as a small personal project: a place to collect the audio gear we loved and write about
              why it works. Readers kept asking where to buy it, so the blog grew a shop.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Today we work with the brands we trust, from Sennheiser and Audio-Technica to Skullcandy and
              Beyerdynamic, and feature newer designers who are pushing form and sound forward.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="mt-24 sm:mt-28">
        <Container>
          <SectionHeading
            id="values-title"
            title="What we believe"
            description="Three simple rules guide every product we choose to sell."
          />
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <li
                key={v.title}
                className="border border-line bg-surface-soft p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-white hover:shadow-md"
              >
                <span className="text-[10px] font-semibold tracking-[0.3em] text-slate">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="cta-title" className="my-24 sm:my-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 bg-ink px-8 py-12 text-white sm:flex-row sm:items-center sm:px-12">
            <h2 id="cta-title" className="max-w-sm text-2xl font-medium leading-snug tracking-tight sm:text-[28px]">
              Ready to find your next favourite pair?
            </h2>
            <Link
              href="/#shop"
              className="group inline-flex items-center gap-2 border border-white px-6 py-3 text-xs font-medium transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              Shop the collection
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
