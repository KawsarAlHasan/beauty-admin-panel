import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#22c55e",
  "#06b6d4",
  "#f59e0b",
  "#1d4ed8",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#84cc16",
  "#ec4899",
];

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name, value }) => {
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#374151"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={11}
    >
      {name}
    </text>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg">
        <p className="text-sm font-semibold">{data.name}</p>
        <p className="text-xs text-slate-300 mt-1">
          Total Cards:{" "}
          <span className="font-bold text-white">{data.value}</span>
        </p>
      </div>
    );
  }

  return null;
};

function CardByClient({ cardByCompany = [] }) {
  const chartData = useMemo(() => {
    const shuffledColors = [...COLORS].sort(() => Math.random() - 0.5);

    return cardByCompany.map((item, index) => ({
      companyId: item.companyId,
      name: item.companyName,
      value: item.totalCards,
      color: shuffledColors[index % COLORS.length],
    }));
  }, [cardByCompany]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="mainTitle">Card by Client</h2>

      <ResponsiveContainer width="100%" height={255}>
        <PieChart>
          <Tooltip content={<CustomTooltip />} />

          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            label={renderCustomLabel}
            labelLine
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.companyId || index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center flex-wrap gap-4 mt-2">
        {chartData.map((item) => (
          <div
            key={item.companyId}
            className="flex items-center gap-1.5 text-xs text-gray-600"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardByClient;
