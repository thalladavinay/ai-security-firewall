import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

interface Props {
  fileName: string;
  status: "Safe" | "Warning" | "Malicious";
  risk: number;
}

export default function ScanResultCard({
  fileName,
  status,
  risk,
}: Props) {
  const statusConfig = {
    Safe: {
      color: "text-green-400",
      icon: <ShieldCheck className="text-green-500" />,
    },
    Warning: {
      color: "text-yellow-400",
      icon: <ShieldQuestion className="text-yellow-500" />,
    },
    Malicious: {
      color: "text-red-400",
      icon: <ShieldAlert className="text-red-500" />,
    },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {fileName}
        </h2>

        {statusConfig[status].icon}
      </div>

      <p className="mt-4 text-gray-400">
        Status:
        <span
          className={`ml-2 font-bold ${statusConfig[status].color}`}
        >
          {status}
        </span>
      </p>

      <p className="mt-2 text-gray-400">
        Risk Score:
        <span className="ml-2 font-bold text-cyan-400">
          {risk}%
        </span>
      </p>
    </div>
  );
}