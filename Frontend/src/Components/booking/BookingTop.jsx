import React from "react";

export default function BookingTop({ selectedService }) {
  return (
    <div>
      <div className="text-center h-40 pt-15 mt">
        <h1 className="text-5xl font-medium">
          Book your dates for {selectedService?.title || "DECORATION"}
        </h1>
      </div>
      <div className="flex flex-row justify-center h-35">
        <div className="text-center mx-10 font-medium text-lg">
          <h2>Mark the date in the Calendar</h2>
        </div>
        <div className="text-center mx-10 font-medium text-lg">
          <h2>
            Our expert will connect soon. Get ready to
            <br />
            enjoy the best personalized shopping
            <br />
            experience.
          </h2>
        </div>
        <div className="text-center mx-10 font-medium text-lg">
          <h2>
            Now you may relax and let us
            <br />
            decorate your package of happiness.
          </h2>
        </div>
      </div>
      {selectedService && (
        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold text-blue-600">
            Booking Details for {selectedService.title}
          </h2>
          <p className="text-lg">{selectedService.description}</p>
        </div>
      )}
    </div>
  );
}
