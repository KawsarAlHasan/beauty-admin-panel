import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/Login";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import SetNewPassword from "../pages/authentication/SetNewPassword";
import CheckCode from "../pages/authentication/CheckCode";
import MainLayout from "../layout/MainLayout";
import NotFound from "../components/NotFound";
import Unauthorized from "../components/Unauthorized";
import { AdminProvider } from "../context/AdminContext";
import Administrators from "../pages/administrators/Administrators";
import Dashboard from "../pages/dashboard/Dashboard";
import MakeupTutorial from "../pages/makeup-tutorial/MakeupTutorial";
import Users from "../pages/users/Users";
import Category from "../pages/category/Category";
import Brand from "../pages/brand/Brand";
import Product from "../pages/product/Product";
import Steps from "../pages/makeup-tutorial/steps/Steps";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/check-code",
    element: <CheckCode />,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: (
      <AdminProvider>
        <MainLayout />
      </AdminProvider>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/makeup-tutorial",
        element: <MakeupTutorial />,
      },
      {
        path: "/makeup-tutorial/:tutorialId",
        element: <Steps />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/administrators",
        element: <Administrators />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/brand",
        element: <Brand />,
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
