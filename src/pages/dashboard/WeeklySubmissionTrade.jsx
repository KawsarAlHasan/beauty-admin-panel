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

const weeklyData = [
  { week: "1 Week", value: 80 },
  { week: "2 Week", value: 18 },
  { week: "3 Week", value: 48 },
  { week: "4 Week", value: 18 },
  { week: "5 Week", value: 55 },
  { week: "6 Week", value: 18 },
  { week: "7 Week", value: 52 },
  { week: "8 Week", value: 40 },
  { week: "9 Week", value: 52 },
  { week: "10 Week", value: 28 },
  { week: "11 Week", value: 90 },
];

function WeeklySubmissionTrade() {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-blue-900 font-bold text-lg mb-4">
        Weekly Submission Trade
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={weeklyData}
          barSize={22}
          margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            ticks={[0, 5, 10, 15, 20, 50, 80, 90]}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="value" fill="#1e3a8a" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklySubmissionTrade;
