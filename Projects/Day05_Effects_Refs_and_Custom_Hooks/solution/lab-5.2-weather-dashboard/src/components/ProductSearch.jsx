import { useEffect, useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [result, setResult] = useState({ query: "", products: [], error: null });

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const tooShort = debouncedQuery.trim().length < 2;

  useEffect(() => {
    if (tooShort) return undefined;

    const controller = new AbortController();
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((json) => {
        setResult({ query: debouncedQuery, products: json.products, error: null });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setResult({
            query: debouncedQuery,
            products: [],
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      });

    return () => controller.abort();
  }, [debouncedQuery, tooShort]);

  const loading = !tooShort && result.query !== debouncedQuery;
  let content;
  if (tooShort) content = <p>Type at least 2 characters.</p>;
  else if (loading) content = <p role="status">Searching...</p>;
  else if (result.error) content = <p role="alert">Search failed: {result.error}</p>;
  else if (result.products.length === 0) content = <p>No products found.</p>;
  else {
    content = (
      <ul>
        {result.products.map((product) => (
          <li key={product.id}>{product.title}: ${product.price}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="product-search">
      <label htmlFor="product-search-input">Search products</label>
      <input
        id="product-search-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {content}
    </div>
  );
}

export default ProductSearch;