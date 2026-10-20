import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArrowCircle({ href = "/#shop", label = "Explore new stylish collection", className }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group flex h-24 w-24 items-center justify-center rounded-full bg-slate text-ink shadow-lg transition-all duration-500 hover:scale-105 hover:bg-ink hover:text-white sm:h-28 sm:w-28",
        className,
      )}
    >
      <ArrowUpRight
        strokeWidth={1.5}
        className="h-12 w-12 transition-transform duration-500 group-hover:rotate-45 sm:h-14 sm:w-14"
      />
    </Link>
  );
}
