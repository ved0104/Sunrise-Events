import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-pink-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Sunrise Events Logo */}
      <img src={logo} alt="Sunrise Events" className="w-32 h-32 mb-6" />

      {/* Loading Spinner with Delay */}
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-pink-500 border-pink-300 rounded-full"
        initial={{ rotate: 0 }} // Start at 0 degrees
        animate={{ rotate: 360 }} // Rotate infinitely
        transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.5 }} // 0.5s delay
      />
    </div>
  );
};

export default LoadingSpinner;
