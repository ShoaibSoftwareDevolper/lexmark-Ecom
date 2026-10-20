import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ name, image, alt }) {
  return (
    <Link
      href="/#shop"
      className="group flex items-center justify-between overflow-hidden border border-line bg-surface-soft px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-white hover:shadow-md"
    >
      <span className="text-sm font-medium">{name}</span>
      <span className="relative h-14 w-14 shrink-0 mix-blend-multiply">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="56px"
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </span>
    </Link>
  );
}
