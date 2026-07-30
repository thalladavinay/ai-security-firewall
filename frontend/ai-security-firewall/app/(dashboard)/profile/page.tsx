"use client";

import { User, Mail, ShieldCheck, Calendar } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500">
            <User className="h-12 w-12 text-black" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              vinthal
            </h1>

            <p className="text-gray-400">
              AI Security Analyst
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6">

          <div className="flex items-center gap-4 rounded-xl bg-slate-800 p-4">
            <Mail className="text-cyan-400" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p>vins42988@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-slate-800 p-4">
            <ShieldCheck className="text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Account Status</p>
              <p>Verified</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-slate-800 p-4">
            <Calendar className="text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Member Since</p>
              <p>July 2026</p>
            </div>
          </div>

        </div>

        <button className="mt-10 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400">
          Edit Profile
        </button>

      </div>
    </main>
  );
}