import { useState, useEffect } from 'react';

function ProductSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [result, setResult] = useState({ query: '', products: [], error: false });

  // Debounce: wait 400 ms after the last keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch: runs only when the debounced value changes
  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const controller = new AbortController();

    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) =>
        setResult({ query: debouncedQuery, products: data.products, error: false })
      )
      .catch((err) => {
        if (err.name === 'AbortError') return; // stale request, ignore
        setResult({ query: debouncedQuery, products: [], error: true });
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  const hasQuery = debouncedQuery.trim() !== '';
  const loading = hasQuery && result.query !== debouncedQuery;
  const finished = hasQuery && !loading;

  return (
    <section>
      <h2>Product Search</h2>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />

      {loading && <p>Loading...</p>}
      {finished && result.error && <p>Something went wrong. Try again.</p>}
      {finished && !result.error && result.products.length === 0 && (
        <p>No products found.</p>
      )}
      {finished && !result.error && result.products.length > 0 && (
        <ul>
          {result.products.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProductSearch;