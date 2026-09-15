import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuCirclePlay,
  LuUsers,
  LuUserCog,
  LuFolderTree,
  LuBadge,
  LuPackage,
} from "react-icons/lu";

const Sidebar = ({ adminProfile, onClick }) => {
  const location = useLocation();

  const getSelectedKey = () => {
    const path = location.pathname;

    if (path === "/") return ["dashboard"];
    if (path === "/makeup-tutorial") return ["makeup-tutorial"];
    if (path === "/makeup-tutorial" || path.startsWith("/makeup-tutorial/")) {
      return ["makeup-tutorial"];
    }

    if (path === "/users") return ["users"];
    if (path === "/administrators") return ["administrators"];
    if (path === "/category") return ["category"];
    if (path === "/brand") return ["brand"];
    if (path === "/product") return ["product"];

    return ["dashboard"];
  };

  const getFilteredSidebarItems = () => {
    const baseItems = [
      {
        key: "dashboard",
        icon: <LuLayoutDashboard className="!text-[20px]" />,
        label: (
          <Link to="/" className="text-[#002436]">
            Dashboard
          </Link>
        ),
        show: true,
      },
      {
        key: "makeup-tutorial",
        icon: <LuCirclePlay className="!text-[20px]" />,
        label: <Link to="/makeup-tutorial">Makeup Tutorial</Link>,
        show: true,
      },
      {
        key: "users",
        icon: <LuUsers className="!text-[20px]" />,
        label: <Link to="/users">Users</Link>,
        show: true,
      },
      {
        key: "administrators",
        icon: <LuUserCog className="!text-[20px]" />,
        label: <Link to="/administrators">Administrators</Link>,
        show: true,
      },
      {
        key: "category",
        icon: <LuFolderTree className="!text-[20px]" />,
        label: <Link to="/category">Category</Link>,
        show: true,
      },
      {
        key: "brand",
        icon: <LuBadge className="!text-[20px]" />,
        label: <Link to="/brand">Brand</Link>,
        show: true,
      },
      {
        key: "product",
        icon: <LuPackage className="!text-[20px]" />,
        label: <Link to="/product">Product</Link>,
        show: true,
      },
    ];

    return baseItems
      .filter((item) => item.show)
      .map((item) => ({
        ...item,
        children:
          item.children && item.children.length > 0 ? item.children : undefined,
      }))
      .filter((item) => !item.children || item.children.length > 0);
  };

  if (!adminProfile) {
    return (
      <div
        style={{
          width: "256px",
          height: "90vh",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = getFilteredSidebarItems();

  return (
    <div style={{ position: "relative", height: "90vh" }}>
      <Menu
        mode="inline"
        selectedKeys={getSelectedKey()}
        items={sidebarItems}
        onClick={onClick}
        style={{
          height: "calc(100% - 64px)",
          backgroundColor: "#ffffff",
          color: "#002436",
          borderRight: 0,
        }}
      />
    </div>
  );
};

export default Sidebar;
