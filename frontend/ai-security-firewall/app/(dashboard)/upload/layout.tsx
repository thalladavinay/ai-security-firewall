import UploadBox from "@/components/UploadBox";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-3 text-4xl font-bold text-cyan-400">
          Upload Files
        </h1>

        <p className="mb-10 text-gray-400">
          Upload text, images, PDFs, or source code for AI-powered security
          analysis.
        </p>

        <UploadBox />
      </div>
    </main>
  );
}