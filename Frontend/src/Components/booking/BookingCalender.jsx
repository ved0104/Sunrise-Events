import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Set the owner's phone number here (include country code, e.g., "+1234567890")
const OWNER_PHONE = "+917970186027";

const BookingCalendar = () => {
  const { id } = useParams();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Booking is created only when user clicks Confirm Booking
  const confirmBooking = async () => {
    if (!selectedDate) {
      toast.warning("Please select a date first!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      
      const bookingResponse = await axios.post(
        `http://localhost:5000/users/services/${id}/booking`,
        { date: selectedDate },
        { withCredentials: true }
      );
      
      // Set both user and booking info from the response
      setUser(bookingResponse.data.newBooking.user);
      setBooking(bookingResponse.data.newBooking.service);
      toast.success("Booking confirmed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to confirm booking. Please log in first!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (month, year) =>
    new Date(year, month - 1, 1).getDay();

  const generateDates = () => {
    const totalDays = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayIndex = getFirstDayOfMonth(selectedMonth, selectedYear);
    let dates = [];
    for (let i = 0; i < firstDayIndex; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      let date = `${selectedYear}-${String(selectedMonth).padStart(
        2,
        "0"
      )}-${String(i).padStart(2, "0")}`;
      dates.push(date);
    }
    return dates;
  };

  const handleMonthChange = (step) => {
    let newMonth = selectedMonth + step;
    let newYear = selectedYear;
    if (newMonth === 0) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth === 13) {
      newMonth = 1;
      newYear += 1;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setSelectedDate(null);
    // Reset booking info when the month changes
    setBooking(null);
    setUser(null);
  };

  const handleDateClick = (date) => {
    const clickedDate = new Date(date);
    if (clickedDate >= today) {
      setSelectedDate(date);
      // Clear any previous booking info when a new date is selected
      setBooking(null);
      setUser(null);
    }
  };

  // Use the owner's phone number to generate the WhatsApp invoice
  const generateWhatsAppInvoice = () => {
    if (!user) {
      console.error("User info is not available");
      return;
    }
    const invoiceMessage = `Hello ${user.name},\n\nYour booking for Sunrise Events on ${selectedDate} is confirmed!\n\nDetails:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phonenumber}\n\nThank you for choosing us! 🎉`;
    const encodedMessage = encodeURIComponent(invoiceMessage);
    window.open(
      `https://wa.me/${OWNER_PHONE}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="flex justify-center pb-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex justify-center border-2 bg-white border-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-center items-center border-gray-200 border-2 w-full p-4 sm:p-5 bg-gray-50 rounded-xl">
          {/* Image Container with Increased Size on Small Devices */}
          <div className="bg-[url('assets/images/booking/calender.png')] w-full sm:w-96 h-48 sm:h-130 bg-center bg-contain bg-no-repeat text-center pt-12 sm:pt-50">
            <h2 className="font-bold text-2xl sm:text-3xl">Sunrise Events</h2>
            <p className="font-medium text-base sm:text-lg">
              Decoration Booking
              <br />
              Appointment
            </p>
          </div>

          {/* Always render the calendar */}
          <div className="flex flex-col items-center p-4 sm:p-5">
            <h2 className="text-xl font-bold mb-3">Select a Date</h2>

            <div className="flex items-center gap-3 sm:gap-5 mb-3 sm:mb-5">
              <button
                onClick={() => handleMonthChange(-1)}
                className="px-2 sm:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ◀
              </button>
              <span className="text-base sm:text-lg font-semibold">
                {new Date(selectedYear, selectedMonth - 1).toLocaleString(
                  "default",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
              <button
                onClick={() => handleMonthChange(1)}
                className="px-2 sm:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ▶
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center font-bold">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="w-8 sm:w-12">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 border p-2 sm:p-4 rounded-md">
              {generateDates().map((date, index) => {
                if (!date) return <div key={index} className="w-8 sm:w-12 h-8 sm:h-12"></div>;
                let dateObj = new Date(date);
                let isPastDate = dateObj < today;
                return (
                  <button
                    key={index}
                    className={`w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center rounded-full ${
                      isPastDate
                        ? "bg-white text-gray-500 cursor-not-allowed"
                        : "bg-blue-100 text-blue-600 font-bold hover:bg-blue-200"
                    } ${
                      selectedDate === date
                        ? "bg-blue-600 text-white font-extrabold"
                        : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                    disabled={isPastDate}
                  >
                    {parseInt(date.split("-")[2])}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <>
                <p className="mt-3 text-base sm:text-lg font-semibold text-green-600">
                  Selected Date: {selectedDate}
                </p>
                {/* If booking is not confirmed yet, show the Confirm Booking button */}
                {!booking && (
                  <button
                    onClick={confirmBooking}
                    className="mt-3 px-4 sm:px-5 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                  >
                    Confirm Booking
                  </button>
                )}
                {/* Once booking is confirmed, show the Generate Invoice button */}
                {booking && user && (
                  <button
                    onClick={generateWhatsAppInvoice}
                    className="mt-3 px-4 sm:px-5 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
                  >
                    Generate Invoice on WhatsApp
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// // Set the owner's phone number here (include country code, e.g., "+1234567890")
// const OWNER_PHONE = "+917970186027";

// const BookingCalendar = () => {
//   const { id } = useParams();
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(today.getFullYear());
//   const [user, setUser] = useState(null);
//   const [booking, setBooking] = useState(null);

//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   // Booking is created only when user clicks Confirm Booking
//   const confirmBooking = async () => {
//     if (!selectedDate) {
//       toast.warning("Please select a date first!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//       return;
//     }
//     try {
//       console.log("Confirming booking...");
//       const bookingResponse = await axios.post(
//         `http://localhost:5000/users/services/${id}/booking`,
//         { date: selectedDate },
//         { withCredentials: true }
//       );
//       console.log("Booking confirmed: ", bookingResponse);
//       // Set both user and booking info from the response
//       setUser(bookingResponse.data.newBooking.user);
//       setBooking(bookingResponse.data.newBooking.service);
//       toast.success("Booking confirmed successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } catch (error) {
//       console.error("Error confirming booking:", error);
//       toast.error("Failed to confirm booking. Please log in first!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };

//   const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
//   const getFirstDayOfMonth = (month, year) =>
//     new Date(year, month - 1, 1).getDay();

//   const generateDates = () => {
//     const totalDays = getDaysInMonth(selectedMonth, selectedYear);
//     const firstDayIndex = getFirstDayOfMonth(selectedMonth, selectedYear);
//     let dates = [];
//     for (let i = 0; i < firstDayIndex; i++) {
//       dates.push(null);
//     }
//     for (let i = 1; i <= totalDays; i++) {
//       let date = `${selectedYear}-${String(selectedMonth).padStart(
//         2,
//         "0"
//       )}-${String(i).padStart(2, "0")}`;
//       dates.push(date);
//     }
//     return dates;
//   };

//   const handleMonthChange = (step) => {
//     let newMonth = selectedMonth + step;
//     let newYear = selectedYear;
//     if (newMonth === 0) {
//       newMonth = 12;
//       newYear -= 1;
//     } else if (newMonth === 13) {
//       newMonth = 1;
//       newYear += 1;
//     }
//     setSelectedMonth(newMonth);
//     setSelectedYear(newYear);
//     setSelectedDate(null);
//     // Reset booking info when the month changes
//     setBooking(null);
//     setUser(null);
//   };

//   const handleDateClick = (date) => {
//     const clickedDate = new Date(date);
//     if (clickedDate >= today) {
//       setSelectedDate(date);
//       // Clear any previous booking info when a new date is selected
//       setBooking(null);
//       setUser(null);
//     }
//   };

//   // Use the owner's phone number to generate the WhatsApp invoice
//   const generateWhatsAppInvoice = () => {
//     if (!user) {
//       console.error("User info is not available");
//       return;
//     }
//     const invoiceMessage = `Hello ${user.name},\n\nYour booking for Sunrise Events on ${selectedDate} is confirmed!\n\nDetails:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phonenumber}\n\nThank you for choosing us! 🎉`;
//     const encodedMessage = encodeURIComponent(invoiceMessage);
//     window.open(
//       `https://wa.me/${OWNER_PHONE}?text=${encodedMessage}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="flex justify-center pb-10">
//       <div className="flex justify-center border-2 bg-white border-gray-100 p-10 w-210">
//         <div className="flex flex-row justify-center items-center border-gray-200 border-2 w-200 p-5 bg-gray-50 rounded-xl">
//           <div className="bg-[url('assets/images/booking/calender.png')] w-80 h-130 bg-center bg-contain bg-no-repeat text-center pt-50">
//             <h2 className="font-bold text-3xl">Sunrise Events</h2>
//             <p className="font-medium text-lg">
//               Decoration Booking
//               <br />
//               Appointment
//             </p>
//           </div>

//           {/* Always render the calendar */}
//           <div className="flex flex-col items-center p-5">
//             <h2 className="text-xl font-bold mb-3">Select a Date</h2>

//             <div className="flex items-center gap-5 mb-5">
//               <button
//                 onClick={() => handleMonthChange(-1)}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 ◀
//               </button>
//               <span className="text-lg font-semibold">
//                 {new Date(selectedYear, selectedMonth - 1).toLocaleString(
//                   "default",
//                   {
//                     month: "long",
//                     year: "numeric",
//                   }
//                 )}
//               </span>
//               <button
//                 onClick={() => handleMonthChange(1)}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 ▶
//               </button>
//             </div>

//             <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold">
//               {daysOfWeek.map((day, index) => (
//                 <div key={index} className="w-12">
//                   {day}
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-2 border p-4 rounded-md">
//               {generateDates().map((date, index) => {
//                 if (!date) return <div key={index} className="w-12 h-12"></div>;
//                 let dateObj = new Date(date);
//                 let isPastDate = dateObj < today;
//                 return (
//                   <button
//                     key={index}
//                     className={`w-12 h-12 flex items-center justify-center rounded-full ${
//                       isPastDate
//                         ? "bg-white text-gray-500 cursor-not-allowed"
//                         : "bg-blue-100 text-blue-600 font-bold hover:bg-blue-200"
//                     } ${
//                       selectedDate === date
//                         ? "bg-blue-600 text-white font-extrabold"
//                         : ""
//                     }`}
//                     onClick={() => handleDateClick(date)}
//                     disabled={isPastDate}
//                   >
//                     {parseInt(date.split("-")[2])}
//                   </button>
//                 );
//               })}
//             </div>

//             {selectedDate && (
//               <>
//                 <p className="mt-3 text-lg font-semibold text-green-600">
//                   Selected Date: {selectedDate}
//                 </p>
//                 {/* If booking is not confirmed yet, show the Confirm Booking button */}
//                 {!booking && (
//                   <button
//                     onClick={confirmBooking}
//                     className="mt-3 px-5 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
//                   >
//                     Confirm Booking
//                   </button>
//                 )}
//                 {/* Once booking is confirmed, show the Generate Invoice button */}
//                 {booking && user && (
//                   <button
//                     onClick={generateWhatsAppInvoice}
//                     className="mt-3 px-5 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
//                   >
//                     Generate Invoice on WhatsApp
//                   </button>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingCalendar;
