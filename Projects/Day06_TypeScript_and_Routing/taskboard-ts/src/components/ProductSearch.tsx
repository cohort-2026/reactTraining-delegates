import { useEffect, useRef, useState } from "react";
import { searchTechProducts } from "../data/searchTech.ts";
import type { Product } from "../types.ts";

type Status = "idle" | "loading" | "success" | "error";

function getQueryFromURL(): string {
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

function ProductSearch() {
  const [query, setQuery] = useState(getQueryFromURL());
  const [results, setResults] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    const urlTimer = setTimeout(() => {
      const url = new URL(window.location.href);
      if (trimmed === "") {
        url.searchParams.delete("q");
      } else {
        url.searchParams.set("q", trimmed);
      }
      window.history.replaceState({}, "", url);
    }, 400);

    if (trimmed === "") {
      setStatus("idle");
      setResults([]);
      setError("");
      return () => clearTimeout(urlTimer);
    }

    const fetchTimer = setTimeout(async () => {
      if (controllerRef.current) controllerRef.current.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setStatus("loading");
      setError("");

      try {
        const data = await searchTechProducts(trimmed, controller.signal);
        setResults(data.products);
        setStatus("success");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus("error");
      }
    }, 400);

    return () => {
      clearTimeout(urlTimer);
      clearTimeout(fetchTimer);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [query]);

  useEffect(() => {
    function onPopState() {
      setQuery(getQueryFromURL());
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <section className="mx-auto mt-12 max-w-4xl px-6">
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Lab 5.1
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Tech component search
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Type to search. Your query is saved in the URL.
        </p>
      </header>

      <input
        type="text"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Search CPUs, GPUs, RAM, brands…"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/20"
      />

      <div className="mt-6">
        {status === "idle" && (
          <p className="text-sm text-gray-500">Start typing to search.</p>
        )}
        {status === "loading" && (
          <p className="text-sm text-gray-500">Searching…</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Error: {error}</p>
        )}
        {status === "success" && results.length === 0 && (
          <p className="text-sm text-gray-500">
            No products match "{query.trim()}".
          </p>
        )}
        {status === "success" && results.length > 0 && (
          <ul className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
            {results.map((product) => (
              <li
                key={product.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.brand} · {product.category}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-gray-900">
                  R{product.price.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ProductSearch;