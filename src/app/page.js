import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import SpotlightProducts from "@/components/sections/SpotlightProducts";
import { siteData } from "@/data/siteData";

export default function Home() {
  const { hero, categoriesSection, featuredSection, spotlightSection } = siteData;

  return (
    <>
      <Hero data={hero} />
      <Categories data={categoriesSection} />
      <FeaturedProducts data={featuredSection} />
      <SpotlightProducts data={spotlightSection} />
    </>
  );
}
