import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AppRoutes from "./routes"



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
  </Router>
);

// const App=()=>{
//   return(
//     <div className="flex flex-col justify-center items-center">
//       <div className="bg-amber-50 w-300 my-12 rounded-3xl border-2 border-amber-100">
//         <BookingTop/>
//         <BookingCalendar/>
//       </div>
//       <BookingDecoration/>
//       <EndPart/>
//     </div>
//   )
// }

export default AppWrapper;
//export default App;