import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CardByClient from "./CardByClient";
import SubscribtionBuyTrend from "./SubscribtionBuyTrend";
import PlatformUsageTrend from "./PlatformUsageTrend";
import TopClientsByActivity from "./TopClientsByActivity";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-lg text-center">
        <p className="text-xs text-blue-200">Trend</p>
        <p className="text-2xl font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;

export default function Dashboard({ dashboardData }) {
  return (
    <div className=" mt-4 mb-2 ">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`* { font-family: 'DM Sans', sans-serif; }`}</style>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 mt-4 lg:mt-5">
        {/* Platform Usage Trend */}
        <PlatformUsageTrend
          platformUsageTrend={dashboardData?.platformUsageTrend}
        />

        {/* Top Clients by Activity */}
        <TopClientsByActivity
          topClientsByActivity={dashboardData?.topClientsByActivity}
        />

        {/* Card by Client */}
        <CardByClient cardByCompany={dashboardData?.cardByCompany} />

        {/* Platform Growth */}
        <SubscribtionBuyTrend
          subscribtionBuyTrend={dashboardData?.subscribtionBuyTrend}
        />
      </div>
    </div>
  );
}
