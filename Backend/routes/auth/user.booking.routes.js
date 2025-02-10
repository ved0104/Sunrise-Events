const express = require("express");
const router = express.Router();
const bookingController = require("../../controller/booking.controller.js");
const { isAuthenticated } = require("../../middleware/auth.js");

router.post("/bookings", isAuthenticated, bookingController.createBooking);

router.get("/bookings/my", isAuthenticated, bookingController.getMyBookings);

router.get("/bookings/:id", isAuthenticated, bookingController.getBookingById);

router.delete(
  "/bookings/:id",
  isAuthenticated,
  bookingController.cancelBooking
);

module.exports = router;
