import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarMenu } from "../../mockData/data";
import { MdClose } from "react-icons/md";

const ResponsiveMenu = ({
  open,
  setOpen,
  isAuthenticated,
  isAdmin,
  user,
  handleLogout,
}) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full max-w-sm h-screen bg-white text-black z-50 shadow-2xl"
        >
          <div className="p-6">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col gap-4">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="block px-4 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-3 text-lg font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>

            {/* Auth Buttons */}
            <div className="mt-8 border-t pt-6">
              {(!isAuthenticated && !isAdmin) ? (
                <div className="flex flex-col gap-4">
                  <button
                    className="w-full text-left px-4 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setOpen(false);
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setOpen(false);
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    className="w-full text-left px-4 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors text-red-500"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={user?.profilePicture || "https://via.placeholder.com/40"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                    />
                    <span className="text-lg font-medium">Profile</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
