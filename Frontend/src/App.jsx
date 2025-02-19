import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"
import FloatingButtons from "./Components/FloatingButtons";
import ScrollToTop from "./Components/other/ScrollToTop";
import CustomBookingForm from "./components/booking/CustomService";
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes/>
    </Router>
    
  );
};

const AppWrapper = () => (
  <>
    <App />
    <FloatingButtons/>
    <CustomBookingForm/>
    </>
);

export default AppWrapper;
