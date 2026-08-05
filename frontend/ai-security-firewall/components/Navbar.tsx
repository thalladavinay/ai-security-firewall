"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    setOpen(false);
    router.push("/login");
  }

  return (
    <nav className="border-b border-slate-700 bg-slate-900 p-4 text-white shadow">
      <div className="mx-auto max-w-7xl">

        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="text-2xl font-bold text-cyan-400"
          >
            AI Security Firewall
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">

            <Link
              href="/"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Home
            </Link>

            <Link
              href="/upload"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Upload
            </Link>

            <Link
              href="/dashboard"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Dashboard
            </Link>

            <Link
              href="/history"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              History
            </Link>

            <Link
              href="/results"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Results
            </Link>

            <Link
              href="/reports"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Reports
            </Link>

            <Link
              href="/profile"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Settings
            </Link>

            <ThemeToggle />

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800 p-4 md:hidden">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Home
            </Link>

            <Link
              href="/upload"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Upload
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Dashboard
            </Link>

            <Link
              href="/history"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              History
            </Link>

            <Link
              href="/results"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Results
            </Link>

            <Link
              href="/reports"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Reports
            </Link>

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Settings
            </Link>

            <ThemeToggle />

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                Logout
              </button>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}