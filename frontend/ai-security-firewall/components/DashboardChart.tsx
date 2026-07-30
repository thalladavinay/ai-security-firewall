"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DashboardChartProps = {
  safe: number;
  warning: number;
  danger: number;
};

export default function DashboardChart({
  safe,
  warning,
  danger,
}: DashboardChartProps) {
  const total = safe + warning + danger;

  const data = [
    {
      name: "Safe",
      value: safe,
    },
    {
      name: "Warning",
      value: warning,
    },
    {
      name: "Malicious",
      value: danger,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];

  if (total === 0) {
    return (
      <div className="rounded-xl bg-slate-900 p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Scan Distribution
        </h2>

        <div className="flex h-72 items-center justify-center text-gray-400">
          No scan data available.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Scan Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
  formatter={(value) => [
    value ?? 0,
    "Files",
  ]}
/>

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}