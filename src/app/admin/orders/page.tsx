"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import { formatCurrency } from "@/lib/calculations";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-black">Admin Orders</h1>
          <p className="text-zinc-500">Kitchen view for incoming orders.</p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 shadow">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl bg-white p-6 shadow">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{order.orderNumber}</h2>
                    <p>{order.customerName}</p>
                    <p className="text-sm text-zinc-500">{order.phone}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(order.total)}</p>
                    <p className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  {order.items.map((item) => (
                    <p key={item.id}>
                      {item.quantity}x {item.name}
                    </p>
                  ))}
                </div>

                {order.notes && (
                  <p className="mt-3 rounded-xl bg-zinc-100 p-3">
                    Notes: {order.notes}
                  </p>
                )}

                <p className="mt-3 text-sm text-zinc-500">
                  {order.fulfillmentType} •{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}