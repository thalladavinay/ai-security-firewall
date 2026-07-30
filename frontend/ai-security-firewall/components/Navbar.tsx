"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <nav className="bg-slate-900 p-4 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400"
        >
          AI Security Firewall
        </Link>

        <div className="flex items-center gap-6">

          <Link href="/">Home</Link>

          <Link href="/upload">Upload</Link>

          <Link href="/dashboard">Dashboard</Link>

          <Link href="/history">History</Link>

          <Link href="/results">Results</Link>

          <Link href="/reports">Reports</Link>

          <Link href="/profile">Profile</Link>

          <Link href="/settings">Settings</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-400"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}