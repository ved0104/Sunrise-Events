import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [user, setUser] = useState(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = "USER_ID"; // Replace with the logged-in user's ID
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month - 1, 1).getDay();

  const generateDates = () => {
    const totalDays = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayIndex = getFirstDayOfMonth(selectedMonth, selectedYear);
    let dates = [];

    for (let i = 0; i < firstDayIndex; i++) {
      dates.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      let date = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
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
  };

  const handleDateClick = (date) => {
    if (new Date(date) >= today) {
      setSelectedDate(date);
    }
  };

  const generateWhatsAppInvoice = () => {
    if (!user || !selectedDate) return;

    const invoiceMessage = `Hello ${user.name},\n\nYour booking for Sunrise Events on ${selectedDate} is confirmed!\n\nDetails:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\n\nThank you for choosing us! 🎉`;

    const encodedMessage = encodeURIComponent(invoiceMessage);
    window.open(`https://wa.me/${user.phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="flex justify-center pb-10">
      <div className="flex justify-center border-2 bg-white border-gray-100 p-10 w-210">
        <div className="flex flex-row justify-center items-center border-gray-200 border-2 w-200 p-5 bg-gray-50 rounded-xl">
          <div className="bg-[url('assets/images/booking/calender.png')] w-80 h-130 bg-center bg-contain bg-no-repeat text-center pt-50">
            <h2 className="font-bold text-3xl">Sunrise Events</h2>
            <p className="font-medium text-lg">Decoration Booking<br/>Appointment</p>
          </div>

          <div className="flex flex-col items-center p-5">
            <h2 className="text-xl font-bold mb-3">Select a Date</h2>

            <div className="flex items-center gap-5 mb-5">
              <button onClick={() => handleMonthChange(-1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">◀</button>
              <span className="text-lg font-semibold">
                {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long", year: "numeric" })}
              </span>
              <button onClick={() => handleMonthChange(1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">▶</button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="w-12">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 border p-4 rounded-md">
              {generateDates().map((date, index) => {
                if (!date) return <div key={index} className="w-12 h-12"></div>;

                let dateObj = new Date(date);
                let isPastDate = dateObj < today;

                return (
                  <button
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center rounded-full
                      ${isPastDate ? "bg-white text-gray-500 cursor-not-allowed" : "bg-blue-100 text-blue-600 font-bold hover:bg-blue-200 hover:font-extrabold"}
                      ${selectedDate === date ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white font-extrabold" : ""}
                    `}
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
                <p className="mt-3 text-lg font-semibold text-green-600">
                  Selected Date: {selectedDate}
                </p>
                <button
                  onClick={generateWhatsAppInvoice}
                  className="mt-3 px-5 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
                >
                  Generate Invoice on WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
