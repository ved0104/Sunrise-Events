import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"
import FloatingButtons from "./Components/FloatingButtons";

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
    
    // <ManageBooking/> */}
  
);

export default AppWrapper;
