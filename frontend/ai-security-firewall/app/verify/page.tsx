"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();

  const token = params.get("token");

  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/auth/verify-email?token=${token}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.detail);
          return;
        }

        setMessage(data.message);
      } catch {
        setMessage("Verification failed.");
      }
    }

    verify();
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="rounded-xl bg-slate-900 p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-white">
          Email Verification
        </h1>

        <p className="text-lg text-cyan-400">
          {message}
        </p>
      </div>
    </main>
  );
}