import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Navbar from "./Components/Navbar/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import FloatingShape from "./components/FloatingShape";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/userloginSignup/LoginPage";
import SignupPage from "./pages/userloginSignup/SignUpPage";
import Dashboard from "./pages/userloginSignup/DashboardPage";
import FinalComponent from "./Components/final/FinalComponent";

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex flex-col relative overflow-hidden">
      {/* Floating Shapes for UI Effects */}
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Toaster />
      
      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<FinalComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
