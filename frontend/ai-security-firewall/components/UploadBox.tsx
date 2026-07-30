"use client";

import { useState } from "react";
import { uploadFile } from "@/services/api";

interface ScanResult {
  filename: string;
  report?: string;
  scan: {
    status: string;
    risk_score: number;
    threats: string[];
    message: string;
  };
}

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const data = await uploadFile(file);
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Upload failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-slate-900 p-6 shadow-lg">
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg,.py,.js,.java,.cpp,.c,.zip"
        className="mb-4 block w-full text-white"
        onChange={(e) => {
          if (e.target.files?.length) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading}
        className="rounded-lg bg-cyan-600 px-5 py-2 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Scanning..." : "Scan File"}
      </button>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-xl bg-slate-800 p-6">
          <h2 className="mb-4 text-2xl font-bold text-cyan-400">
            Scan Result
          </h2>

          <p className="text-white">
            <strong>Filename:</strong> {result.filename}
          </p>

          <p className="mt-2 text-white">
            <strong>Status:</strong>{" "}
            <span
              className={
                result.scan.status.toLowerCase() === "safe"
                  ? "text-green-400"
                  : result.scan.status.toLowerCase() === "warning"
                  ? "text-yellow-400"
                  : "text-red-500"
              }
            >
              {result.scan.status}
            </span>
          </p>

          <p className="mt-2 text-white">
            <strong>Risk Score:</strong> {result.scan.risk_score}
          </p>

          <p className="mt-2 text-white">
            <strong>Message:</strong> {result.scan.message}
          </p>

          <div className="mt-4">
            <strong className="text-white">Threats:</strong>

            {result.scan.threats.length === 0 ? (
              <p className="mt-2 text-green-400">
                No threats detected.
              </p>
            ) : (
              <ul className="ml-6 mt-2 list-disc text-red-400">
                {result.scan.threats.map((threat, index) => (
                  <li key={index}>{threat}</li>
                ))}
              </ul>
            )}
          </div>

          {result.report && (
            <div className="mt-6 rounded-lg border border-green-500/30 bg-slate-700 p-4">
              <p className="font-semibold text-green-400">
                ✅ PDF Report Generated Successfully
              </p>

              <p className="mt-2 text-sm text-gray-300">
                {result.report}
              </p>

              <a
                href={`http://localhost:8000/reports/${result.report}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-500"
              >
                Download PDF Report
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}