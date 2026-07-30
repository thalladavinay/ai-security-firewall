
"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Upload,
  History,
  FileText,
  Settings,
  User,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <div className="flex items-center gap-3 mb-10">
        <ShieldCheck className="h-8 w-8 text-cyan-400" />
        <h1 className="text-xl font-bold text-white">
          AI Firewall
        </h1>
      </div>

      <nav className="space-y-3">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link href="/upload" className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <Upload size={20} />
          Upload
        </Link>

        <Link href="/history" className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <History size={20} />
          History
        </Link>

        <Link href="/results" className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <FileText size={20} />
          Results
        </Link>

        <Link href="/profile" className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <User size={20} />
          Profile
        </Link>

        <Link href="/settings" className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <Settings size={20} />
          Settings
        </Link>
      </nav>
    </aside>
  );
}