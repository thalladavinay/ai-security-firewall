/*import { AlertTriangle, ShieldCheck } from "lucide-react";

interface RiskScoreProps {
  score?: number;
  label?: string;
  description?: string;
}

export default function RiskScore({
  score = 78,
  label = "Overall risk",
  description = "This file shows several suspicious indicators and should be reviewed carefully.",
}: RiskScoreProps) {
  const isHighRisk = score >= 70;
  const isMediumRisk = score >= 40;

  const colorClass = isHighRisk
    ? "text-rose-300"
    : isMediumRisk
      ? "text-amber-300"
      : "text-emerald-300";

  const ringClass = isHighRisk
    ? "border-rose-500/30 bg-rose-500/10"
    : isMediumRisk
      ? "border-amber-500/30 bg-amber-500/10"
      : "border-emerald-500/30 bg-emerald-500/10";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/20 ring-1 ring-white/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Risk score
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{label}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
        </div>

        <div className={`flex h-16 w-16 items-center justify-center rounded-full border-4 ${ringClass}`}>
          <span className={`text-2xl font-bold ${colorClass}`}>{score}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
        {isHighRisk ? (
          <AlertTriangle className="h-4 w-4 text-rose-300" />
        ) : (
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
        )}
        <span>
          {isHighRisk
            ? "High-risk content needs immediate review"
            : isMediumRisk
              ? "Moderate risk: continue investigation"
              : "Low risk: safe to proceed"}
        </span>
      </div>
    </div>
  );
}
*/
interface RiskScoreProps {
  score: number;
}

export default function RiskScore({
  score,
}: RiskScoreProps) {
  const color =
    score < 30
      ? "text-green-400"
      : score < 70
      ? "text-yellow-400"
      : "text-red-500";

  return (
    <div className="rounded-2xl bg-slate-900 p-8 text-center">
      <h2 className="text-xl font-bold mb-6">
        AI Risk Score
      </h2>

      <div className={`text-7xl font-black ${color}`}>
        {score}%
      </div>
    </div>
  );
}