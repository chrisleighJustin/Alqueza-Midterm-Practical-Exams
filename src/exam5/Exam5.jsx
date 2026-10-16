import { useCallback, useEffect, useMemo, useState } from 'react';
import ProductList from './ProductList';
import { CATEGORIES, PRODUCTS } from './data';

export default function Exam5() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedId, setSelectedId] = useState(null);
  const [counter, setCounter] = useState(0); // unrelated state

  const visibleProducts = useMemo(() => {
    console.log('Filtering and sorting...');
    const q = query.trim().toLowerCase();
    return PRODUCTS
      .filter((p) => (category === 'All' || p.category === category) &&
                     p.name.toLowerCase().includes(q))
      .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
  }, [query, category, sortOrder]);

  const handleSelect = useCallback(
    (id) => setSelectedId(selectedId === id ? null : id),
    [selectedId]
  );

  // Side effect lives in useEffect, not useMemo
  useEffect(() => {
    console.log('analytics: results viewed', { query, category, sortOrder, count: visibleProducts.length });
  }, [query, category, sortOrder, visibleProducts.length]);

  return (
    <main>
      <h1>Product Explorer</h1>
      <button onClick={() => setCounter((c) => c + 1)}>Unrelated counter: {counter}</button>
      <div>
        <input placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>
      <p>{visibleProducts.length} products. Selected: {selectedId ?? 'none'}</p>
      <ProductList products={visibleProducts} selectedId={selectedId} onSelect={handleSelect} />
    </main>
  );
}