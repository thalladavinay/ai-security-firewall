import { scans } from "@/data/scans";
import { notFound } from "next/navigation";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const scan = scans.find((item) => item.id === id);

  if (!scan) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Scan Details
      </h1>

      <div className="rounded-xl bg-slate-900 p-8 space-y-4">
        <p>
          <strong>File:</strong> {scan.fileName}
        </p>

        <p>
          <strong>Status:</strong> {scan.status}
        </p>

        <p>
          <strong>Risk Score:</strong> {scan.riskScore}%
        </p>

        <p>
          <strong>Summary:</strong> {scan.summary}
        </p>

        <p>
          <strong>Scanned At:</strong>{" "}
          {new Date(scan.scannedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}