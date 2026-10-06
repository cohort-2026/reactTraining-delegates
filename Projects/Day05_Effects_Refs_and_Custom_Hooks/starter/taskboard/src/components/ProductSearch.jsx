import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState({
    query: "",
    results: [],
    error: null,
  });
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 400);
  const hasQuery = Boolean(debouncedQuery.trim());
  const resultIsCurrent = searchResult.query === debouncedQuery;
  const results = resultIsCurrent ? searchResult.results : [];
  const error = resultIsCurrent ? searchResult.error : null;
  const loading = hasQuery && !resultIsCurrent;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const controller = new AbortController();

    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSearchResult({
          query: debouncedQuery,
          results: data.products,
          error: null,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // stale request, ignore
        setSearchResult({ query: debouncedQuery, results: [], error: err.message });
      });

    return () => controller.abort(); // cancel the previous request
  }, [debouncedQuery]);

  return (
    <section>
      <h2>Product Search</h2>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {loading && <p>Loading...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {!loading && !error && debouncedQuery && results.length === 0 && (
        <p>No products found.</p>
      )}
      <ul>
        {results.map((p) => (
          <li key={p.id}>
            {p.title} (${p.price})
          </li>
        ))}
      </ul>
    </section>
  );
}