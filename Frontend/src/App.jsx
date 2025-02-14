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

const App = () => {
  return (
    <AppRoutes/>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
    <FloatingButtons/>
    {/* <AllServices/> */}
    <AddService/>
  </Router>
);

export default AppWrapper;
