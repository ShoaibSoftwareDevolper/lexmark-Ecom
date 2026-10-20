import Container from "@/components/ui/Container";
import SpotlightProduct from "@/components/ui/SpotlightProduct";
import { siteData } from "@/data/siteData";

export default function SpotlightProducts({ data = siteData.spotlightSection }) {
  const { products = [] } = data;

  return (
    <section id="care" aria-label="Spotlight products" className="my-24 sm:my-28">
      <Container className="flex max-w-[1040px] flex-col gap-16 sm:gap-20">
        {products.map((p, i) => (
          <SpotlightProduct key={p.id} {...p} reverse={i % 2 === 1} />
        ))}
      </Container>
    </section>
  );
}
