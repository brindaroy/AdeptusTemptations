import { CartItem } from "@/types";

export function getTotals(cart: CartItem[]) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
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

export function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}