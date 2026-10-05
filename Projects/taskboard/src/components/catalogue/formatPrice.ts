const rand = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" });

export function formatPrice(price: number): string{
  return rand.format(price);
}
