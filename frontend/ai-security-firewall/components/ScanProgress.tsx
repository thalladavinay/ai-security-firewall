/*import { CircleCheck, LoaderCircle, ShieldCheck } from "lucide-react";

interface ScanProgressProps {
  progress?: number;
  label?: string;
  status?: "scanning" | "complete";
}

export default function ScanProgress({
  progress = 65,
  label = "Scanning file for threats",
  status = "scanning",
}: ScanProgressProps) {
  const isComplete = status === "complete";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/20 ring-1 ring-white/5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Scan progress
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{label}</h3>
        </div>

        <div className="rounded-2xl bg-cyan-500/10 p-2 text-cyan-300">
          {isComplete ? (
            <CircleCheck className="h-6 w-6" />
          ) : (
            <LoaderCircle className="h-6 w-6 animate-spin" />
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-400">
          <span>{isComplete ? "Analysis complete" : "Analyzing content"}</span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
        <ShieldCheck className="h-4 w-4 text-cyan-400" />
        <span>
          {isComplete
            ? "Threat assessment finished successfully."
            : "Checking for malware, phishing, and prompt injection risks."}
        </span>
      </div>
    </div>
  );
}
*/
"use client";

import { Progress } from "@/components/ui/progress";

interface ScanProgressProps {
  value: number;
}

export default function ScanProgress({
  value,
}: ScanProgressProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400">
        AI Security Scan Progress
      </p>

      <Progress value={value} />

      <p className="font-semibold">{value}%</p>
    </div>
  );
}