"use client";

import { useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* MONTHLY DATA (your original data untouched) */

const monthlyData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 18000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 25000 },
  { name: "May", revenue: 14000 },
  { name: "Jun", revenue: 30000 }
];

/* WEEKLY DATA */

const weeklyData = [
  { name: "Mon", revenue: 3000 },
  { name: "Tue", revenue: 4200 },
  { name: "Wed", revenue: 3500 },
  { name: "Thu", revenue: 5200 },
  { name: "Fri", revenue: 4800 },
  { name: "Sat", revenue: 6200 },
  { name: "Sun", revenue: 5500 }
];

export default function SalesChart() {

  /* STATE FOR CHART MODE */

  const [mode,setMode] = useState("monthly");

  const chartData = mode === "weekly" ? weeklyData : monthlyData;

  return (

    <div className="space-y-4">

      {/* BUTTONS */}

      <div className="flex gap-2">

        <button
          onClick={()=>setMode("weekly")}
          className={`px-3 py-1 text-xs rounded ${
            mode==="weekly"
            ? "bg-yellow-400 text-black font-medium"
            : "bg-gray-100"
          }`}
        >
          Weekly
        </button>

        <button
          onClick={()=>setMode("monthly")}
          className={`px-3 py-1 text-xs rounded ${
            mode==="monthly"
            ? "bg-yellow-400 text-black font-medium"
            : "bg-gray-100"
          }`}
        >
          Monthly
        </button>

      </div>


      {/* CHART (unchanged structure) */}

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData}>

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

    </div>

  );

}