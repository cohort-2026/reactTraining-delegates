// TODO (Lab 6.1): practice code from an earlier lab that App no longer renders. Leave it out of taskboard-ts.
import { useEffect, useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [result, setResult] = useState({ query: "", products: [], error: null });

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(id);
  }, [query]);

  const tooShort = debouncedQuery.trim().length < 2;

  useEffect(() => {
    if (tooShort) return;
    const controller = new AbortController();
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`;
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) =>
        setResult({ query: debouncedQuery, products: json.products, error: null })
      )
      .catch((err) => {
        if (err.name !== "AbortError") {
          setResult({ query: debouncedQuery, products: [], error: err.message });
        }
      });
    return () => controller.abort();
  }, [debouncedQuery, tooShort]);

  const loading = !tooShort && result.query !== debouncedQuery;

  let content;
  if (tooShort) content = <p>Type at least 2 characters.</p>;
  else if (loading) content = <p>Searching...</p>;
  else if (result.error) content = <p role="alert">Search failed: {result.error}</p>;
  else if (result.products.length === 0) content = <p>No products found.</p>;
  else
    content = (
      <ul>
        {result.products.map((p) => (
          <li key={p.id}>{p.title}: ${p.price}</li>
        ))}
      </ul>
    );

  return (
    <section>
      <label htmlFor="search">Search products</label>
      <input id="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      {content}
    </section>
  );
}

export default ProductSearch;
