"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-cyan-400">
          Forgot Password
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Enter your registered email address. We'll send you a password reset
          link.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold hover:bg-cyan-400 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-cyan-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
<div className="text-right">
  <Link
    href="/forgot-password"
    className="text-sm text-cyan-400 hover:underline"
  >
    Forgot Password?
  </Link>
</div>