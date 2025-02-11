import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure you're using AppRoutes

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
