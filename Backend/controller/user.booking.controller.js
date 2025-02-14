const Booking = require("../models/booking.model.js");
const Service = require("../models/service.model.js");
const User = require("../models/user.model.js");

module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
};

// Book a service
module.exports.createBooking = async (req, res) => {
  const { id: serviceId } = req.params;
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { date } = req.body;

  try {
    if (!date) {
      return res.status(400).json({ success: false, message: "Event date is required" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const Booking = new Booking({
      user: userId,
      service: serviceId,
      date,
    });

    await Booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      Booking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ success: false, message: "Failed to create booking", error });
  }
};
