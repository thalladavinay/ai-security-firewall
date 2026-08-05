"use client";

import { useEffect, useState } from "react";
import { getScanHistory } from "@/services/api";

interface ScanItem {
  id: number;
  filename: string;
  status: string;
}

export default function ActivityFeed() {
  const [scans, setScans] = useState<ScanItem[]>([]);

  async function loadActivity() {
    try {
      const data = await getScanHistory();
      setScans(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadActivity();

    const interval = setInterval(() => {
      loadActivity();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-cyan-400">
        Live Activity
      </h2>

      {scans.length === 0 ? (
        <p className="text-gray-400">
          No recent activity.
        </p>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="rounded-lg border border-slate-700 p-4"
            >
              <p className="font-semibold text-white">
                {scan.filename}
              </p>

              <p
                className={
                  scan.status === "Safe"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                Status: {scan.status}
              </p>

              <p className="text-sm text-gray-500">
                Updated just now
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}