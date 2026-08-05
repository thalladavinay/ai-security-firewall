interface ThreatSummaryProps {
  malware: number;
  phishing: number;
  promptInjection: number;
  safe: number;
}

export default function ThreatSummary({
  malware,
  phishing,
  promptInjection,
  safe,
}: ThreatSummaryProps) {
  const totalThreats =
    malware + phishing + promptInjection;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-xl md:text-2xl font-bold text-cyan-400">
        Threat Summary
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-200">Malware</span>
          <span className="font-semibold text-red-400">
            {malware}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-200">Phishing</span>
          <span className="font-semibold text-yellow-400">
            {phishing}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-200">
            Prompt Injection
          </span>
          <span className="font-semibold text-orange-400">
            {promptInjection}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-200">Safe Files</span>
          <span className="font-semibold text-green-400">
            {safe}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-3">
          <span className="font-semibold text-white">
            Total Threats
          </span>

          <span className="text-xl font-bold text-red-400">
            {totalThreats}
          </span>
        </div>
      </div>
    </div>
  );
}