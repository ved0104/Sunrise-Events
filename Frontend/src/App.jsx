import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import TopComponnent from "./Components/homePage/Top";
import ServiceComponent from "./Components/homePage/ServiceComponent";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <TopComponnent />
      <ServiceComponent />
    </div>
  );
};

export default App;