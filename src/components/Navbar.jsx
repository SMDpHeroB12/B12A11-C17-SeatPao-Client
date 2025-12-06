import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const user = null;
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/tickets" className="font-medium">
          All Tickets
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard" className="font-medium">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 sticky top-0 shadow z-50">
      <div className="navbar w-11/12 mx-auto">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile menu button */}
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars size={20} />
            </button>

            {isOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
              >
                {navLinks}
              </ul>
            )}
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Seat<span className="text-primary">Pao</span>
          </Link>
        </div>

        {/* Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline btn-sm">
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <img alt="user" className="rounded-full" src={user.photoURL} />
              </div>

              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
              >
                <li>
                  <Link to="/dashboard/profile">My Profile</Link>
                </li>
                <li>
                  <button>Logout</button>
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
