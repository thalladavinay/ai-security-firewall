/*import { ArrowRight, ShieldCheck, ShieldOff } from "lucide-react";

interface ScanCardProps {
  title: string;
  status: "safe" | "suspicious" | "danger";
  summary: string;
  details?: string;
}

const statusStyles = {
  safe: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  suspicious: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  danger: "bg-rose-500/15 text-rose-300 border-rose-500/20",
};

const statusIcon = {
  safe: ShieldCheck,
  suspicious: ShieldOff,
  danger: ShieldOff,
};

export default function ScanCard({ title, status, summary, details }: ScanCardProps) {
  const Icon = statusIcon[status];

  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/20 ring-1 ring-white/5 transition hover:-translate-y-1 hover:bg-slate-900/95">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">Scan result</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold ${statusStyles[status]}`}>
          <Icon className="h-4 w-4" />
          {status}
        </div>
      </div>

      <p className="mb-4 text-sm leading-6 text-slate-300">{summary}</p>
      {details ? <p className="mb-6 text-sm text-slate-400">{details}</p> : null}

      <div className="flex items-center justify-between gap-4 text-cyan-300">
        <span className="text-sm font-medium">View details</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </article>
  );
}
*/
import { Badge } from "@/components/ui/badge";

interface ScanCardProps {
  fileName: string;
  status: "Safe" | "Warning" | "Malicious";
  score: number;
}

export default function ScanCard({
  fileName,
  status,
  score,
}: ScanCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{fileName}</h2>

        <Badge
          className={
            status === "Safe"
              ? "bg-green-600"
              : status === "Warning"
              ? "bg-yellow-600"
              : "bg-red-600"
          }
        >
          {status}
        </Badge>
      </div>

      <p className="mt-4 text-gray-400">
        AI Risk Score
      </p>

      <div className="mt-2 h-3 rounded-full bg-slate-700">
        <div
          className="h-3 rounded-full bg-cyan-500"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-2">{score}%</p>
    </div>
  );
}