import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "pizza",
      name: "Margherita Pizza",
      description: "Tomato sauce, mozzarella, basil.",
      category: "Pizza",
      price: 12.99,
      image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      available: true,
    },
    {
      id: "burger",
      name: "Classic Burger",
      description: "Beef patty, cheddar, lettuce, tomato.",
      category: "Burgers",
      price: 11.99,
      image: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
      available: true,
    },
    {
      id: "pasta",
      name: "Creamy Pasta",
      description: "Pasta with creamy parmesan sauce.",
      category: "Pasta",
      price: 14.49,
      image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      available: true,
    },
    {
      id: "salad",
      name: "Fresh Salad",
      description: "Crisp greens with house dressing.",
      category: "Salads",
      price: 8.99,
      image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      available: true,
    },
  ]);
}