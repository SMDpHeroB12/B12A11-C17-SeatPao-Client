import { Link } from "react-router";
import stripeLogo from "../assets/icons/Stripe_Logo.svg";
import Logo from "./Logo/Logo";
import { FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10 pt-10">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div>
          <Logo></Logo>
          <p className="mt-3 text-sm text-gray-400">
            Book bus, train, launch & flight tickets easily. A complete online
            ticket booking experience.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link className="link link-hover" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/tickets">
                All Tickets
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/about">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2">
            <li>Email: seatpao@gmail.com</li>
            <li>Phone: +880 1791 717 966</li>
            <li className="flex items-center">
              <Link
                to="https://www.facebook.com/shekhmdnayem"
                target="_blank"
                className="link link-hover flex items-center gap-2 "
              >
                <FaFacebookSquare size={25} className="text-primary" /> Facebook
                Page
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Payment</h3>
          <Link to="https://stripe.com/" target="_blank">
            <img src={stripeLogo} alt="Stripe" className="h-8 object-contain" />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-5 mt-10 bg-base-300">
        <p className="text-sm">© 2025 SeatPao. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
