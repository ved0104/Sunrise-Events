import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavbarMenu } from "../../mockData/data";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/authStore";
import { useAdminAuthStore } from "../../store/adminAuthStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Get user data from both stores
  const { user, isAuthenticated, logout: userLogout } = useAuthStore();
  const { user: adminUser, isAuthenticated: isAdminAuthenticated, logout: adminLogout } =
    useAdminAuthStore();

  // Determine admin status
  const isUserAdmin = user && user.role === "admin";
  const isAdminFromStore = adminUser && isAdminAuthenticated;
  const isAdmin = isAdminFromStore || isUserAdmin;

  const handleLogout = async () => {
    try {
      if (isAdmin) {
        if (isAdminFromStore) {
          await adminLogout();
        } else {
          await userLogout();
        }
      } else {
        await userLogout();
      }
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("userAuthenticated"));
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Close mobile menu when clicking outside the hamburger button
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
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto max-w-screen flex justify-between items-center py-4 px-3">
          {/* Logo Section */}
          <div className="flex items-center gap-2 font-bold uppercase">
            <img 
              src={logo} 
              alt="logo" 
              className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto" 
            />
            <div className="flex items-center gap-1">
              <p className="text-md sm:text-lg md:text-xl">Sunrise</p>
              <p className="text-pink-600 text-md sm:text-lg md:text-xl">Events</p>
            </div>
          </div>

          {/* Navigation Links - visible on md and up */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6 text-gray-700">
              {NavbarMenu.map((item) => (
                <li key={item.id} className="relative">
                  <Link
                    to={item.link}
                    className="py-2 px-3 font-semibold text-sm sm:text-base relative 
                      before:absolute before:left-0 before:bottom-0 before:w-full before:h-0 before:bg-black 
                      before:transition-all before:duration-300 hover:before:h-0.5"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="py-2 px-3 font-semibold text-sm sm:text-base relative 
                      before:absolute before:left-0 before:bottom-0 before:w-full before:h-0 before:bg-red-500 
                      before:transition-all before:duration-300 hover:before:h-0.5"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Action Buttons - Desktop (visible on md and up) */}
          <div className="hidden lg:flex items-center gap-4">
            {(!isAuthenticated && !isAdmin) ? (
              <>
                <button
                  className="hover:bg-black hover:text-white text-black font-semibold rounded-md border-2 border-black px-4 py-2 text-sm transition-all"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="hover:bg-pink-500 hover:text-white text-pink-500 font-semibold rounded-md border-2 border-pink-500 px-4 py-2 text-sm transition-all"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  className="hover:bg-red-500 hover:text-white text-red-500 font-semibold rounded-md border-2 border-red-500 px-4 py-2 text-sm transition-all"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <img
                  src={user?.profilePicture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border-2 border-gray-300 object-cover"
                />
              </div>
            )}
          </div>

          {/* Mobile Section: Hamburger Icon & Auth Links */}
          <div className="lg:hidden flex items-center gap-2 menu-container">
            {/* On mobile top bar, only show Signup (Login will be in the sidebar) */}
            {(!isAuthenticated && !isAdmin) && (
              <button
                className="hover:bg-pink-500 hover:text-white text-pink-500 font-semibold rounded-md border-2 border-pink-500 px-3 py-1 text-sm transition-all"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            )}
            <div
              className="cursor-pointer p-2"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              <MdMenu className="text-3xl" />
            </div>
          </div>
        </div>
      </nav>

      {/* Glass Effect Overlay for Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-lg z-40"></div>
      )}

      {/* Mobile Sidebar Menu */}
      <ResponsiveMenu
        open={open}
        setOpen={setOpen}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        user={user}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
