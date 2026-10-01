import { useEffect, useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setProducts([]);
      setError("");
      setLoading(false);
      return;
    }

    setError("");
    setLoading(true);
    setProducts([]);

    const controller = new AbortController();

    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(
        debouncedQuery,
      )}`,
      {
        signal: controller.signal,
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed");
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError("Something went wrong. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div>
      <h2>Product Search</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />

      <div>
        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {!error && products.length === 0 && debouncedQuery.length >= 2 && (
          <p>No products found.</p>
        )}

        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSearch;
