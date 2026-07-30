"use client";

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold text-cyan-400">
        Security Reports
      </h1>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">
          PDF Security Reports
        </h2>

        <p className="mb-6 text-gray-400">
          Every completed scan generates a PDF report that can be downloaded
          from the Upload page or Scan History page.
        </p>

        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
        >
          Open Backend API Docs
        </a>
      </div>
    </main>
  );
}