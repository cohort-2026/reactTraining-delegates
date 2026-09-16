// TODO (Lab 6.1): practice code from an earlier lab that App no longer renders. Leave it out of taskboard-ts.
const rand = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" });

export function formatPrice(price) {
  return rand.format(price);
}
