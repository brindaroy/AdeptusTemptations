import { CartItem } from "@/types";

export function getTotals(cart: CartItem[]) {
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    total,
  };
}

// ✅ safer + more robust
export function formatCurrency(value?: number) {
  const safeValue = Number(value ?? 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(safeValue);
}