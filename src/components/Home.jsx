import { useEffect, useState } from "react";
import Hero from "./Hero";
import BenefitsBar from "./BenefitsBar";
import DecantSection from "./DecantSection";
import ProductSection from "./ProductSection";
import { fetchBestSellers, fetchNewArrivals } from "../lib/products";

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    fetchBestSellers().then(setBestSellers);
    fetchNewArrivals().then(setNewArrivals);
  }, []);

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
