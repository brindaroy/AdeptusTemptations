"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CartItem, Order } from "@/types";
import { formatCurrency, getTotals } from "@/lib/calculations";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");
  const [notes, setNotes] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const saveCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQuantity = (id: string) => {
    saveCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id: string) => {
    saveCart(
      cart
        .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const { subtotal, tax, total } = getTotals(cart);

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    if (!customerName || !phone) return alert("Name and phone are required");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, phone, fulfillmentType, notes, items: cart, subtotal, tax, total }),
    });

    const order = await res.json();

    setConfirmedOrder(order);
    saveCart([]);
    setCustomerName("");
    setPhone("");
    setNotes("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center justify-between animate-[fadeIn_0.6s_ease-out]">
          <Link href="/" className="rounded-full bg-white/10 px-5 py-3 font-black transition hover:bg-white/20">
            ← Back to Menu
          </Link>

          <h1 className="text-3xl font-black">Your Cart</h1>
        </nav>

        {confirmedOrder && (
          <div className="mb-6 rounded-[2rem] border border-green-400/30 bg-green-400/10 p-6 shadow-2xl animate-pop">
            <h2 className="text-3xl font-black text-green-300">Order Confirmed 🎉</h2>
            <p className="mt-2">Order number: <b>{confirmedOrder.orderNumber}</b></p>
            <p>Total: <b>{formatCurrency(confirmedOrder.total)}</b></p>
            <p>Estimated ready time: 20–30 minutes</p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="rounded-[2rem] bg-white/10 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur animate-[fadeUp_0.7s_ease-out]">
            <h2 className="mb-5 text-2xl font-black">Order Items</h2>

            {cart.length === 0 ? (
              <div className="rounded-[2rem] bg-white/10 p-10 text-center animate-pop">
                <div className="text-6xl">🛒</div>
                <p className="mt-4 text-xl font-black">Your cart is empty</p>
                <Link href="/" className="mt-5 inline-block rounded-full bg-orange-600 px-6 py-3 font-black transition hover:bg-orange-700">
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="animate-pop rounded-[1.5rem] bg-white p-5 text-zinc-950 shadow-xl transition hover:-translate-y-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black">{item.name}</h3>
                        <p className="text-sm text-zinc-500">{formatCurrency(item.price)} each</p>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="font-bold text-red-500 transition hover:scale-105">
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => decreaseQuantity(item.id)} className="h-10 w-10 rounded-full bg-zinc-100 font-black transition hover:scale-110">-</button>
                        <span className="text-lg font-black">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="h-10 w-10 rounded-full bg-zinc-100 font-black transition hover:scale-110">+</button>
                      </div>

                      <p className="text-lg font-black">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-[2rem] bg-white p-6 text-zinc-950 shadow-2xl animate-[slideIn_0.7s_ease-out]">
            <h2 className="text-3xl font-black">Checkout</h2>

            <div className="mt-5 rounded-[1.5rem] bg-zinc-950 p-5 text-white">
              <div className="flex justify-between text-zinc-300">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="mt-2 flex justify-between text-zinc-300">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-2xl font-black">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your name" className="w-full rounded-2xl border p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full rounded-2xl border p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />

              <select value={fulfillmentType} onChange={(e) => setFulfillmentType(e.target.value as "pickup" | "delivery")} className="w-full rounded-2xl border p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100">
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>

              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Order notes" className="min-h-28 w-full rounded-2xl border p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />

              <button onClick={placeOrder} className="w-full rounded-2xl bg-orange-600 px-4 py-4 text-lg font-black text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-orange-700 active:scale-95">
                Place Order
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}