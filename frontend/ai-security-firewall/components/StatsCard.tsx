"use client";

import { motion } from "framer-motion";

type StatsCardProps = {
  title: string;
  value: number;
  color: string;
};

export default function StatsCard({
  title,
  value,
  color,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
    >
      <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
        {title}
      </h3>

      <p
        className="mt-4 text-4xl font-bold"
        style={{ color }}
      >
        {value.toLocaleString()}
      </p>
    </motion.div>
  );
}