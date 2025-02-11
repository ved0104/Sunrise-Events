import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import LoginPage from "./pages/userloginSignup/LoginPage";
import SignupPage from "./pages/userloginSignup/SignUpPage";
import Dashboard from "./pages/userloginSignup/DashboardPage";
import FinalComponent from "./Components/final/FinalComponent";

const App = () => {
  // const { isCheckingAuth, checkAuth } = useAuthStore();
  // const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);
  return (
    <>
    <Routes>
    //     <Route path="/" element={<FinalComponent />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/signup" element={<SignupPage />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
