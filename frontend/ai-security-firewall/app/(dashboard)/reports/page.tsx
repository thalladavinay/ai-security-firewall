"use client";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";


export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-black p-4 text-white md:p-8">

      <h1 className="mb-8 text-4xl font-bold text-cyan-400">
        Security Reports
      </h1>


      <section
        className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-8
        shadow-lg
        "
      >

        <h2 className="mb-4 text-2xl font-semibold">
          PDF Security Reports
        </h2>


        <p className="mb-6 text-slate-400">
          Completed scans automatically generate PDF security
          reports. You can download reports from the Scan History
          page.
        </p>


        <a
          href={`${BACKEND_URL}/docs`}
          target="_blank"
          rel="noopener noreferrer"
          className="
          inline-block
          rounded-xl
          bg-cyan-600
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-cyan-500
          "
        >
          Open API Documentation
        </a>


      </section>


    </main>
  );
}