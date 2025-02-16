import { motion, AnimatePresence } from "framer-motion";
import React from "react";
const ResponsiveMenu = ({ open, setOpen }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-2/3 h-screen bg-primary text-white z-20 p-6"
        >
          <ul
            className="flex flex-col gap-6 text-xl font-semibold"
            onClick={() => setOpen(false)}
          >
            <li>Home</li>
            <li>About</li>
            <li>Service</li>
            <li>Contact</li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
