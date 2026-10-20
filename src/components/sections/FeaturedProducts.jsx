import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { siteData } from "@/data/siteData";

export default function FeaturedProducts({ data = siteData.featuredSection }) {
  const { title, description, products } = data;

  return (
    <section id="shop" aria-labelledby="featured-title" className="mt-24 sm:mt-28">
      <Container>
        <SectionHeading
          id="featured-title"
          title={title}
          description={description}
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
