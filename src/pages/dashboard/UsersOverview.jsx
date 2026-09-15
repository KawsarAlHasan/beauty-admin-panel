import cardImage from "../../assets/images/card.png";
import cardIcon from "../../assets/icons/Frame 2147224222.png";
import cardIcon2 from "../../assets/icons/cardIcon2.png";
import cardIcon3 from "../../assets/icons/cardIcon3.png";
import cardIcon4 from "../../assets/icons/cardIcon4.png";
import cardIcon5 from "../../assets/icons/Frame 2147224228 (3).png";
import cardIcon6 from "../../assets/icons/image3.png";

import { useDashboardOverview } from "../../api/dashboardApi";
import { Spin } from "antd";

function UsersOverview() {
  const { dashboardOverview, isLoading, isError, error, refetch } =
    useDashboardOverview();

  // Error State
  if (isError) {
    return (
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="mainTitle">Dashboard's overview</h2>

        <p className="text-red-500 mt-4">
          {error?.message || "Something went wrong"}
        </p>

        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  // Dynamic Data
  const data = [
    {
      icon: cardIcon,
      title: dashboardOverview?.companyCount || 0,
      subtitle: "Total Clients",
    },
    {
      icon: cardIcon2,
      title: dashboardOverview?.rigCount || 0,
      subtitle: "Total Rigs",
    },
    {
      icon: cardIcon3,
      title: dashboardOverview?.userCount || 0,
      subtitle: "Total Users",
    },
    {
      icon: cardIcon5,
      title: dashboardOverview?.totalApprovedHeatmap || 0,
      subtitle: "Approved Heatmap",
    },
    {
      icon: cardIcon4,
      title: dashboardOverview?.totalPendingHeatmap || 0,
      subtitle: "Pending Heatmap",
    },
    {
      icon: cardIcon6,
      title: `$${ dashboardOverview?.totalSubscriptionBuyMoney.toFixed(2) || 0}`,
      subtitle: "Subscription Revenue",
    },
  ];

  return (
    <div className="bg-white p-2 lg:p-5 rounded-2xl">
      <h2 className="mainTitle">Dashboard's overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-4 mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="pt-7 pl-6 pb-6 rounded-xl bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${cardImage})`,
            }}
          >
            <img src={item.icon} alt="cardIcon" />

            <h1 className="text-white text-[24px] font-semibold mt-6">
              {isLoading ? <Spin size="small" /> : item.title}
            </h1>

            <p className="text-white text-[16px] mt-1">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersOverview;
