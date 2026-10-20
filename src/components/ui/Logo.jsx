import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className, light = false }) {
  return (
    <Link
      href="/"
      aria-label="LexMark home"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 shadow-sm",
          light
            ? "bg-white text-ink group-hover:bg-white/90"
            : "bg-ink text-white group-hover:bg-black group-hover:shadow-md"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M4 10v4" />
          <path d="M8 7v10" />
          <path d="M12 4v16" />
          <path d="M16 8v8" />
          <path d="M20 11v2" />
        </svg>
      </div>

      <span
        className={cn(
          "font-logo text-[21px] font-bold tracking-tight uppercase leading-none transition-colors duration-300",
          light ? "text-white" : "text-ink"
        )}
      >
        LexMark
      </span>
    </Link>
  );
}
