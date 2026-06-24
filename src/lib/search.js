const DIACRITICS_REGEX = new RegExp("[̀-ͯ]", "g");

export function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim();
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// Busca por trecho do nome, ignorando acentos. Se nada bater, procura
// palavras próximas (tolerando pequenos erros de digitação).
export function searchProducts(products, query, limit = 8) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const substringMatches = products.filter((p) =>
    normalizeText(p.name).includes(normalizedQuery)
  );
  if (substringMatches.length) return substringMatches.slice(0, limit);

  const maxDistance = normalizedQuery.length <= 4 ? 1 : 2;
  return products
    .map((p) => {
      const words = normalizeText(p.name).split(/\s+/);
      const distance = Math.min(...words.map((w) => levenshtein(w, normalizedQuery)));
      return { product: p, distance };
    })
    .filter((s) => s.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map((s) => s.product);
}
