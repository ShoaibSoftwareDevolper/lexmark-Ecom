"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import CategoryCard from "@/components/ui/CategoryCard";
import { siteData } from "@/data/siteData";

const arrowBase =
  "flex h-4 w-4 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 hover:scale-125";

export default function Categories({ data = siteData.categoriesSection }) {
  const { title = "All Category", items = [] } = data;
  const [offset, setOffset] = useState(0);

  const rotate = (dir) => setOffset((o) => (o + dir + items.length) % items.length);
  const visible = items.map((_, i) => items[(i + offset) % items.length]);

  return (
    <section id="category" aria-labelledby="category-title" className="mt-24 sm:mt-28">
      <Container>
        <div className="flex items-center justify-between">
          <h2 id="category-title" className="text-2xl font-medium tracking-tight sm:text-[28px]">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button aria-label="Previous categories" onClick={() => rotate(-1)} className={`${arrowBase} bg-line text-ink`}>
              <ChevronLeft size={10} strokeWidth={3} />
            </button>
            <button aria-label="Next categories" onClick={() => rotate(1)} className={`${arrowBase} bg-ink text-white`}>
              <ChevronRight size={10} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="mt-6 bg-surface-soft p-3 sm:p-4">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((cat) => (
              <li key={cat.id}>
                <CategoryCard {...cat} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
