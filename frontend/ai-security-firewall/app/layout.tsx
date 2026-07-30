import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AI Security Firewall",
  description: "AI-powered malware and security scanner",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <AuthProvider>
          <Navbar />

          <main className="min-h-screen bg-black text-white">
            {children}
          </main>

        
        </AuthProvider>
      </body>
    </html>
  );
}