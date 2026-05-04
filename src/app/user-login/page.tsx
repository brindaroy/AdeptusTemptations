"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!name || !phone || !password) {
      alert("Please enter name, phone, and password");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    // Save user
    localStorage.setItem(
      "customer",
      JSON.stringify({
        name,
        phone,
        password,
        loggedIn: true,
      })
    );

    router.push("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-red-100 p-6">
      <div className="glass-card w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-pop">
        
        {/* HEADER */}
        <div className="text-center">
          <div className="text-6xl animate-bounce-soft">🍽️</div>
          <h1 className="mt-4 text-4xl font-black text-zinc-950">
            Customer Login
          </h1>
          <p className="mt-2 text-zinc-500">
            Enter your details to start ordering.
          </p>
        </div>

        {/* FORM */}
        <div className="mt-8 space-y-4">
          
          {/* NAME */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-2xl border bg-white p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />

          {/* PHONE */}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full rounded-2xl border bg-white p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />

          {/* PASSWORD */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
            className="w-full rounded-2xl border bg-white p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />

          {/* BUTTON */}
          <button
            onClick={login}
            className="w-full rounded-2xl bg-orange-600 px-4 py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-orange-700 active:scale-95"
          >
            Continue Ordering
          </button>

          {/* HINT */}
          <p className="text-center text-sm text-zinc-400">
            (Demo password: anything 4+ characters)
          </p>
        </div>
      </div>
    </main>
  );
}