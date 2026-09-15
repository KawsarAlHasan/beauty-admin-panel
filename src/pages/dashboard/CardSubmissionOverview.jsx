import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 390 },
  { month: "Mar", value: 95 },
  { month: "Apr", value: 130 },
  { month: "May", value: 155 },
  { month: "Jun", value: 300, forecast: 200 },
];

function CardSubmissionOverview() {
  const [activeFilter, setActiveFilter] = useState("Week");

  return (
    <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-blue-900 font-bold text-lg">
          Card Submission Overview
        </h2>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden text-sm">
          {["Week", "Month", "Year"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 font-medium transition-colors ${
                activeFilter === f
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={monthlyData}
          barSize={50}
          margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            ticks={[0, 100, 200, 300, 400, 500]}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="value" stackId="a" radius={[0, 0, 0, 0]}>
            {monthlyData.map((entry, index) => (
              <Cell key={index} fill="#1e3a8a" />
            ))}
          </Bar>
          <Bar
            dataKey="forecast"
            stackId="a"
            radius={[4, 4, 0, 0]}
            fill="#dbeafe"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CardSubmissionOverview;
