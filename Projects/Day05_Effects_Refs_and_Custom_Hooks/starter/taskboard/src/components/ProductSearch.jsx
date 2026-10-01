import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setResults(data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // stale request, ignore
        setError(err.message);
        setLoading(false);
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