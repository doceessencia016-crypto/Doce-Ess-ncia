import Eyebrow from "./Eyebrow";

const REASONS = [
  {
    title: "100% Originais",
    text: "A Doce Essência trabalha apenas com produtos originais. Garantimos a mesma fixação, projeção e qualidade de fábrica.",
  },
  {
    title: "Economia",
    text: "Conheça os melhores perfumes do mundo gastando muito menos.",
  },
  {
    title: "Praticidade",
    text: "O tamanho ideal para levar na bolsa, no carro ou em viagens.",
  },
];

export default function DecantSection() {
  return (
    <section className="bg-cream/40 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Eyebrow>Experiências olfativas em tamanhos especiais: 5ml e 10ml</Eyebrow>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">O que é Decant?</h2>

        <p className="font-sans text-ink-soft mt-5 max-w-3xl mx-auto">
          Um <strong className="text-ink">decant</strong> é uma fração do perfume importado
          original, retirada do frasco maior e transferida para frascos menores.
        </p>
        <p className="font-sans text-ink-soft mt-3 max-w-3xl mx-auto">
          É a oportunidade perfeita para você experimentar fragrâncias de luxo antes de investir
          em um frasco grande!
        </p>

        <h3 className="font-serif text-xl sm:text-2xl font-light text-ink leading-tight mt-12 mb-6">
          Por que comprar na Doce Essência?
        </h3>

        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {REASONS.map((r) => (
            <div key={r.title} className="bg-white rounded-2xl p-5 border border-cream">
              <p className="font-sans text-sm font-semibold text-rose-dark">{r.title}</p>
              <p className="font-sans text-sm text-ink-soft mt-2">{r.text}</p>
            </div>
          ))}
        </div>

        <p className="font-sans text-base font-semibold text-rose-dark mt-12">
          Qual será a sua próxima experiência olfativa? Escolha o seu tamanho e experimente!
        </p>
      </div>
    </section>
  );
}
