import type { ReactNode } from "react";

import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}