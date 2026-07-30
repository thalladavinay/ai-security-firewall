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
      <div className="flex h-screen items-center justify-center text-white text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="mt-10">
        <DashboardChart
          safe={stats.safe_files}
          warning={stats.warning_files}
          danger={stats.malicious_files}
        />
      </div>

      <div className="mt-10 rounded-xl bg-slate-900 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Recent Activity
        </h2>

        {recentScans.length === 0 ? (
          <p className="text-center text-gray-400">
            No recent scans available.
          </p>
        ) : (
          <div className="space-y-4">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between rounded-lg border border-slate-700 p-4"
              >
                <div>
                  <p className="font-semibold text-white">
                    {scan.filename}
                  </p>

                  <p className="text-sm text-gray-400">
                    Risk Score: {scan.risk_score}
                  </p>
                </div>

                <StatusBadge status={scan.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <ThreatSummary
          malware={stats.malicious_files}
          phishing={stats.warning_files}
          promptInjection={0}
          safe={stats.safe_files}
        />
      </div>

      <div className="mt-8 rounded-lg bg-slate-900 p-4 text-center">
        <p className="text-gray-300">
          Average Risk Score
        </p>

        <p className="mt-2 text-3xl font-bold text-cyan-400">
          {stats.average_risk_score}
        </p>
      </div>
    </main>
  );
}