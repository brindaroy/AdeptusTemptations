"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, MenuItem } from "@/types";
import { formatCurrency } from "@/lib/calculations";

export default function Home() {
  const router = useRouter();

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [addedItem, setAddedItem] = useState("");
  const [customer, setCustomer] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("customer");

    if (!storedUser) {
      router.push("/user-login");
      return;
    }

    setCustomer(JSON.parse(storedUser));

    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));

    const saved = localStorage.getItem("cart");
    if (saved) {
      const cart: CartItem[] = JSON.parse(saved);
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    }
  }, [router]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(menu.map((item) => item.category)))],
    [menu]
  );

  const filteredMenu = menu.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    const saved = localStorage.getItem("cart");
    const cart: CartItem[] = saved ? JSON.parse(saved) : [];

    const existing = cart.find((cartItem) => cartItem.id === item.id);

    const updated = existing
      ? cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [
          ...cart,
          { id: item.id, name: item.name, price: item.price, quantity: 1 },
        ];

    localStorage.setItem("cart", JSON.stringify(updated));
    setCartCount(updated.reduce((sum, c) => sum + c.quantity, 0));

    setAddedItem(item.name);
    setTimeout(() => setAddedItem(""), 1200);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-red-100 animate-bg-move text-zinc-950">
      <section className="mx-auto max-w-7xl px-4 py-6">

        {/* NAV */}
        <nav className="mb-6 flex items-center justify-between">
          <div className="text-2xl font-black animate-neon">
            Adeptus Temptations 🛕
          </div>

          <div className="flex items-center gap-3">
            {customer && (
              <span className="rounded-full bg-white px-4 py-2 font-bold shadow">
                Hi, {customer.name}
              </span>
            )}

            <button
              onClick={() => {
                localStorage.removeItem("customer");
                router.push("/user-login");
              }}
              className="rounded-full bg-red-500 px-4 py-2 font-black text-white hover:bg-red-600"
            >
              Logout
            </button>

            <Link
              href="/cart"
              className="rounded-full bg-zinc-950 px-6 py-3 font-black text-white shadow-xl hover:bg-orange-600"
            >
              Cart ({cartCount})
            </Link>
          </div>
        </nav>

        {/* TOAST */}
        {addedItem && (
          <div className="fixed right-5 top-5 z-50 rounded-2xl bg-zinc-950 px-5 py-4 font-black text-white shadow-2xl animate-toast">
            Added {addedItem} ✅
          </div>
        )}

        {/* 🔥 HERO COVER */}
        <header className="relative mb-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950 p-10 text-white shadow-2xl md:p-16">

          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-orange-500 opacity-30 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500 opacity-20 blur-3xl animate-pulse" />

          <div className="absolute left-10 top-10 text-6xl opacity-20 animate-bounce-soft">🍔</div>
          <div className="absolute right-20 top-16 text-5xl opacity-20 animate-rotate-slow">🍕</div>
          <div className="absolute bottom-10 left-20 text-5xl opacity-20 animate-bounce-soft">🍹</div>

          <div className="relative z-10 max-w-3xl">

            <p className="mb-4 inline-flex rounded-full bg-orange-500/20 px-4 py-2 text-sm font-black text-orange-300 animate-pop">
              🚀 Smart Ordering Experience
            </p>

            <h1 className="text-5xl font-black md:text-7xl animate-neon">
              Order Food Like Never Before
            </h1>

            <p className="mt-5 text-lg text-zinc-300">
              Fast checkout. Live kitchen updates. Smooth UX.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() =>
                  window.scrollTo({ top: 700, behavior: "smooth" })
                }
                className="rounded-2xl bg-orange-600 px-6 py-4 font-black text-white shadow-xl hover:scale-105"
              >
                Browse Menu 🍽️
              </button>

              <Link
                href="/cart"
                className="rounded-2xl bg-white/10 px-6 py-4 font-black text-white hover:bg-white/20"
              >
                View Cart 🛒
              </Link>
            </div>

            <div className="mt-6 flex gap-6 text-sm text-zinc-300">
              <span>🔥 30+ Dishes</span>
              <span>⚡ Fast Checkout</span>
              <span>📦 Live Orders</span>
            </div>

          </div>
        </header>

        {/* MENU */}
        <section>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food..."
            className="mb-5 w-full rounded-2xl border bg-white px-5 py-4 shadow"
          />

          <div className="mb-8 flex gap-3 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-3 font-black ${
                  activeCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMenu.map(item => (
              <article key={item.id} className="glass-card rounded-[2rem] p-4 shadow-xl">
                <img src={item.image} className="h-48 w-full rounded-xl object-cover" />

                <h3 className="mt-3 text-xl font-black">{item.name}</h3>
                <p className="text-sm text-zinc-500">{item.description}</p>

                <p className="mt-2 font-black text-orange-600">
                  {formatCurrency(item.price)}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 w-full rounded-xl bg-zinc-950 py-3 text-white font-black hover:bg-orange-600"
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>

        </section>
      </section>
    </main>
  );
}