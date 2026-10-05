import techProducts from "./techProducts.ts";
import type { Product } from "../types";

/**
 * Search the local tech dataset by name, brand, or category.
 */
export async function searchTechProducts(
  query: string,
  signal?: AbortSignal
): Promise<{ products: Product[] }> {
  await new Promise<void>((resolve, reject) => {
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