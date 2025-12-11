import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ErrorPage from "../pages/ErrorPage";

import AllTickets from "../pages/AllTickets";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PrivateRoute from "./PrivateRoute";

// Dashboard Pages

import MyBookings from "../pages/dashboard/MyBookings";
import Transactions from "../pages/dashboard/Transactions";

import AddTicket from "../pages/dashboard/AddTicket";
import MyTickets from "../pages/dashboard/MyTickets";

import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageTickets from "../pages/dashboard/ManageTickets";
import Home from "../pages/Home/Home";

import Profile from "../pages/dashboard/Profile";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import VendorDashboard from "../pages/dashboard/Vendor/VendorDashboard";
import Payment from "../pages/dashboard/Payment";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import PaymentPage from "../pages/Payment/PaymentPage";

const router = createBrowserRouter([
  // MAIN WEBSITE LAYOUT =====================
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", Component: Home },
      { path: "/tickets", Component: AllTickets },
      { path: "/ticket/:id", Component: TicketDetails },
    ],
  },

  // AUTH ROUTES =============================
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },

  // DASHBOARD ROUTES (Protected) ===========
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "/dashboard/payment/:id",
      //   element: <Payment />,
      //   loader: ({ params }) =>
      //     fetch(`${import.meta.env.VITE_API_URL}/bookings/${params.id}`),
      // },
      // { path: "/payment/:id", Component: PaymentPage },
      { path: "profile", Component: Profile },
      { path: "my-bookings", Component: MyBookings },
      { path: "transactions", Component: Transactions },

      // Vendor

      {
        path: "/dashboard/vendor",
        element: (
          <VendorRoute>
            <VendorDashboard />
          </VendorRoute>
        ),
      },
      { path: "add-ticket", Component: AddTicket },
      { path: "my-tickets", Component: MyTickets },

      // Admin
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>{" "}
          </AdminRoute>
        ),
      },
      { path: "manage-users", Component: ManageUsers },
      { path: "manage-tickets", Component: ManageTickets },
    ],
  },
  {
    path: "/payment/:id",
    element: (
      <PrivateRoute>
        <PaymentPage />
      </PrivateRoute>
    ),
  },
]);

export default router;
