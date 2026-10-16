import { memo } from 'react';

function ProductList({ products, selectedId, onSelect }) {
  console.log('ProductList rendered');
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <button onClick={() => onSelect(p.id)} aria-pressed={selectedId === p.id}
            style={{ fontWeight: selectedId === p.id ? 'bold' : 'normal' }}>
            {p.name}
          </button>{' '}
          {p.category} — ${p.price}
        </li>
      ))}
    </ul>
  );
}

export default memo(ProductList);