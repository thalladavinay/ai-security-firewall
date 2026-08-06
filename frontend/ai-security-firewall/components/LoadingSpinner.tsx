
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