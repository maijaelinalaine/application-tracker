"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
          const payload = await res.json();
          setError(payload?.error || "Failed to sign up");
          setLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="w-full max-w-xl bg-white p-6 rounded-md border">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-base text-gray-600">
            {mode === "login"
              ? "Log in to manage your applications"
              : "Sign up to start tracking your applications"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "signup" && (
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-base font-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border border-gray-400 text-base px-4 py-2.5 rounded"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-base font-semibold">
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-gray-400 text-base px-4 py-2.5 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-base font-semibold">
              Password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-400 text-base px-4 py-2.5 rounded"
            />
          </div>

          {error && (
            <p className="text-base text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="border border-gray-500 text-base px-4 py-2.5 rounded mt-2 disabled:opacity-60"
          >
            {loading
              ? "Loading..."
              : mode === "login"
                ? "Log in"
                : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-center text-base text-gray-600">
          {mode === "login"
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() =>
              setMode((current) => (current === "login" ? "signup" : "login"))
            }
            className="text-blue-600 hover:underline"
          >
            {mode === "login" ? "Create one" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
