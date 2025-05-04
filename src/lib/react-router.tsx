import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CalendarPage } from "../pages/CalendarPage";
import { MyGardenPage } from "../pages/MyGardenPage";
import { AccountPage } from "../pages/AccountPage";
import { Layout } from "../components/Layout";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "calendar",
          element: <CalendarPage />,
        },
        {
          path: "my-garden",
          element: <MyGardenPage />,
        },
        {
          path: "account",
          element: <AccountPage />,
        },
      ],
    },
  ]);
