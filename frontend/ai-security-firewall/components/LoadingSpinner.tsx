/*import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  label = "Loading",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
      <LoaderCircle className={`animate-spin text-cyan-400 ${sizeClasses[size]}`} />
      <p className="text-sm font-medium text-gray-400">{label}</p>
    </div>
  );
}
*/
"use client";

import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-10">
      <ClipLoader
        size={50}
        color="#06b6d4"
      />
    </div>
  );
}