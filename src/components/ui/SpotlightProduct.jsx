import Image from "next/image";
import PriceBuyButton from "@/components/ui/PriceBuyButton";
import { cn } from "@/lib/utils";

export default function SpotlightProduct({ id, title, description, price, image, alt, reverse = false }) {
  return (
    <article
      className={cn(
        "flex flex-col items-center gap-8 md:gap-14",
        reverse ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      <div className="group relative aspect-[4/3.6] w-full max-w-[420px] shrink-0 overflow-hidden bg-surface md:w-[420px]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 420px, 100vw"
          className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={cn("w-full max-w-[320px]", reverse ? "md:text-right" : "md:text-left", "text-center")}>
        <h3 className="text-xl font-semibold leading-snug tracking-tight">{title}</h3>
        <p className="mt-3 text-xs leading-relaxed text-muted">{description}</p>
        <PriceBuyButton product={{ id, title, price, image, alt }} className="mt-5" />
      </div>
    </article>
  );
}
