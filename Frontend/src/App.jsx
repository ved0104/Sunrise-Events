import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"
import FloatingButtons from "./Components/FloatingButtons";
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
