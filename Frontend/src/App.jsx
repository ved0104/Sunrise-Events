import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import TopComponnent from "./Components/homePage/Top";
import ServiceComponent from "./Components/homePage/ServiceComponent";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import FloatingShape from "./components/FloatingShape";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes"; // Import the new routes file
const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
    <div
      className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <AppRoutes /> {/* Use the extracted routes */}
      <Toaster />
    </div>
    <div className="overflow-x-hidden">
      <Navbar />
      <TopComponnent />
      <ServiceComponent />
    </div>
    </>
  );
};
export default App;
