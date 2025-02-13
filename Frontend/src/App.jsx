import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AppRoutes from "./routes"
import FloatingButtons from "./Components/FloatingButtons";



import BookingTop from "./Components/booking/BookingTop";
import BookingCalendar from "./Components/booking/BookingCalender";
import EndPart from "./Components/homePage/End";
import BookingDecoration from "./Components/booking/bookingDecoration";

const App = () => {
  return (
    <AppRoutes/>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
    <FloatingButtons/>
  </Router>
);

export default AppWrapper;
