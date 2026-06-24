export default function PriceFilterControls({ sortOrder, setSortOrder, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-sans text-xs text-ink-soft">Ordenar por</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="font-sans text-sm border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        >
          <option value="default">Relevância</option>
          <option value="asc">Menor preço para o maior</option>
          <option value="desc">Maior preço para o menor</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-sans text-xs text-ink-soft">Preço de</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="R$ 0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="font-sans text-sm border border-cream rounded px-3 py-2 w-28 outline-none focus:border-rose bg-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-sans text-xs text-ink-soft">até</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="R$ 999"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="font-sans text-sm border border-cream rounded px-3 py-2 w-28 outline-none focus:border-rose bg-white"
        />
      </div>
    </div>
  );
}
