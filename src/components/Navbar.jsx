import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaBars } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import Logo from "./Logo/Logo";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  // Load theme on start
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme
  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Nav links section
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md hover:bg-base-100 ${
              isActive ? "bg-base-100 font-medium" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md hover:bg-base-100 ${
              isActive ? "bg-base-100 font-medium" : ""
            }`
          }
        >
          All Tickets
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md hover:bg-base-100 ${
                isActive ? "bg-base-100 font-medium" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 sticky top-0 shadow z-50">
      <div className="navbar w-11/12 mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <FaBars size={22} />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-60 z-50"
            >
              {navLinks}

              <hr className="my-3" />

              {/* Mobile Auth Section */}
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="btn btn-primary btn-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-outline btn-sm">
                    Register
                  </Link>
                </div>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard/profile">My Profile</Link>
                  </li>
                  <li>
                    <button onClick={logoutUser}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Logo />
        </div>

        {/* CENTER (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3">{navLinks}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={handleThemeToggle}
            className="btn btn-ghost border rounded-full"
          >
            <CgDarkMode size={22} />
          </button>

          {/* Desktop Auth Buttons */}
          {!user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline btn-sm">
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end hidden lg:block">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "/default-user.png"} alt="user" />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-3 p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="font-medium px-2 py-1 border-b">
                  {user.displayName || "User"}
                </li>

                <li>
                  <Link to="/dashboard/profile">My Profile</Link>
                </li>

                <li>
                  <button onClick={logoutUser}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
