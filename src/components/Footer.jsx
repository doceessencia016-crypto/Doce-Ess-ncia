import { useState } from "react";
import TradePolicyModal from "./TradePolicyModal";
import { useLogo } from "../context/LogoContext";
import { STORE_WHATSAPP_NUMBER } from "../lib/constants";

const WHATSAPP_MESSAGE = "Olá! 😊 Vim do site da Doce Essência e gostaria de saber mais.";
const WHATSAPP_LINK = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const INSTAGRAM_LINK = "https://www.instagram.com/doce_essencia_poly";

const DEV_NUMBER = "5516996052610";
const DEV_MESSAGE = "Olá! Vim através do site da Doce Essência e gostaria de um orçamento para um site profissional.";
const DEV_LINK = `https://wa.me/${DEV_NUMBER}?text=${encodeURIComponent(DEV_MESSAGE)}`;

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const { logoUrl } = useLogo();
  const [policyOpen, setPolicyOpen] = useState(false);

  return (
    <footer className="bg-cream/40 border-t border-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
        <div>
          <a href="#" className="inline-block">
            <img src={logoUrl} alt="Doce Essência" className="h-24 w-auto" />
          </a>
          <p className="font-sans text-sm text-ink-soft mt-3">
            Fragrâncias importadas, árabes, decants ou frascos inteiros, e produtos de cabelo e maquiagens selecionadas.
          </p>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 mt-4 group"
          >
            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-ink group-hover:bg-rose group-hover:text-white transition-colors shrink-0">
              <InstagramIcon />
            </span>
            <span className="font-sans text-sm text-ink-soft group-hover:text-rose transition-colors">
              Conheça e siga nosso Instagram
            </span>
          </a>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-ink mb-4">Suporte</h3>
          <ul className="space-y-2 font-sans text-sm text-ink-soft">
            <li>
              <button onClick={() => setPolicyOpen(true)} className="hover:text-rose transition-colors text-left">
                Trocas e Devoluções
              </button>
            </li>
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-rose transition-colors">
                Entre em Contato
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-ink mb-4">Contato</h3>
          <ul className="space-y-2 font-sans text-sm text-ink-soft">
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-rose transition-colors">
                WhatsApp: (16) 98219-0044
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="hover:text-rose transition-colors">
                Instagram: @doce_essencia_poly
              </a>
            </li>
            <li>São Carlos - SP</li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-ink mb-4">Pagamento</h3>
          <div className="flex flex-wrap gap-3">
            {["Pix", "Cartão"].map((p) => (
              <span key={p} className="font-sans text-xs text-ink-soft">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream py-4 text-center font-sans text-xs text-ink-soft">
        <a href={DEV_LINK} target="_blank" rel="noreferrer" className="hover:text-rose transition-colors">
          Feito por Ana Lívia Brandelli
        </a>
      </div>

      {policyOpen && <TradePolicyModal onClose={() => setPolicyOpen(false)} />}
    </footer>
  );
}
