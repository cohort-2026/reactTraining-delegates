import { useEffect, useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Wait 400ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    // Cancel the timer if the user types again
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // Fetch products when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setProducts([]);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function searchProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedQuery}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        // Don't show an error when we intentionally cancel a request
        if (error.name !== "AbortError") {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    searchProducts();

    // Cancel the previous request when the search changes
    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div>
      <h2>Product Search</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {query.length === 1 && <p>Type at least 2 characters.</p>}

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        debouncedQuery.length >= 2 &&
        products.length === 0 && <p>No products found.</p>}

      {!loading && products.length > 0 && (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;