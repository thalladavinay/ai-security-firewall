"use client";

import { useState } from "react";
import UploadBox from "@/components/UploadBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { uploadFile } from "@/services/api";

interface ScanDetails {
  status?: string;
  risk_score?: number;
  threats?: string[];
  message?: string;
}
interface ScanResult {
  filename?: string;
  status?: string;
  scan?: ScanDetails;
  virustotal?: unknown;
  ai_explanation?: string;
  report?: string;
}
const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".txt",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
  ".py",
  ".js",
  ".java",
  ".cpp",
  ".c",
];

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scanResult, setScanResult] =
    useState<ScanResult | null>(null);
  const handleFileSelected = async (file: File) => {
    try {
      setLoading(true);
      setError("");
      setScanResult(null);
      const extension =
        "." +
        file.name
          .split(".")
          .pop()
          ?.toLowerCase();
      if (
        !ALLOWED_EXTENSIONS.includes(extension)
      ) {
        throw new Error(
          "Unsupported file type selected."
        );
      }
      const result = await uploadFile(file);
      setScanResult(result);
    } catch (err: unknown) {
      console.error(
        "Upload Error:",
        err
      );
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Upload failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold text-cyan-400">
          Upload Files
        </h1>
        <p className="mb-8 text-slate-400">
          Upload text, PDF, image, or source code files
          for AI-powered security analysis.
        </p>
        <UploadBox
          onFileSelected={
            handleFileSelected
          }
        />
        {loading && (
  <div
    role="status"
    aria-live="polite"
    className="mt-6 rounded-lg border border-cyan-700 bg-cyan-950/30 p-4"
  >
    <LoadingSpinner />

    <p className="text-center text-cyan-300">
      Uploading and scanning file...
    </p>
  </div>
)}

{error && (
  <div
    role="alert"
    className="mt-6 rounded-lg border border-red-700 bg-red-950/20 p-4"
  >
    <p className="font-medium text-red-400">
      {error}
    </p>
  </div>
)}
        {scanResult && (
          <div className="mt-8 rounded-xl border border-green-600 bg-slate-900 p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-green-400">
              Scan Completed
            </h2>
            <div className="space-y-3">


              <p>
                <strong>
                  File:
                </strong>{" "}
                {scanResult.filename}
              </p>



              <p>
                <strong>
                  Status:
                </strong>{" "}
                {scanResult.scan?.status ??
                  scanResult.status ??
                  "Unknown"}
              </p>



              <p>
                <strong>
                  Risk Score:
                </strong>{" "}
                {scanResult.scan?.risk_score ?? 0}%
              </p>



              {scanResult.scan?.message && (
                <p>
                  <strong>
                    Message:
                  </strong>{" "}
                  {scanResult.scan.message}
                </p>
              )}



              {scanResult.scan?.threats &&
                scanResult.scan.threats.length > 0 && (

                <div>

                  <strong>
                    Threats:
                  </strong>


                  <ul className="mt-2 list-disc pl-6">

                    {scanResult.scan.threats.map(
                      (threat, index) => (

                      <li key={index}>
                        {threat}
                      </li>

                    ))}

                  </ul>

                </div>

              )}



              {scanResult.ai_explanation && (

                <div>
                  <strong>
                    AI Explanation:
                  </strong>

                  <p className="mt-2 text-slate-300">
                    {scanResult.ai_explanation}
                  </p>

                </div>

              )}



            </div>


          </div>

        )}


      </div>

    </main>
  );
}