export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  fulfillmentType: "pickup" | "delivery";
  notes?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "received" | "preparing" | "ready" | "completed";
  createdAt: string;
};