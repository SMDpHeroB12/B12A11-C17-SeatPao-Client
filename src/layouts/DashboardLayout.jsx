import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch User Role From MongoDB
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data?.role || "user");
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="w-11/12 mx-auto py-8 grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="col-span-1 lg:col-span-2">
          <div className="bg-base-200 p-4 rounded-xl shadow">
            <div className="sm:flex sm:items-center sm:justify-between gap-4 mb-4">
              <div className=" flex items-center gap-4 mb-4">
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
              <div className="text-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2  bg-accent font-medium text-white rounded-md hover:bg-base-100 hover:text-accent ${
                      isActive ? "bg-base-100 font-medium" : ""
                    }`
                  }
                >
                  Go to Home
                </NavLink>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {/* USER MENU */}
              {role === "user" && (
                <>
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
                </>
              )}

              {/* VENDOR MENU */}
              {role === "vendor" && (
                <>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    Vendor Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/vendor"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    Vendor Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/add-ticket"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    Add Ticket
                  </NavLink>

                  <NavLink
                    to="/dashboard/my-tickets"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    My Tickets
                  </NavLink>
                </>
              )}

              {/* ADMIN MENU */}
              {role === "admin" && (
                <>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    Admin Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    Manage Users
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-tickets"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? "bg-base-100 font-medium" : ""
                      }`
                    }
                  >
                    Manage Tickets
                  </NavLink>
                </>
              )}
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
