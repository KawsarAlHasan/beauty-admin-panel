import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
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
      <div className="bg-blue-800 text-white px-4 py-3 rounded-lg shadow-lg">
        <p className="text-xs text-blue-200">{data.date}</p>
        <p className="text-lg font-bold">${data.money.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

function SubscribtionBuyTrend({ subscribtionBuyTrend = [] }) {
  const chartData = useMemo(() => {
    return subscribtionBuyTrend.map((item) => ({
      fullDate: item.date,
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      money: Number(item.money),
    }));
  }, [subscribtionBuyTrend]);

  // Y-axis max value dynamically
  const maxValue = Math.max(...chartData.map((item) => item.money), 0) + 20;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="mainTitle">Subscription Buy Trend</h2>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.02} />
            </linearGradient>
          </defs>

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
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            domain={[0, maxValue]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="money"
            stroke="#1d4ed8"
            strokeWidth={2.5}
            fill="url(#growthGrad)"
            dot={false}
            activeDot={{
              r: 6,
              fill: "#1d4ed8",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SubscribtionBuyTrend;
