import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CalendarPage } from "../pages/CalendarPage";
import { MyGardenPage } from "../pages/MyGardenPage";
import { AccountPage } from "../pages/AccountPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { Layout } from "../components/Layout";
import { protectedLoader, publicLoader } from "./auth";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: publicLoader,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      loader: publicLoader,
    },
    {
      path: "/",
      element: <Layout />,
      loader: protectedLoader,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: protectedLoader,
        },
        {
          path: "calendar",
          element: <CalendarPage />,
          loader: protectedLoader,
        },
        {
          path: "my-garden",
          element: <MyGardenPage />,
          loader: protectedLoader,
        },
        {
          path: "account",
          element: <AccountPage />,
          loader: protectedLoader,
        },
      ],
    },
  ]);
