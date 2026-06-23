# PRD — Doce Essência

## Visão Geral
Loja digital de perfumes árabes, decants, perfumaria de nicho e produtos de corpo & banho. Resolve a falta de uma vitrine online elegante e rápida para um catálogo hoje disperso (WhatsApp/Instagram), centralizando descoberta de produto e levando o cliente à compra com fricção mínima.

## Público-Alvo
- Mulheres e homens, 18–40 anos, interessados em perfumaria árabe/nicho e decants.
- Compradores sensíveis a preço (Pix com desconto, parcelamento) mas que valoram apresentação premium.
- Acesso majoritariamente mobile.

## Escopo do MVP
- Header com navegação por categoria (Femininos, Masculinos, Nicho, Decants, Brand Collection, Corpo & Banho).
- Barra de anúncio com cupom de primeira compra.
- Hero/banner institucional.
- Barra de benefícios (parcelamento, desconto Pix, prazo de entrega, segurança).
- Grade de categorias com navegação visual.
- Seções de produto: "Mais Vendidos" e "Novidades".
- Card de produto: imagem, categoria, nome, preço cheio, preço Pix, parcelamento, badge de desconto/novo, botão de compra.
- Seção institucional "Quem Somos".
- Footer: suporte, contato (WhatsApp, e-mail, localização), redes sociais, formas de pagamento.
- Design responsivo (mobile-first).

## Fora do Escopo (futuro)
- Checkout próprio / carrinho funcional com persistência.
- Autenticação de usuário e área "Minha Conta".
- Busca funcional com indexação.
- Painel administrativo de produtos (CMS).
- Integração de pagamento real (gateway).
- Avaliações de clientes, recomendação por IA, multi-idioma.

## Requisitos Técnicos Iniciais
- **Frontend:** React 19 + Vite.
- **Estilo:** Tailwind CSS v4 (tokens via `@theme`), fontes Google (Cinzel, Montserrat, Dancing Script).
- **Dados:** mock estático em `src/data/` até existir backend/CMS.
- **Deploy alvo:** estático (Vercel/Netlify) — sem necessidade de servidor próprio no MVP.

## Regras de Negócio Cruciais
- Preço Pix é sempre menor ou igual ao preço cheio (desconto fixo configurável por produto).
- Botão "Comprar" no MVP direciona para WhatsApp com mensagem pré-preenchida contendo o nome do produto (não há checkout interno).
- Badges de produto (`OFF`, `NOVO`) são mutuamente exclusivos por card.
- Cupom de primeira compra é exibido apenas uma vez por sessão (sem lógica de validação real no MVP).
