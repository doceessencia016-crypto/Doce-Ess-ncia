export const bestSellers = [
  {
    id: 1,
    name: "Eau de Parfum Âmbar Místico",
    category: "Perfumes de Nicho",
    discount: "15% OFF",
    sold: "+150 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=%C3%82mbar+M%C3%adstico",
    description:
      "Âmbar Místico é uma fragrância envolvente e marcante, com abertura especiada e fundo amadeirado adocicado. No coração, notas de âmbar e baunilha trazem profundidade e sensualidade. Ideal para quem busca uma presença olfativa intensa e duradoura.",
    sizes: [
      { label: "5ml", price: 89.9, installments: "2x de R$ 44,95" },
      { label: "10ml", price: 149.9, installments: "3x de R$ 49,97" },
    ],
  },
  {
    id: 2,
    name: "Perfume Importado Rosé Noir",
    category: "Perfumes Importados",
    discount: null,
    sold: "+90 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=Ros%C3%A9+Noir",
    description:
      "Rosé Noir combina notas florais de rosa com um fundo amadeirado escuro, criando um contraste elegante entre delicadeza e intensidade. Perfeito para o dia a dia e ocasiões especiais.",
    sizes: [
      { label: "5ml", price: 69.9, installments: "2x de R$ 34,95" },
      { label: "10ml", price: 119.9, installments: "3x de R$ 39,97" },
    ],
  },
  {
    id: 3,
    name: "Oud Imperial",
    category: "Perfumes Árabes",
    discount: "10% OFF",
    sold: "+200 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=Oud+Imperial",
    description:
      "Oud Imperial é uma fragrância árabe clássica, com madeira de oud autêntica, especiarias quentes e um toque adocicado de âmbar. Fixação prolongada e projeção marcante.",
    sizes: [
      { label: "5ml", price: 59.9, installments: "2x de R$ 29,95" },
      { label: "10ml", price: 99.9, installments: "3x de R$ 33,30" },
    ],
  },
  {
    id: 4,
    name: "Paleta de Sombras Kiko Milano",
    category: "Kiko Milano",
    discount: null,
    sold: "+60 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=Kiko+Milano",
    description:
      "Paleta de sombras com pigmentação intensa e alta durabilidade, cores versáteis para looks do dia a dia ou produções mais elaboradas.",
    sizes: [{ label: "Único", price: 119.9, installments: "3x de R$ 39,97" }],
  },
];

export const newArrivals = [
  {
    id: 5,
    name: "Body Spray Victoria Bloom",
    category: "Victoria's Secret",
    discount: "NOVO",
    sold: "+40 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=Victoria+Bloom",
    description:
      "Body spray com fragrância floral leve e refrescante, perfeito para uso diário. Hidrata e perfuma a pele com toque sutil e duradouro.",
    sizes: [{ label: "Único", price: 79.9, installments: "2x de R$ 39,95" }],
  },
  {
    id: 6,
    name: "Body Cream Vanilla Bean",
    category: "Bath & Body Works",
    discount: "NOVO",
    sold: "+35 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=Vanilla+Bean",
    description:
      "Hidratante corporal com textura cremosa e aroma quentinho de baunilha. Deixa a pele macia, perfumada e visivelmente hidratada por horas.",
    sizes: [{ label: "Único", price: 99.9, installments: "2x de R$ 49,95" }],
  },
  {
    id: 7,
    name: "Máscara de Hidratação Capilar",
    category: "Produtos de Cabelo",
    discount: null,
    sold: "+70 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=Hidrata%C3%A7%C3%A3o",
    description:
      "Máscara de hidratação profunda que repõe nutrientes, reduz o frizz e devolve o brilho natural aos fios, deixando o cabelo macio e sedoso.",
    sizes: [{ label: "Único", price: 69.9, installments: "2x de R$ 34,95" }],
  },
  {
    id: 8,
    name: "Decant Rosé Privée",
    category: "Perfumes Árabes",
    discount: "NOVO",
    sold: "+110 vendidos",
    image: "https://placehold.co/400x500/f5e3d9/181818?text=Ros%C3%A9+Priv%C3%A9e",
    description:
      "Decant de Rosé Privée, uma fragrância floral amadeirada sofisticada, com notas de rosa, almíscar e um fundo quente e envolvente.",
    sizes: [
      { label: "5ml", price: 54.9, installments: "2x de R$ 27,45" },
      { label: "10ml", price: 89.9, installments: "3x de R$ 29,97" },
    ],
  },
];

export const allProducts = [...bestSellers, ...newArrivals];

export function getProductById(id) {
  return allProducts.find((p) => String(p.id) === String(id));
}

export function getSimilarProducts(product, limit = 5) {
  const sameCategory = allProducts.filter((p) => p.id !== product.id && p.category === product.category);
  const others = allProducts.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export const categories = [
  { id: 1, name: "Perfumes de Nicho", image: "https://placehold.co/300x300/ae396a/ffffff?text=Nicho" },
  { id: 2, name: "Perfumes Importados", image: "https://placehold.co/300x300/cf8682/ffffff?text=Importados" },
  { id: 3, name: "Perfumes Árabes", image: "https://placehold.co/300x300/dc8f38/ffffff?text=%C3%81rabes" },
  { id: 4, name: "Kiko Milano", image: "https://placehold.co/300x300/181818/ffffff?text=Kiko+Milano" },
  { id: 5, name: "Victoria's Secret", image: "https://placehold.co/300x300/181818/ffffff?text=Victoria%27s+Secret" },
  { id: 6, name: "Bath & Body Works", image: "https://placehold.co/300x300/4bb98c/ffffff?text=Bath+%26+Body" },
  { id: 7, name: "Produtos de Cabelo", image: "https://placehold.co/300x300/dd7774/ffffff?text=Cabelo" },
];
