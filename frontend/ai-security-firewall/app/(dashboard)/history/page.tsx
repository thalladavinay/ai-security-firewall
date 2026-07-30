"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getScanHistory } from "@/services/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Scan = {
  id: number;
  filename: string;
  status: string;
  risk_score: number;
  report_path: string;
};

export default function HistoryPage() {
  const router = useRouter();

  const [history, setHistory] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function loadHistory() {
      try {
        const data = await getScanHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [router]);

  const filteredHistory = history.filter((scan) =>
    scan.filename.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading scan history...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold text-cyan-400">
        Scan History
      </h1>

      <input
        type="text"
        placeholder="Search by filename..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
      />

      {filteredHistory.length === 0 ? (
        <div className="rounded-lg bg-slate-800 p-6 text-center text-gray-400">
          No scan history found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Report</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredHistory.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell>{scan.filename}</TableCell>

                  <TableCell>{scan.status}</TableCell>

                  <TableCell>{scan.risk_score}</TableCell>

                  <TableCell>
                    {scan.report_path ? (
                      <a
                        href={`http://localhost:8000/reports/${scan.report_path.split("/").pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-500">
                        Not Available
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}