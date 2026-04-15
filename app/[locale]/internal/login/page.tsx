"use client";

import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function InternalLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale = params?.locale || "en";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/internal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        setError("Invalid username or password.");
        return;
      }

      router.push(`/${locale}/internal/projects`);
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-text-primary px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-primary-600/30 bg-surface/70 p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Internal Sign In</h1>
        <p className="text-sm text-text-secondary mb-6">This route is hidden and protected.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="w-full rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
              autoComplete="current-password"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-400 px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

