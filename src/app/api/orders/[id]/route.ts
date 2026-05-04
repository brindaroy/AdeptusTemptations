import { NextResponse } from "next/server";
import { Order } from "@/types";

let orders: Order[] = [];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  orders = orders.map((order) =>
    order.id === params.id
      ? { ...order, status: body.status }
      : order
  );

  const updatedOrder = orders.find((order) => order.id === params.id);

  if (!updatedOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(updatedOrder);
}