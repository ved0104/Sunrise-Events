const Booking = require("../models/booking.model.js");
const User = require("../models/user.model.js");
const { sendSMS } = require("../utils/smsSending.js");
const { formatDate } = require("../utils/formatDate.js");
//get all booking
module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phonenumber")
      .populate("service", "title price")
      .sort({ date: -1 });

    res.status(200).json({
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
    const { id } = req.params;
    const booking = await Booking.findById(id)
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
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.log("error is deleting booking ", error);
    res.status(500).json({ message: "Failed to delete booking", error });
  }
};

// update booking
module.exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status input
    const validStatuses = ["approved", "rejected", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    const user = await User.findById(booking.user);
    if (user && user.phonenumber) {
      const eventDate = booking.date ? formatDate(booking.date) : "N/A";
      const contactNumber =
        process.env.SUNRISE_CONTACT_NUMBER || "your-contact-number";

      // Format the user's phone number: if it doesn't start with '+91', prepend it.
      let phone = user.phonenumber.trim();
      if (!phone.startsWith("+91")) {
        phone = `+91${phone}`;
      }

      // Construct the SMS message using the provided template
      const message = `Hello ${user.name}, thank you for choosing Sunrise Events to create unforgettable experiences! Your booking on ${eventDate} has been "${booking.status}". For any inquiries, please call us at ${contactNumber}. We look forward to making your event truly memorable. – The Sunrise Events Team`;

      // Send the SMS message
      await sendSMS(phone, message);
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error });
  }
};
