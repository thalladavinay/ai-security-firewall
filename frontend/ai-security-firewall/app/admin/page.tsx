"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AdminStats = {
  total_users: number;
  total_scans: number;
  total_reports: number;
  system_health: string;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<AdminStats>({
    total_users: 0,
    total_scans: 0,
    total_reports: 0,
    system_health: "Loading...",
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      router.push("/admin");
      return;
    }

    async function loadStats() {
      try {
        const res = await fetch("http://localhost:8000/admin/stats");

        if (!res.ok) {
          throw new Error("Failed to fetch admin stats");
        }

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);

        // Temporary values until backend is ready
        setStats({
          total_users: 18,
          total_scans: 264,
          total_reports: 251,
          system_health: "Healthy",
        });
      }
    }

    loadStats();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              AI Security Firewall Administration Panel
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg text-slate-400">
              👥 Total Users
            </h2>

            <p className="mt-4 text-5xl font-bold text-white">
              {stats.total_users}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg text-slate-400">
              📄 Total Scans
            </h2>

            <p className="mt-4 text-5xl font-bold text-white">
              {stats.total_scans}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg text-slate-400">
              📑 Total Reports
            </h2>

            <p className="mt-4 text-5xl font-bold text-white">
              {stats.total_reports}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg text-slate-400">
              🟢 System Health
            </h2>

            <p className="mt-4 text-3xl font-bold text-green-400">
              {stats.system_health}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}