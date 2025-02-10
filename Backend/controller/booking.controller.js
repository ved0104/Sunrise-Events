const Booking = require("../models/booking.model.js");

module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = Booking.find({});
    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(201).json({ success: true, bookings });
  } catch (error) {
    console.log("error fetching bookings", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching bookings" });
  }
};
