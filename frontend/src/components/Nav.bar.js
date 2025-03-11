import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Appointment Booking
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div className={`md:flex ${menuOpen ? "block" : "hidden"} w-full md:w-auto`}>
          <ul className="md:flex space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0 text-white">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                {user.role === "doctor" && (
                  <li>
                    <Link to="/availability" className="hover:underline">
                      Manage Availability
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
