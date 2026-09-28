const formatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
});

export function formatPrice(price) {
  return formatter.format(price);
}