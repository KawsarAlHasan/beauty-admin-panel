import React, { useMemo } from "react";
import {
  LineChart,
  Line,
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
        <p className="text-xs text-blue-200 mb-2">{data.date}</p>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span>Total Cards:</span>
            <span className="font-semibold">{data.totalCards}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span>Total Debriefs:</span>
            <span className="font-semibold">{data.totalDebriefs}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span>New Users:</span>
            <span className="font-semibold">{data.totalNewUsers}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span>Game Submissions:</span>
            <span className="font-semibold">{data.totalGameSubmissions}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

function PlatformUsageTrend({ platformUsageTrend = [] }) {
  const chartData = useMemo(() => {
    return platformUsageTrend.map((item) => ({
      fullDate: item.date,
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      used: item.used,
      totalCards: item.totalCards,
      totalDebriefs: item.totalDebriefs,
      totalNewUsers: item.totalNewUsers,
      totalGameSubmissions: item.totalGameSubmissions,
    }));
  }, [platformUsageTrend]);

  const maxValue = Math.max(...chartData.map((item) => item.used), 0) + 5;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="mainTitle">Platform Usage Trend</h2>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, maxValue]}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="used"
            stroke="#1d4ed8"
            strokeWidth={2.5}
            dot={{
              fill: "#fff",
              stroke: "#1d4ed8",
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              fill: "#1d4ed8",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlatformUsageTrend;
