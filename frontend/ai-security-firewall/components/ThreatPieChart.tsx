"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#8b5cf6",
  "#22c55e",
];

export default function ThreatPieChart() {

  const data = [
    {
      name: "Malware",
      value: 12,
    },
    {
      name: "Phishing",
      value: 5,
    },
    {
      name: "Prompt Injection",
      value: 2,
    },
    {
      name: "Safe",
      value: 41,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}