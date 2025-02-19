const Booking = require("../models/booking.model.js");
const Service = require("../models/service.model.js");
const User = require("../models/user.model.js");
const { sendBookingConfirmationEmail } = require("../mailtrap/emails.js");

// Book a service
module.exports.createBooking = async (req, res) => {
  const id = req.params.id;

  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { date } = req.body;

  try {
    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Event date is required" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    const newBooking = new Booking({
      user: userId,
      service: id,
      date,
    });

    await newBooking.save();

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user", "name email phonenumber")
      .populate("service", "title  price");

    await sendBookingConfirmationEmail(user.email, populatedBooking);

    res.status(201).json({
      message: "Booking created successfully",
      newBooking: populatedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create booking", error });
  }
};

module.exports.getUsersBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service", "title price")
      .sort({ createdAt: -1 });

    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(201).json({ success: true, bookings });
  } catch (error) {
    console.log("error fetching user bookings", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching bookings" });
  }
};

module.exports.getUsersBookingById = async (req, res) => {
  let { id } = req.params;
  try {
    const booking = await Booking.findById(id)
      .populate("service", "title price")
      .populate("user", "name email phonenumber");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.log("error fetching booking by id", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching booking" });
  }
};

module.exports.cancelUserBooking = async (req, res) => {
  let { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Ensure the user trying to cancel is the owner of the booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this booking",
      });
    }

    // Soft delete: update status instead of deleting
    booking.status = "cancelled";
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.log("error cancelling booking", error);
    return res
      .status(500)
      .json({ success: false, message: "Error cancelling user booking" });
  }
};
