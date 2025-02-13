import React, { useState } from "react";

const BookingCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get total days in a month
  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

  // Get the first day of the month
  const getFirstDayOfMonth = (month, year) => new Date(year, month - 1, 1).getDay();

  // Generate dates for the selected month
  const generateDates = () => {
    const totalDays = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayIndex = getFirstDayOfMonth(selectedMonth, selectedYear);
    
    let dates = [];
    
    // Add empty placeholders for alignment (for first week's offset)
    for (let i = 0; i < firstDayIndex; i++) {
      dates.push(null);
    }

    // Add actual dates
    for (let i = 1; i <= totalDays; i++) {
      let date = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      dates.push(date);
    }

    return dates;
  };

  // Handle month change
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

  // Handle date selection
  const handleDateClick = (date) => {
    if (new Date(date) >= today) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="flex justify-center pb-10">
        <div className="flex justify-center border-2 bg-white border-gray-100 p-10 w-210">
            <div className="flex fles-col justify-center items-center border-gray-200 border-2 w-200 p-5 bg-gray-50 rounded-xl">
                <div className="bg-[url('assets/images/booking/calender.png')] w-80 h-130 bg-center bg-contain bg-no-repeat text-center pt-50">
                    <h2 className="font-bold text-3xl">Sunrise Events</h2>
                    <p className="font-medium text-lg">Decoration Booking<br/>Appointment</p>
                </div>

                <div className="flex flex-col items-center p-5">
                    <h2 className="text-xl font-bold mb-3">Select a Date</h2>

                    {/* Month Navigation */}
                    <div className="flex items-center gap-5 mb-5">
                        <button
                        onClick={() => handleMonthChange(-1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                        ◀
                        </button>
                        <span className="text-lg font-semibold">
                        {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long", year: "numeric" })}
                        </span>
                        <button
                        onClick={() => handleMonthChange(1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                        ▶
                        </button>
                    </div>

                    {/* Days of the week row */}
                    <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold">
                        {daysOfWeek.map((day, index) => (
                        <div key={index} className="w-12">{day}</div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 border p-4 rounded-md">
                        {generateDates().map((date, index) => {
                        if (!date) {
                            return <div key={index} className="w-12 h-12"></div>; // Empty space for alignment
                        }

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

                    {/* Selected Date Display */}
                    {selectedDate && (
                        <p className="mt-3 text-lg font-semibold text-green-600">
                        Selected Date: {selectedDate}
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default BookingCalendar;