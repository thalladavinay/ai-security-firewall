"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploadBoxProps {
  onFileSelected?: (file: File) => void;
}

export default function UploadBox({
  onFileSelected,
}: UploadBoxProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];

      console.log("Selected file:", file);

      if (typeof onFileSelected === "function") {
        onFileSelected(file);
      } else {
        console.error(
          "UploadBox Error: onFileSelected prop was not provided or is not a function."
        );
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      tabIndex={0}
      className="cursor-pointer rounded-xl border-2 border-dashed border-slate-600 bg-slate-900 p-10 text-center transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      <input
        {...getInputProps()}
        aria-label="Upload file"
      />

      {isDragActive ? (
        <p className="text-lg text-cyan-400">
          Drop the file here...
        </p>
      ) : (
        <>
          <p className="text-lg text-white">
            Drag & Drop your file here
          </p>

          <p className="mt-2 text-gray-400">
            or click to browse
          </p>
        </>
      )}
    </div>
  );
}