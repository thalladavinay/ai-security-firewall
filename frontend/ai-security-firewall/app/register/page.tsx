"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { registerUser } from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username,
        email,
        password,
      });

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl">

        <div className="mb-6 flex flex-col items-center">
          <ShieldCheck className="h-16 w-16 text-cyan-400" />

          <h1 className="mt-3 text-3xl font-bold text-white">
            AI Security Firewall
          </h1>

          <p className="text-gray-400">
            Create Your Account
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/10 p-3 text-center text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            required
            className="w-full rounded bg-slate-800 p-3 text-white"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            required
            type="email"
            className="w-full rounded bg-slate-800 p-3 text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
            type="password"
            className="w-full rounded bg-slate-800 p-3 text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            required
            type="password"
            className="w-full rounded bg-slate-800 p-3 text-white"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-cyan-500 p-3 font-bold text-black disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="mt-5 text-center text-gray-300">
          Already have an account?

          <Link
            href="/login"
            className="ml-2 text-cyan-400"
          >
            Login
          </Link>

        </div>

      </div>
    </main>
  );
}