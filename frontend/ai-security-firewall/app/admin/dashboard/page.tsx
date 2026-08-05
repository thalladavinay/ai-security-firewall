"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");

    if (!admin) {
      router.push("/admin");
    }
  }, [router]);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold text-red-500">
        Admin Dashboard
      </h1>

      <p className="mt-4 text-gray-400">
        Welcome Administrator.
      </p>
    </main>
  );
}