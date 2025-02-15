import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AppRoutes from "./routes"
import FloatingButtons from "./Components/FloatingButtons";



import BookingTop from "./Components/booking/BookingTop";
import BookingCalendar from "./Components/booking/BookingCalender";
import EndPart from "./Components/homePage/End";
import BookingDecoration from "./Components/booking/bookingDecoration";
import ManageServices from "./Components/admin/ManageServices";
import AddService from "./Components/admin/AddService";
import AllServices from "./Components/booking/AllServices";
import Gallery from "./Components/gallery/Gallery";
import ContactUs from "./Components/other/ContactUs";
import PolicyPage from "./Components/other/PolicyPage";
import EmailVerificationPage from "./pages/admin/EmailVerificationPage";
import Navbar from "./components/Navbar/navbar";
import Instagram from "./Components/homePage/Instagram";
import ForgotPasswordPage from "./pages/admin/ForgotPasswordPage";
import LoginPage from "./pages/admin/LoginPage";
import ResetPasswordPage from "./pages/admin/ResetPasswordPage";
import SignUpPage from "./pages/admin/SignUpPage";

const App = () => {
  return (
    <AppRoutes/>
    // <PolicyPage/>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
    <FloatingButtons/>
    
    

  </Router>
);

export default AppWrapper;
