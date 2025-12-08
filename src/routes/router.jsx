import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import AllTickets from "../pages/AllTickets";
import TicketDetails from "../pages/TicketDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/dashboard/user/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/tickets",
        Component: AllTickets,
      },
      {
        path: "/ticket/:id",
        Component: TicketDetails,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },

  // PROTECTED ROUTE (Dashboard)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <UserProfile />,
      },

      // { path: "my-bookings", element: <MyBookedTickets /> },
      // { path: "add-ticket", element: <AddTicket /> },
    ],
  },
]);

export default router;
