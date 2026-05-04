"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const login = () => {
    if (password === "meow123") {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin/orders");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-orange-950 to-zinc-900 p-6 text-white">
      <div className="w-full max-w-md rounded-[2rem] bg-white/10 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur animate-pop">
        <div className="text-center">
          <div className="text-6xl animate-bounce-soft">🐾</div>
          <h1 className="mt-4 text-4xl font-black">Admin Login</h1>
          <p className="mt-2 text-zinc-300">
            Enter the kitchen password to view orders.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 font-semibold text-white outline-none placeholder:text-zinc-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
          />

          <button
            onClick={login}
            className="w-full rounded-2xl bg-orange-600 px-4 py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-orange-700 active:scale-95"
          >
            Login
          </button>

          <p className="text-center text-sm text-zinc-400">
            Demo password: <b>meow123</b>
          </p>
        </div>
      </div>
    </main>
  );
}