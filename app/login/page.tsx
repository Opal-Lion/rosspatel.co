"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <p className="font-display text-2xl tracking-[0.15em] uppercase text-white mb-12 text-center">
          Ross Patel
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 font-body text-sm px-4 py-3 focus:outline-none focus:border-[#00c4b4] transition-colors"
              autoFocus
              required
            />
            {error && (
              <p className="font-body text-xs text-red-400 mt-2">
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00c4b4] text-[#0a0a0a] font-body font-semibold text-sm tracking-widest uppercase py-3 hover:bg-[#00a89a] transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
