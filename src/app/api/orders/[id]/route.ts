import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/types";

let orders: Order[] = [];

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  orders = orders.map((order) =>
    order.id === id
      ? { ...order, status: body.status }
      : order
  );

  const updatedOrder = orders.find((order) => order.id === id);

  if (!updatedOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(updatedOrder);
}