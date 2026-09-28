/**
 * Static product data.
 * In a real app this would come from an API — but for now, hardcoded.
 *
 * Each product:
 *   id       — unique string
 *   name     — display name
 *   price    — number (in rands)
 *   image    — URL to product image
 *   category — grouping label
 *   inStock  — boolean
 */
const products = [
  {
    id: "p1",
    name: "Wireless Mouse",
    price: 349,
    image: "https://picsum.photos/seed/p1/400/300",
    category: "electronics",
    inStock: true,
  },
  {
    id: "p2",
    name: "USB-C Charger",
    price: 299,
    image: "https://picsum.photos/seed/p2/400/300",
    category: "electronics",
    inStock: true,
  },
  {
    id: "p3",
    name: "Noise-Cancelling Headphones",
    price: 2499,
    image: "https://picsum.photos/seed/p3/400/300",
    category: "electronics",
    inStock: true,
  },
  {
    id: "p4",
    name: "Learning React",
    price: 520,
    image: "https://picsum.photos/seed/p4/400/300",
    category: "books",
    inStock: true,
  },
  {
    id: "p5",
    name: "A5 Notebook",
    price: 85,
    image: "https://picsum.photos/seed/p5/400/300",
    category: "stationery",
    inStock: false,
  },
  {
    id: "p6",
    name: "Clean Code",
    price: 480,
    image: "https://picsum.photos/seed/p6/400/300",
    category: "books",
    inStock: true,
  },
];

export default products;