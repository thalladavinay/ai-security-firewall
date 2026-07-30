
"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Shield,
  FileCode,
  ImageIcon,
  ScanSearch,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ShieldCheck className="w-24 h-24 text-cyan-400" />
      </motion.div>

      <motion.h1
        className="text-6xl font-extrabold mt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI Security Firewall
      </motion.h1>

      <p className="mt-6 max-w-3xl text-xl text-gray-400">
        Detect malware, phishing, prompt injection, suspicious code,
        malicious images, and AI security threats in one place.
      </p>

      <button className="mt-10 px-8 py-4 bg-cyan-500 rounded-xl hover:bg-cyan-400 transition">
        Start Scanning
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full max-w-7xl">
        <FeatureCard
          icon={<Shield size={40} />}
          title="Malware Detection"
          description="Identify malicious files and suspicious content."
        />
        <FeatureCard
          icon={<FileCode size={40} />}
          title="Code Analysis"
          description="Scan source code for vulnerabilities and malicious scripts."
        />
        <FeatureCard
          icon={<ImageIcon size={40} />}
          title="Image Inspection"
          description="Analyze images for hidden threats and unsafe content."
        />
        <FeatureCard
          icon={<ScanSearch size={40} />}
          title="AI Threat Detection"
          description="Detect prompt injection, phishing, jailbreaks, and AI risks."
        />
      </div>
    </section>
  );
}