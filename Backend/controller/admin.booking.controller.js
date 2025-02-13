const Booking = require("../models/booking.model");

//get all booking
module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phonenumber")
      .populate("service", "title price")
      .sort({ date: -1 });

    res
      .status(200)
      .json({
        success: true,
        message: "booking retrieved successfully",
        bookings,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve bookings", error });
  }
};

//get booking by id
module.exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate("user", "name email phonenumber")
      .populate("service", "title price");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve booking", error });
  }
};

//delete booking
module.exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error });
  }
};

//update booking
module.exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Validate status input
    const validStatuses = ["approved", "rejected", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error });
  }
};
