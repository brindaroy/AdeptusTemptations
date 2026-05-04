"use client";

import { useEffect, useState } from "react";
import { CartItem, MenuItem, Order } from "@/types";
import { getTotals, formatCurrency } from "@/lib/calculations";

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");
  const [notes, setNotes] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const { subtotal, tax, total } = getTotals(cart);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    if (!customerName || !phone) return alert("Name and phone are required");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        phone,
        fulfillmentType,
        notes,
        items: cart,
        subtotal,
        tax,
        total,
      }),
    });

    const order = await res.json();

    setConfirmedOrder(order);
    setCart([]);
    setCustomerName("");
    setPhone("");
    setNotes("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 text-zinc-900">
      <section className="mx-auto max-w-7xl px-4 py-6">
        <header className="mb-8 overflow-hidden rounded-[2rem] bg-zinc-950 text-white shadow-2xl animate-[fadeIn_0.7s_ease-out]">
          <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-orange-500/20 px-4 py-2 text-sm font-bold text-orange-300 animate-pop">
                MeowTeam Hackathon MVP
              </p>

              <h1 className="text-5xl font-black leading-tight md:text-7xl">
                Meow Bites
              </h1>

              <p className="mt-4 max-w-xl text-lg text-zinc-300">
                Fast, fresh, and demo-ready restaurant ordering for pickup or delivery.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20">
                  ⚡ 20–30 min ready
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20">
                  🛍️ Pickup & delivery
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20">
                  ⭐ Fresh daily
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-8 text-8xl shadow-inner animate-[float_3s_ease-in-out_infinite]">
              🍕
            </div>
          </div>
        </header>

        {confirmedOrder && (
          <div className="mb-6 rounded-3xl border border-green-200 bg-green-50 p-6 shadow animate-pop">
            <h2 className="text-2xl font-black text-green-800">
              Order Confirmed 🎉
            </h2>
            <p className="mt-2 text-green-900">
              Order number: <b>{confirmedOrder.orderNumber}</b>
            </p>
            <p className="text-green-900">
              Total: <b>{formatCurrency(confirmedOrder.total)}</b>
            </p>
            <p className="text-green-900">Estimated ready time: 20–30 minutes</p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <section className="animate-[fadeUp_0.7s_ease-out]">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-orange-600">
                  Order Online
                </p>
                <h2 className="text-3xl font-black">Popular Menu</h2>
              </div>

              <p className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow">
                {menu.length} items
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {menu.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[1.5rem] bg-white shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl animate-[fadeUp_0.6s_ease-out]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase text-orange-700 shadow transition group-hover:scale-105">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black">{item.name}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
                          {item.description}
                        </p>
                      </div>

                      <p className="whitespace-nowrap rounded-full bg-orange-100 px-3 py-1 font-black text-orange-700">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="mt-5 w-full rounded-2xl bg-zinc-950 px-4 py-3 font-black text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="sticky top-6 h-fit rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-black/5 transition-all duration-300 animate-[slideIn_0.7s_ease-out]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase text-orange-600">
                  Your Order
                </p>
                <h2 className="text-3xl font-black">Cart</h2>
              </div>

              <span className="rounded-full bg-zinc-950 px-3 py-1 text-sm font-black text-white animate-pop">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-3xl bg-zinc-50 p-6 text-center animate-pop">
                <div className="text-5xl">🛒</div>
                <p className="mt-3 font-bold text-zinc-600">
                  Your cart is empty.
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Add something tasty from the menu.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="animate-pop rounded-2xl border border-zinc-100 bg-zinc-50 p-4 transition-all duration-300 hover:bg-orange-50 hover:shadow"
                    >
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="font-black">{item.name}</p>
                          <p className="text-sm text-zinc-500">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-bold text-red-500 transition hover:text-red-700 active:scale-95"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="h-8 w-8 rounded-full bg-white font-black shadow transition hover:scale-110 active:scale-90"
                          >
                            -
                          </button>

                          <span className="w-6 text-center font-black">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="h-8 w-8 rounded-full bg-white font-black shadow transition hover:scale-110 active:scale-90"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-black">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl bg-zinc-950 p-5 text-white">
                  <div className="flex justify-between text-sm text-zinc-300">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm text-zinc-300">
                    <span>Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>

                  <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-xl font-black">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />

                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />

                  <select
                    value={fulfillmentType}
                    onChange={(e) =>
                      setFulfillmentType(e.target.value as "pickup" | "delivery")
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                  </select>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Order notes"
                    className="min-h-24 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    onClick={placeOrder}
                    className="w-full rounded-2xl bg-orange-600 px-4 py-4 text-lg font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl active:scale-95"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}