
export default function RecentScans() {
  const scans = [
    {
      file: "resume.pdf",
      status: "Safe",
    },
    {
      file: "virus.exe",
      status: "Malicious",
    },
    {
      file: "report.docx",
      status: "Safe",
    },
  ];

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Scans
      </h2>

      {scans.map((scan, index) => (
        <div
          key={index}
          className="flex justify-between border-b border-slate-800 py-4"
        >
          <span>{scan.file}</span>

          <span
            className={
              scan.status === "Safe"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {scan.status}
          </span>
        </div>
      ))}
    </div>
  );
}