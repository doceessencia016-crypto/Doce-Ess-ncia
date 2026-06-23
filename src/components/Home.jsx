import Hero from "./Hero";
import BenefitsBar from "./BenefitsBar";
import DecantSection from "./DecantSection";
import ProductSection from "./ProductSection";
import { bestSellers, newArrivals } from "../data/products";

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitsBar />
      <DecantSection />
      <ProductSection title="Mais Vendidos" subtitle="os favoritos" products={bestSellers} />
      <ProductSection title="Novidades" subtitle="recém-chegados" products={newArrivals} />
    </>
  );
}
