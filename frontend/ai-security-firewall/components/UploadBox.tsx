"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploadBoxProps {
  onFileSelected: (file: File) => void;
}

export default function UploadBox({
  onFileSelected,
}: UploadBoxProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
  {...getRootProps()}
  tabIndex={0}
      className="
border-2
border-dashed
rounded-xl
p-10
text-center
cursor-pointer
transition
hover:border-cyan-500
bg-slate-900
focus:outline-none
focus:ring-2
focus:ring-cyan-500
"
    >
      <input
  {...getInputProps()}
  aria-label="Upload file"
/>

      {isDragActive ? (
        <p className="text-cyan-400">
          Drop the file here...
        </p>
      ) : (
        <>
          <p className="text-white text-lg">
            Drag & Drop your file here
          </p>

          <p className="text-gray-400 mt-2">
            or click to browse
          </p>
        </>
      )}
    </div>
  );
}