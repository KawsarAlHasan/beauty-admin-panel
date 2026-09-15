import { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAdmin } from "../context/AdminContext";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const { adminProfile, refetch } = useAdmin();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      {/* Header */}
      <Header className="bg-[#FFFFFF] sticky top-0 z-10 w-full flex items-center p-0 h-20">
        <Navbar
          adminProfile={adminProfile}
          refetch={refetch}
          showDrawer={showDrawer}
        />
      </Header>

      <Layout>
        {isLargeScreen && (
          <Sider
            className="hidden lg:block h-screen fixed left-0 top-20"
            width={320}
            style={{
              backgroundColor: "#FFFFFF",
              overflow: "auto",
              height: "93vh",
              position: "fixed",
              insetInlineStart: 0,
              bottom: 64,
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            <Sidebar adminProfile={adminProfile} />
          </Sider>
        )}

        <Drawer
          title="Navigation"
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          styles={{
            body: { padding: 0 },
          }}
        >
          <Sidebar adminProfile={adminProfile} onClick={closeDrawer} />
        </Drawer>

        <Layout style={{ marginLeft: isLargeScreen ? 320 : 0 }}>
          <Content>
            <div
              className="p-2 lg:px-6 lg:pt-6 min-h-[88vh]"
              style={{ background: "#e6f0f5" }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
