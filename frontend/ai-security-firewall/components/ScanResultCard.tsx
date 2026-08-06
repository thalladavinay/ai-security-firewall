import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  ShieldX,
} from "lucide-react";

interface Props {
  fileName: string;
  status: string;
  risk: number;
}

export default function ScanResultCard({
  fileName,
  status,
  risk,
}: Props) {
  const normalizedStatus = status.toLowerCase();

  let config: {
    color: string;
    icon: React.ReactNode;
  };

  switch (normalizedStatus) {
    case "safe":
      config = {
        color: "text-green-400",
        icon: <ShieldCheck className="text-green-500" />,
      };
      break;

    case "warning":
      config = {
        color: "text-yellow-400",
        icon: <ShieldQuestion className="text-yellow-500" />,
      };
      break;

    case "malicious":
      config = {
        color: "text-red-400",
        icon: <ShieldAlert className="text-red-500" />,
      };
      break;

    default:
      config = {
        color: "text-gray-400",
        icon: <ShieldX className="text-gray-500" />,
      };
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {fileName}
        </h2>

        {config.icon}
      </div>

      <p className="mt-4 text-gray-400">
        Status:
        <span className={`ml-2 font-bold ${config.color}`}>
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