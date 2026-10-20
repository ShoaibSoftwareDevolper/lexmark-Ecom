import { cn } from "@/lib/utils";

export default function SectionHeading({ title, description, id, className }) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-start md:justify-between", className)}>
      <h2 id={id} className="max-w-md text-2xl font-medium leading-snug tracking-tight sm:text-[28px]">
        {title}
      </h2>
      {description && <p className="max-w-[300px] text-xs leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
