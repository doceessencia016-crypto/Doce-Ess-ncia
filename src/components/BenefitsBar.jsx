import { CreditCard, QrCode, Truck, ShieldCheck } from "lucide-react";

const BENEFITS = [
  { Icon: CreditCard, title: "Parcele em até 6x", subtitle: "sem juros no cartão" },
  { Icon: QrCode, title: "5% de desconto", subtitle: "no Pix acima de R$200" },
  { Icon: Truck, title: "Envio em 2 a 4 dias úteis", subtitle: "para todo o Brasil" },
  { Icon: ShieldCheck, title: "Compra 100% segura", subtitle: "dados protegidos" },
];

export default function BenefitsBar() {
  return (
    <section className="bg-white border-y border-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map(({ Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon size={26} strokeWidth={1.5} className="text-rose shrink-0" />
            <div>
              <p className="font-sans text-sm font-semibold text-ink">{title}</p>
              <p className="font-sans text-xs text-ink-soft">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
