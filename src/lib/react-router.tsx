import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CalendarPage } from "../pages/CalendarPage";
import { MyGardenPage } from "../pages/MyGardenPage";
import { BordersPage } from "../pages/BordersPage";
import { AccountPage } from "../pages/AccountPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AddPlantPage } from "../pages/AddPlantPage";
import { EditPlantPage } from "../pages/EditPlantPage";
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
          path: "borders",
          element: <BordersPage />,
          loader: protectedLoader,
        },
        {
          path: "borders/new",
          element: <BordersPage />,
          loader: protectedLoader,
        },
        {
          path: "borders/:id/edit",
          element: <BordersPage />,
          loader: protectedLoader,
        },
        {
          path: "account",
          element: <AccountPage />,
          loader: protectedLoader,
        },
        {
          path: "plants/add",
          element: <AddPlantPage />,
          loader: protectedLoader,
        },
        {
          path: "plants/:id/edit",
          element: <EditPlantPage />,
          loader: protectedLoader,
        },
      ],
    },
  ]);
