import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavbarMenu } from "../../mockData/data";
import { CiSearch } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkUser = () => {
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const userObj = JSON.parse(userString);
          setIsAuthenticated(true);
          // Check if user role is admin
          if (userObj.role && userObj.role.toLowerCase() === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error parsing user from localStorage", error);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkUser();

    // Listen for login/logout updates across components
    window.addEventListener("userAuthenticated", checkUser);
    window.addEventListener("storage", checkUser); // Sync across browser tabs

    return () => {
      window.removeEventListener("userAuthenticated", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  // Logout function (same for admin and regular users)
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user"); // Remove user data
    window.dispatchEvent(new Event("userAuthenticated")); // Notify all components
    setIsAuthenticated(false);
    setIsAdmin(false);
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
      <nav className="fixed top-0 left-0 right-0 z-30 border-b border-gray-200 bg-white">
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
              {/* Render admin options if user is admin */}
              {isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="inline-block py-2 px-4 font-semibold transition duration-200 
                        relative before:absolute before:left-0 before:bottom-[-6px] before:w-full before:h-0 
                        before:bg-red-500 before:transition-all before:duration-300 
                        hover:before:h-[3px]"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/users"
                      className="inline-block py-2 px-4 font-semibold transition duration-200 
                        relative before:absolute before:left-0 before:bottom-[-6px] before:w-full before:h-0 
                        before:bg-red-500 before:transition-all before:duration-300 
                        hover:before:h-[3px]"
                    >
                      Manage Users
                    </Link>
                  </li>
                </>
              )}
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
              // Show Logout for authenticated users (admin or regular)
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
