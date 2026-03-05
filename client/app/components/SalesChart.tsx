"use client";

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 18000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 25000 },
  { name: "May", revenue: 14000 },
  { name: "Jun", revenue: 30000 }
];

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#facc15" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <XAxis dataKey="name" stroke="#94a3b8" />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#eab308"
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />

      </AreaChart>
    </ResponsiveContainer>
  );
}