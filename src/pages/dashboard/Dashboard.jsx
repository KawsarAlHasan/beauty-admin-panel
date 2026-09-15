import React from "react";
import { useDashboardOverview } from "../../api/dashboardApi";
import { Typography, Table, Tag, Avatar, Spin } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  TagsOutlined,
  AppstoreOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

function Dashboard() {
  const { dashboardOverview, isLoading, isError, error, refetch } =
    useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  const { overview, recentUsers, recentProducts } = dashboardOverview || {};

  const statCards = [
    {
      title: "Total Users",
      value: overview?.totalUsers || 0,
      icon: <UserOutlined className="text-[40px] text-white opacity-90" />,
      bg: "bg-gradient-to-br from-pink-500 via-rose-500 to-red-400",
      shadow: "shadow-pink-200",
    },
    {
      title: "Total Products",
      value: overview?.totalProducts || 0,
      icon: <ShoppingOutlined className="text-[40px] text-white opacity-90" />,
      bg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500",
      shadow: "shadow-purple-200",
    },
    {
      title: "Total Brands",
      value: overview?.totalBrands || 0,
      icon: <TagsOutlined className="text-[40px] text-white opacity-90" />,
      bg: "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400",
      shadow: "shadow-blue-200",
    },
    {
      title: "Total Categories",
      value: overview?.totalCategories || 0,
      icon: <AppstoreOutlined className="text-[40px] text-white opacity-90" />,
      bg: "bg-gradient-to-br from-emerald-500 via-green-500 to-lime-400",
      shadow: "shadow-emerald-200",
    },
    {
      title: "Total Tutorials",
      value: overview?.totalTutorials || 0,
      icon: (
        <PlaySquareOutlined className="text-[40px] text-white opacity-90" />
      ),
      bg: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400",
      shadow: "shadow-orange-200",
    },
  ];

  const userColumns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => {
        const initials = record.name
          ? record.name.substring(0, 2).toUpperCase()
          : "U";
        return (
          <div className="flex items-center gap-3">
            <Avatar
              size="large"
              className="bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center font-bold text-white shadow-sm"
            >
              {initials}
            </Avatar>
            <div>
              <div className="font-bold text-gray-800 text-[15px]">
                {record.name}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {record.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className="text-gray-600 font-medium">
          {dayjs(date).format("DD MMM YYYY")}
        </span>
      ),
    },
  ];

  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className="font-semibold text-gray-800 text-[15px]">{text}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Tag
          color="purple"
          className="font-bold px-3 py-1 text-sm rounded-full border-none bg-purple-100 text-purple-700"
        >
          ${price}
        </Tag>
      ),
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className="text-gray-600 font-medium">
          {dayjs(date).format("DD MMM YYYY")}
        </span>
      ),
    },
  ];

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        <Title level={4} type="danger">
          Failed to load dashboard data
        </Title>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <Title level={2} className="!m-0 !text-gray-800 !font-bold">
          Dashboard Overview
        </Title>
        <Text className="text-gray-500 text-base font-medium mt-1 inline-block">
          Welcome back! Here's what's happening in your app today.
        </Text>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} ${stat.shadow} rounded-3xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group cursor-pointer`}
          >
            <div className="relative z-10">
              <h3 className="text-white/90 font-semibold text-lg mb-2 tracking-wide">
                {stat.title}
              </h3>
              <div className="text-4xl font-extrabold tracking-tight">
                {stat.value}
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -bottom-6 -right-6 bg-white/20 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute top-6 right-6 opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 xl:p-8 hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <Title
              level={4}
              className="!m-0 !text-gray-800 !font-bold flex items-center gap-2"
            >
              <UserOutlined className="text-pink-500" />
              Recent Users
            </Title>
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={userColumns}
              dataSource={recentUsers || []}
              rowKey="id"
              pagination={false}
              className="custom-dashboard-table"
              rowClassName="hover:bg-gray-50/50 transition-colors"
            />
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 xl:p-8 hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <Title
              level={4}
              className="!m-0 !text-gray-800 !font-bold flex items-center gap-2"
            >
              <ShoppingOutlined className="text-purple-500" />
              Recent Products
            </Title>
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={productColumns}
              dataSource={recentProducts || []}
              rowKey="id"
              pagination={false}
              className="custom-dashboard-table"
              rowClassName="hover:bg-gray-50/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
