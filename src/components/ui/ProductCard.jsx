import Image from "next/image";
import PriceBuyButton from "@/components/ui/PriceBuyButton";

export default function ProductCard({ id, title, price, image, alt }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/4.4] overflow-hidden bg-surface">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 33vw, 100vw"
          className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 max-w-[240px] text-[11px] font-medium leading-snug">{title}</h3>
      <PriceBuyButton product={{ id, title, price, image, alt }} className="mt-3 self-start" />
    </article>
  );
}
