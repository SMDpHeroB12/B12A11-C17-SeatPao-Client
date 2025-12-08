import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import Logo from "./Logo/Logo";

const Navbar = () => {
  const user = null;

  // Load theme on start
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme handler
  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/tickets">All Tickets</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 sticky top-0 shadow z-50">
      <div className="navbar w-11/12 mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE DROPDOWN */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <FaBars size={22} />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-60 z-50"
            >
              {/* Nav Links */}
              {navLinks}

              <hr className="my-3" />

              {/* Login + Register buttons on MOBILE */}
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
                    <button>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Logo />
        </div>

        {/* CENTER (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3">{navLinks}</ul>
        </div>

        {/* RIGHT (Both Views) */}
        <div className="navbar-end flex items-center gap-3">
          {/* Theme Toggle */}
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
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <img alt="user" className="rounded-full" src={user?.photoURL} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
