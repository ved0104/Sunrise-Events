import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarMenu } from "../../mockData/data";
import { CiSearch } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const user = localStorage.getItem("user"); // Fetch user from localStorage
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container") && open) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <>
      <nav className="relative z-30 border-b border-gray-200">
        <div className="container flex justify-between items-center pt-5 pb-3 px-6 md:px-12">
          {/* Logo Section */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <img src={logo} alt="logo" className="h-10 w-auto" />
            <p>Sunrise</p>
            <p className="text-pink-600">Events</p>
          </div>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-8 text-black-700">
              {NavbarMenu.map((item) => (
                <li key={item.id} className="relative">
                  <Link
                    to={item.link}
                    className="inline-block py-2 px-4 font-semibold transition duration-200 
                    relative before:absolute before:left-0 before:bottom-[-6px] before:w-full before:h-0 
                    before:bg-black before:transition-all before:duration-300 
                    hover:before:h-[3px]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {/* <CiLocationOn /> */}
            </ul>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-6">
            <button className="text-2xl hover:bg-pink-500 hover:text-white rounded-full p-2 transition duration-200">
              <CiSearch />
            </button>

            {/* Show Login/Signup if not authenticated */}
            {!isAuthenticated ? (
              <>
                <button
                  className="hover:bg-black text-black font-semibold hover:text-white rounded-md border-2 border-black px-6 py-2 transition duration-200 hidden md:block"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="hover:bg-pink-500 text-pink-500 font-semibold hover:text-white rounded-md border-2 border-pink-500 px-6 py-2 transition duration-200 hidden md:block"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </>
            ) : (
              // Show Logout if authenticated
              <button
                className="hover:bg-red-500 text-red-500 font-semibold hover:text-white rounded-md border-2 border-red-500 px-6 py-2 transition duration-200 hidden md:block"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div
            className="md:hidden cursor-pointer menu-container"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Background overlay when menu is open */}
      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>}

      {/* Mobile Sidebar Menu */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
