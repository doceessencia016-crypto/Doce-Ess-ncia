import { useEffect, useState } from "react";
import { fetchHeroImages } from "../lib/heroImages";
import ImageCarousel from "./ImageCarousel";

export default function HeroCarousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchHeroImages().then((data) => setImages(data.map((img) => img.image_url)));
  }, []);

  return (
    <ImageCarousel
      images={images}
      alt="Doce Essência"
      imgClassName="rounded-2xl shadow-xl aspect-[3/4] h-[50vh] sm:h-[58vh] lg:h-[68vh] w-auto object-cover"
      showDots
    />
  );
}
