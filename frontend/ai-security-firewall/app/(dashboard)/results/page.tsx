"use client";

import ScanResultCard from "@/components/ScanResultCard";

export default function ResultsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl p-8">
      <h1 className="mb-8 text-4xl font-bold text-cyan-400">
        Scan Results
      </h1>

      <p className="mb-8 text-gray-400">
        View the latest security scan results.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <ScanResultCard
          fileName="resume.pdf"
          status="Safe"
          risk={12}
        />

        <ScanResultCard
          fileName="virus.exe"
          status="Malicious"
          risk={95}
        />
      </div>
    </main>
  );
}