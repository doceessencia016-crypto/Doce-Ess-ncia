import Eyebrow from "./Eyebrow";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="relative bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12 grid lg:grid-cols-2 items-center gap-8">
        <div className="text-center order-2 lg:order-1">
          <Eyebrow>Sua história contada em notas olfativas</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ink leading-tight">
            Encontre a fragrância que <span className="text-rose">define</span> a sua presença
          </h1>
          <p className="font-sans text-ink-soft mt-5 max-w-lg mx-auto">
            Explore o melhor da perfumaria internacional: dos misteriosos perfumes árabes aos práticos decants e frascos inteiros. Para completar o seu cuidado, uma curadoria especial de maquiagens e produtos para cabelo.
          </p>
          <p className="font-sans text-ink-soft mt-3 max-w-lg mx-auto">
            Entrega rápida e segura para todo o Brasil.
          </p>
        </div>
        <div className="order-1 lg:order-2 flex justify-center">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
