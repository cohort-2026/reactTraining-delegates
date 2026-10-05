import techProducts from "./techProducts.js";

/**
 * Search the local tech dataset by name, brand, or category.
 *
 * @param {string} query
 * @param {AbortSignal} signal
 * @returns {Promise<{ products: Array }>}
 */
export async function searchTechProducts(query, signal) {
  // Small artificial delay so the "Searching…" state is visible.
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, 200);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

  const q = query.trim().toLowerCase();

  const products = q
    ? techProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : techProducts;

  return { products };
}