"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  daily: number;
  weekly: number;
  monthly: number;
}

export default function RiskTrendChart({
  daily,
  weekly,
  monthly,
}: Props) {

  const data = [
    {
      name: "Daily",
      scans: daily,
    },
    {
      name: "Weekly",
      scans: weekly,
    },
    {
      name: "Monthly",
      scans: monthly,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="scans"
          fill="#06b6d4"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}