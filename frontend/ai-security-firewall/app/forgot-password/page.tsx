"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-cyan-400">
          Forgot Password
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Enter your registered email address. We'll send you a password reset
          link.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-gray-300"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              aria-invalid={false}
              placeholder="Enter your email"
              className="
                w-full
                rounded-lg
                border
                border-slate-700
                bg-slate-800
                p-3
                text-white
                outline-none
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-500
              "
            />

            {/* Example error message (show only when validation fails) */}
            {/*
            <p
              role="alert"
              className="mt-2 text-sm text-red-400"
            >
              Invalid Email Address
            </p>
            */}
          </div>

          <button
            type="submit"
            className="
              w-full
              rounded-lg
              bg-cyan-500
              py-3
              font-semibold
              text-black
              transition
              hover:bg-cyan-400
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="
              rounded
              text-cyan-400
              hover:underline
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          >
            Back to Login
          </Link>
        </div>

        <div className="mt-4 text-right">
          <Link
            href="/forgot-password"
            className="
              text-sm
              text-cyan-400
              hover:underline
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}