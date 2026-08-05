import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-950 text-white">
        <ThemeProvider>
          <AuthProvider>

            {/* Skip Navigation Link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cyan-600 focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to main content
            </a>

            <Navbar />

            <main
              id="main-content"
              className="min-h-screen bg-background text-foreground"
            >
              {children}
            </main>

            <Footer />

          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}