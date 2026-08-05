"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StatsCard from "@/components/StatsCard";
import DashboardChart from "@/components/DashboardChart";
import ThreatSummary from "@/components/ThreatSummary";
import StatusBadge from "@/components/StatusBadge";

import {
  getDashboardStats,
  getRecentScans,
} from "@/services/api";

type DashboardStats = {
  total_scans: number;
  safe_files: number;
  warning_files: number;
  malicious_files: number;
  average_risk_score: number;
};

type Scan = {
  id: number;
  filename: string;
  status: string;
  risk_score: number;
};

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats>({
    total_scans: 0,
    safe_files: 0,
    warning_files: 0,
    malicious_files: 0,
    average_risk_score: 0,
  });

  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function loadDashboard() {
      try {
        const statsData = await getDashboardStats();
        const recentData = await getRecentScans();

        setStats(statsData);
        setRecentScans(recentData);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-8">

      {/* Dashboard Title */}
      <h1 className="mb-4 text-2xl font-bold text-white md:text-4xl">
        Dashboard
      </h1>

      {/* Export Buttons */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
  aria-label="Export dashboard as PDF"
  className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
>
  Export PDF
</button>

        <button
  aria-label="Export dashboard as CSV"
  className="rounded-lg bg-green-500 px-5 py-2 font-semibold text-white transition hover:bg-green-600"
>
  Export CSV
</button>

       <button
  aria-label="Export dashboard as Excel"
  className="rounded-lg bg-blue-500 px-5 py-2 font-semibold text-white transition hover:bg-blue-600"
>
  Export Excel
</button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Scans"
          value={stats.total_scans}
          color="#06b6d4"
        />

        <StatsCard
          title="Safe Files"
          value={stats.safe_files}
          color="#22c55e"
        />

        <StatsCard
          title="Warning Files"
          value={stats.warning_files}
          color="#facc15"
        />

        <StatsCard
          title="Malicious Files"
          value={stats.malicious_files}
          color="#ef4444"
        />
      </div>

      {/* Dashboard Chart */}
      <div className="mt-10 w-full overflow-x-auto">
        <DashboardChart
          safe={stats.safe_files}
          warning={stats.warning_files}
          danger={stats.malicious_files}
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-10 rounded-xl bg-slate-900 p-6">
        <h2 className="mb-6 text-xl font-bold text-white md:text-2xl">
          Recent Activity
        </h2>

        {recentScans.length === 0 ? (
          <p className="text-center text-slate-200">
            No recent scans available.
          </p>
        ) : (
          <div className="space-y-4">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-700 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-white">
                    {scan.filename}
                  </p>

                  <p className="text-sm text-white">
                    Risk Score: {scan.risk_score}
                  </p>
                </div>

                <StatusBadge status={scan.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Threat Summary */}
      <div className="mt-10 overflow-x-auto">
        <ThreatSummary
          malware={stats.malicious_files}
          phishing={stats.warning_files}
          promptInjection={0}
          safe={stats.safe_files}
        />
      </div>

      {/* Average Risk */}
      <div className="mt-8 rounded-lg border border-slate-700 bg-slate-900 p-4 text-center">
       <p className="text-slate-200">
    Average Risk Score
</p>

        <p className="mt-2 text-2xl font-bold text-cyan-400 md:text-3xl">
          {stats.average_risk_score}
        </p>
      </div>

    </main>
  );
}