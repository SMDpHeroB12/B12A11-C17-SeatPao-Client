import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="w-11/12 mx-auto py-8 grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="col-span-1 lg:col-span-2">
          <div className="bg-base-200 p-4 rounded-xl shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user?.photoURL || "/default-user.png"}
                alt="avatar"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold">{user?.displayName || "User"}</p>
                <p className="text-sm opacity-70">{user?.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md hover:bg-base-100 ${
                    isActive ? "bg-base-100 font-medium" : ""
                  }`
                }
              >
                My Profile
              </NavLink>

              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md hover:bg-base-100 ${
                    isActive ? "bg-base-100 font-medium" : ""
                  }`
                }
              >
                My Booked Tickets
              </NavLink>

              <NavLink
                to="/dashboard/transactions"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md hover:bg-base-100 ${
                    isActive ? "bg-base-100 font-medium" : ""
                  }`
                }
              >
                Transaction History
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-1 lg:col-span-4">
          <div className="bg-white dark:bg-base-200 p-6 rounded-xl shadow">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
