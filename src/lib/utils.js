export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function parsePrice(price) {
  return Number.parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
}

export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}
