const rand = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" });

export function formatPrice(price) {
  return rand.format(price);
}
