import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "margherita-pizza", name: "Margherita Pizza", description: "Tomato sauce, mozzarella, basil, olive oil.", category: "Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3", available: true },
    { id: "pepperoni-pizza", name: "Pepperoni Pizza", description: "Mozzarella, tomato sauce, crispy pepperoni.", category: "Pizza", price: 14.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e", available: true },
    { id: "bbq-chicken-pizza", name: "BBQ Chicken Pizza", description: "BBQ sauce, grilled chicken, red onion, mozzarella.", category: "Pizza", price: 15.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", available: true },
    { id: "veggie-pizza", name: "Garden Veggie Pizza", description: "Peppers, olives, onions, mushrooms, tomato sauce.", category: "Pizza", price: 13.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002", available: true },

    { id: "classic-burger", name: "Classic Burger", description: "Beef patty, cheddar, lettuce, tomato, house sauce.", category: "Burgers", price: 11.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", available: true },
    { id: "double-smash-burger", name: "Double Smash Burger", description: "Two crispy patties, cheese, pickles, secret sauce.", category: "Burgers", price: 14.49, image: "https://images.unsplash.com/photo-1550547660-d9450f859349", available: true },
    { id: "spicy-chicken-burger", name: "Spicy Chicken Burger", description: "Crispy chicken, spicy mayo, slaw, pickles.", category: "Burgers", price: 12.49, image: "https://images.unsplash.com/photo-1606755962773-d324e2a13086", available: true },
    { id: "mushroom-swiss-burger", name: "Mushroom Swiss Burger", description: "Beef patty, mushrooms, Swiss cheese, garlic aioli.", category: "Burgers", price: 13.49, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5", available: true },

    { id: "truffle-pasta", name: "Truffle Alfredo Pasta", description: "Creamy alfredo, mushrooms, parmesan, truffle oil.", category: "Pasta", price: 15.49, image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77", available: true },
    { id: "spicy-rigatoni", name: "Spicy Rigatoni", description: "Rigatoni with spicy tomato cream sauce.", category: "Pasta", price: 13.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9", available: true },
    { id: "pesto-penne", name: "Pesto Penne", description: "Basil pesto, parmesan, cherry tomatoes.", category: "Pasta", price: 12.99, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601", available: true },
    { id: "seafood-linguine", name: "Seafood Linguine", description: "Shrimp, garlic, herbs, lemon butter sauce.", category: "Pasta", price: 17.99, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8", available: true },

    { id: "caesar-salad", name: "Caesar Salad", description: "Romaine, parmesan, croutons, Caesar dressing.", category: "Salads", price: 9.99, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1", available: true },
    { id: "greek-salad", name: "Greek Salad", description: "Cucumber, tomato, olives, feta, vinaigrette.", category: "Salads", price: 10.49, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999", available: true },
    { id: "chicken-avocado-salad", name: "Chicken Avocado Salad", description: "Grilled chicken, avocado, greens, lime dressing.", category: "Salads", price: 12.99, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd", available: true },
    { id: "caprese-salad", name: "Caprese Salad", description: "Tomato, mozzarella, basil, balsamic glaze.", category: "Salads", price: 9.49, image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5", available: true },

    { id: "loaded-fries", name: "Loaded Fries", description: "Crispy fries, cheese, herbs, house sauce.", category: "Sides", price: 6.99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", available: true },
    { id: "garlic-bread", name: "Garlic Bread", description: "Toasted bread with garlic butter and herbs.", category: "Sides", price: 5.99, image: "https://images.unsplash.com/photo-1619531040576-f9416740661f", available: true },
    { id: "mozzarella-sticks", name: "Mozzarella Sticks", description: "Golden fried mozzarella with marinara.", category: "Sides", price: 7.49, image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280", available: true },
    { id: "chicken-wings", name: "Buffalo Wings", description: "Crispy wings tossed in buffalo sauce.", category: "Sides", price: 10.99, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2", available: true },

    { id: "lava-cake", name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center.", category: "Desserts", price: 7.49, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c", available: true },
    { id: "tiramisu", name: "Tiramisu", description: "Coffee-soaked ladyfingers, mascarpone cream.", category: "Desserts", price: 7.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", available: true },
    { id: "cheesecake", name: "New York Cheesecake", description: "Creamy cheesecake with berry topping.", category: "Desserts", price: 8.49, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad", available: true },
    { id: "brownie-sundae", name: "Brownie Sundae", description: "Warm brownie, vanilla ice cream, chocolate sauce.", category: "Desserts", price: 8.99, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", available: true },

    { id: "lemonade", name: "House Lemonade", description: "Fresh lemon, mint, sparkling water.", category: "Drinks", price: 4.25, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859", available: true },
    { id: "iced-tea", name: "Iced Tea", description: "Fresh-brewed black tea served over ice.", category: "Drinks", price: 3.99, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87", available: true },
    { id: "strawberry-mocktail", name: "Strawberry Mocktail", description: "Strawberry, lime, mint, soda.", category: "Drinks", price: 5.99, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e", available: true },
    { id: "cold-brew", name: "Cold Brew Coffee", description: "Smooth cold brew served over ice.", category: "Drinks", price: 4.99, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", available: true },

    { id: "salmon-bowl", name: "Salmon Rice Bowl", description: "Salmon, rice, cucumber, avocado, spicy mayo.", category: "Bowls", price: 16.99, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2", available: true },
    { id: "chicken-burrito-bowl", name: "Chicken Burrito Bowl", description: "Chicken, rice, beans, corn, salsa, crema.", category: "Bowls", price: 13.99, image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7", available: true },
  ]);
}