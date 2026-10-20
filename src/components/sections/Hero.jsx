import Image from "next/image";
import Container from "@/components/ui/Container";
import ArrowCircle from "@/components/ui/ArrowCircle";
import { siteData } from "@/data/siteData";

export default function Hero({ data = siteData.hero }) {
  const { heading, tagline, subheading, image, imageAlt } = data;

  return (
    <section aria-labelledby="hero-title" className="pt-8 sm:pt-10">
      <Container>
        <h1
          id="hero-title"
          className="animate-fade-up text-center text-[clamp(2.6rem,9.2vw,7.5rem)] font-medium uppercase leading-none tracking-tight"
        >
          {heading}
        </h1>

        <div className="animate-fade-up mt-4 flex justify-end [animation-delay:150ms]">
          <p className="w-full max-w-[270px] text-sm leading-relaxed text-ink/80 md:mr-[8%]">
            {tagline}
          </p>
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em]">{subheading}</p>

        <div className="animate-fade-up relative mt-3 [animation-delay:300ms]">
          <div className="relative aspect-[16/6] min-h-[220px] w-full overflow-hidden bg-ink">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover"
            />
          </div>
          <ArrowCircle className="absolute -bottom-12 left-[6%] sm:-bottom-14" />
        </div>
      </Container>
    </section>
  );
}
