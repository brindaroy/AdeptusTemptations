"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Order } from "@/types";
import { formatCurrency } from "@/lib/calculations";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      router.push("/login");
      return;
    }

    loadOrders();
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950 p-6 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between rounded-[2rem] bg-white/10 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur animate-pop">
          <div>
            <p className="text-sm font-black uppercase text-orange-300">
              Kitchen Dashboard
            </p>
            <h1 className="text-4xl font-black">Admin Orders</h1>
            <p className="text-zinc-300">Live restaurant order queue.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadOrders}
              className="rounded-2xl bg-orange-600 px-5 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-orange-700"
            >
              Refresh
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("adminLoggedIn");
                router.push("/login");
              }}
              className="rounded-2xl bg-red-600 px-5 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[2rem] bg-white/10 p-10 text-center shadow-2xl animate-pop">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[2rem] bg-white/10 p-10 text-center shadow-2xl animate-pop">
            <div className="text-6xl">🍽️</div>
            <h2 className="mt-4 text-2xl font-black">No orders yet</h2>
            <p className="mt-2 text-zinc-300">
              New orders will show here after checkout.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-[2rem] bg-white p-6 text-zinc-950 shadow-2xl transition hover:-translate-y-1 animate-card"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase text-orange-600">
                      {order.fulfillmentType}
                    </p>
                    <h2 className="text-2xl font-black">
                      {order.orderNumber}
                    </h2>
                    <p className="mt-1 font-bold">{order.customerName}</p>
                    <p className="text-sm text-zinc-500">{order.phone}</p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-2xl font-black">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="mt-2 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-black text-orange-700">
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-zinc-100 p-4">
                  <p className="mb-2 font-black">Items</p>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm font-semibold"
                      >
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notes && (
                  <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm font-semibold text-orange-900">
                    Notes: {order.notes}
                  </p>
                )}

                <p className="mt-4 text-sm text-zinc-500">
                  Ordered at {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}