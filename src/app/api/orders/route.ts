import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function mapOrder(data: any) {
  return {
    id: data.id,
    orderNumber: data.order_number,
    customerName: data.customer_name,
    phone: data.phone,
    fulfillmentType: data.fulfillment_type,
    notes: data.notes,
    items: data.items,
    subtotal: Number(data.subtotal),
    tax: Number(data.tax),
    total: Number(data.total),
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data || []).map(mapOrder));
}

export async function POST(request: Request) {
  const body = await request.json();

  const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: body.customerName,
      phone: body.phone,
      fulfillment_type: body.fulfillmentType,
      notes: body.notes || "",
      items: body.items,
      subtotal: body.subtotal,
      tax: body.tax,
      total: body.total,
      status: "received",
    })
    .select()
    .single();

  if (error) {
    console.error("SUPABASE ORDER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(mapOrder(data), { status: 201 });
}