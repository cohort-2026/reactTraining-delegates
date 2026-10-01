import { useEffect, useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  // Debounce: wait 400 ms after the last keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = query.trim();
      setDebouncedQuery(trimmed);
      setStatus(trimmed ? "loading" : "idle");
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch: runs only when the debounced value changes
  useEffect(() => {
    if (!debouncedQuery) return;
    const controller = new AbortController();

    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}&limit=10`,
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then((data) => {
        setResults(data.products);
        setStatus("success");
      })
      .catch((error) => {
        if (error.name === "AbortError") return; // stale request, ignore
        setStatus("error");
      });

    return () => controller.abort(); // cancel when the query changes or on unmount
  }, [debouncedQuery]);

  return (
    <section className="product-search">
      <h2>Lab 5.1 Product search</h2>
      <input
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {status === "idle" && <p>Type to search.</p>}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p role="alert">Something went wrong. Try again.</p>}
      {status === "success" && results.length === 0 && (
        <p>No products found for "{debouncedQuery}".</p>
      )}
      {status === "success" && results.length > 0 && (
        <ul>
          {results.map((product) => (
            <li key={product.id}>
              {product.title} (${product.price})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProductSearch;