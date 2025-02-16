import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"
import FloatingButtons from "./Components/FloatingButtons";

import EmailVerificationPage from "./pages/userloginSignup/EmailVerificationPage";


import Booking from "./pages/service-view/Booking";
import Gallery from "./pages/service-view/Gallery";
const App = () => {
  return (
    <Router>
      <AppRoutes/>
    </Router>
    
  );
};

const AppWrapper = () => (
  <>
    <App />
    <FloatingButtons/>
    

 </>
);

export default AppWrapper;
