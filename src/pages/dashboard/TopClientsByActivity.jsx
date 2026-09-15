import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-blue-800 text-white px-4 py-3 rounded-lg shadow-lg min-w-[180px]">
        <p className="text-xs text-blue-200 mb-2">{data.clientName}</p>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span>Total Activity:</span>
            <span className="font-semibold">{data.totalActivity}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span>Total Cards:</span>
            <span className="font-semibold">{data.totalCards}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span>Total Debriefs:</span>
            <span className="font-semibold">{data.totalDebriefs}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

function TopClientsByActivity({ topClientsByActivity = [] }) {
  const chartData = useMemo(() => {
    return topClientsByActivity.map((item) => ({
      clientId: item.clientId,
      clientName: item.clientName,
      totalActivity: item.totalActivity,
      totalCards: item.totalCards,
      totalDebriefs: item.totalDebriefs,
    }));
  }, [topClientsByActivity]);

  const maxValue =
    Math.max(...chartData.map((item) => item.totalActivity), 0) + 5;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mainTitle">Top Clients by Activity</h2>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />

          <XAxis
            dataKey="clientName"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, maxValue]}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "#eff6ff" }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="totalActivity"
            fill="#1d4ed8"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopClientsByActivity;