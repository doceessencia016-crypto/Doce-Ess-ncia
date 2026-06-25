import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { STORE_WHATSAPP_NUMBER, PIX_DISCOUNT_RATE, PIX_DISCOUNT_MIN_ORDER } from "../lib/constants";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const EMPTY_FORM = {
  nome: "",
  whatsapp: "",
  cpf: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const qualifiesForPixDiscount = subtotal >= PIX_DISCOUNT_MIN_ORDER;
  const discount = qualifiesForPixDiscount ? subtotal * PIX_DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const required = ["nome", "whatsapp", "cpf", "cep", "rua", "numero", "bairro", "cidade", "estado"];
    const newErrors = {};
    required.forEach((field) => {
      if (!form[field].trim()) newErrors[field] = "Campo obrigatório";
    });
    if (!accepted) newErrors.accepted = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    const lines = items.map(
      (i) => `• ${i.quantity}x ${i.name} (${i.sizeLabel}) — R$ ${formatPrice(i.price * i.quantity)}`
    );

    const message = [
      "Olá! Gostaria de finalizar este pedido feito no site da Doce Essência:",
      "",
      ...lines,
      "",
      `Subtotal: R$ ${formatPrice(subtotal)}`,
      qualifiesForPixDiscount
        ? `Desconto Pix (5%): -R$ ${formatPrice(discount)}`
        : "Sem desconto Pix (pedido abaixo de R$200)",
      `Total: R$ ${formatPrice(total)}`,
      "+ valor do frete a combinar",
      "",
      "Dados para entrega:",
      `Nome: ${form.nome}`,
      `WhatsApp: ${form.whatsapp}`,
      `CPF: ${form.cpf}`,
      `Endereço: ${form.rua}, ${form.numero}${form.complemento ? " - " + form.complemento : ""}`,
      `Bairro: ${form.bairro}`,
      `Cidade/UF: ${form.cidade} - ${form.estado}`,
      `CEP: ${form.cep}`,
      "",
      "Estou de acordo que o valor do frete será adicionado ao valor do pedido.",
    ].join("\n");

    const link = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank");
    clearCart();
    navigate("/");
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="font-sans text-ink-soft">Seu carrinho está vazio.</p>
        <Link to="/" className="font-sans text-rose-dark underline mt-4 inline-block">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl font-light text-ink mb-8 text-center">Carrinho</h1>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.lineId} className="flex gap-4 border border-cream rounded-2xl p-4">
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl shrink-0" />
                <div className="flex-1 text-left">
                  <p className="font-sans text-sm font-semibold text-ink">{item.name}</p>
                  <p className="font-sans text-xs text-ink-soft">{item.sizeLabel}</p>
                  <p className="font-sans text-sm font-bold text-ink mt-1">R$ {formatPrice(item.price)}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-cream rounded-full">
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        aria-label="Diminuir"
                        className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-rose"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center font-sans text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        aria-label="Aumentar"
                        className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-rose"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.lineId)}
                      aria-label="Remover"
                      className="text-ink-soft hover:text-rose transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-cream pt-4 space-y-1 text-right">
            <p className="font-sans text-sm text-ink-soft">Subtotal: R$ {formatPrice(subtotal)}</p>
            {qualifiesForPixDiscount ? (
              <p className="font-sans text-sm text-mint">Desconto Pix (5%): -R$ {formatPrice(discount)}</p>
            ) : (
              <p className="font-sans text-xs text-ink-soft">
                Faltam R$ {formatPrice(PIX_DISCOUNT_MIN_ORDER - subtotal)} para 5% de desconto no Pix
              </p>
            )}
            <p className="font-sans text-lg font-bold text-ink">Total: R$ {formatPrice(total)}</p>
            <p className="font-sans text-xs text-ink-soft">+ frete a combinar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border border-cream rounded-2xl p-6 text-left h-fit">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wide text-ink mb-4">
            Dados para entrega
          </h2>

          <div className="space-y-3">
            <Field label="Nome completo" field="nome" form={form} errors={errors} onChange={handleChange} />
            <Field label="WhatsApp" field="whatsapp" form={form} errors={errors} onChange={handleChange} type="tel" />
            <Field label="CPF" field="cpf" form={form} errors={errors} onChange={handleChange} />
            <Field label="CEP" field="cep" form={form} errors={errors} onChange={handleChange} />
            <Field label="Rua" field="rua" form={form} errors={errors} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Número" field="numero" form={form} errors={errors} onChange={handleChange} />
              <Field label="Complemento" field="complemento" form={form} errors={errors} onChange={handleChange} optional />
            </div>
            <Field label="Bairro" field="bairro" form={form} errors={errors} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Cidade" field="cidade" form={form} errors={errors} onChange={handleChange} />
              <Field label="Estado" field="estado" form={form} errors={errors} onChange={handleChange} />
            </div>
          </div>

          <label className="flex items-start gap-2 mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5"
            />
            <span className="font-sans text-xs text-ink-soft">
              Estou de acordo que, além do valor do pedido, será adicionado o valor do frete para envio.
            </span>
          </label>
          {errors.accepted && (
            <p className="font-sans text-xs text-rose-dark mt-1">É necessário aceitar para continuar.</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full bg-rose text-white font-sans text-sm uppercase tracking-wide py-3 rounded-full hover:bg-rose-dark transition-colors"
          >
            Finalizar pedido pelo WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, field, form, errors, onChange, optional, type = "text" }) {
  return (
    <div>
      <label className="font-sans text-xs text-ink-soft block mb-1">
        {label} {optional && <span className="text-ink-soft/60">(opcional)</span>}
      </label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => onChange(field, e.target.value)}
        className={`w-full font-sans text-sm border rounded-lg px-3 py-2 outline-none focus:border-rose transition-colors ${
          errors[field] ? "border-rose" : "border-cream"
        }`}
      />
    </div>
  );
}
