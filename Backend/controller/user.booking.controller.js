const Booking = require("../models/booking.model.js");
const Service = require("../models/service.model.js");
const User = require("../models/user.model.js");
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

//book a service
module.exports.createBooking = async (req, res) => {
  const { id: serviceId } = req.params;
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { date } = req.body;

  try {
    if (!eventDate) {
      return res
        .status(400)
        .json({ success: false, message: "Event date is required" });
    }
    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    const newBooking = new Booking({
      user: userId,
      service: serviceId,
      date,
    });
    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      newbooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create booking", error });
  }
};
