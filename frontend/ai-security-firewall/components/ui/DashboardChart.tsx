"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  safe: number;
  warning: number;
  danger: number;
};

export default function DashboardChart({
  safe,
  warning,
  danger,
}: Props) {
  const data = [
    { name: "Safe", value: safe },
    { name: "Warning", value: warning },
    { name: "Danger", value: danger },
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];

  return (
    <div className="rounded-xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        Scan Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}