
import UploadBox from "@/components/UploadBox";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-cyan-400 mb-3">
          Upload Files
        </h1>

        <p className="text-gray-400 mb-10">
          Upload text, images, PDFs, or source code for AI-powered security analysis.
        </p>

        <UploadBox />
      </div>
    </main>
  );
}
