import ProductCard from "./ProductCard";
import Eyebrow from "./Eyebrow";

export default function ProductSection({ title, subtitle, products }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <Eyebrow>{subtitle}</Eyebrow>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
