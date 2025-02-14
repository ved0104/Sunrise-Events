const express = require("express");
const router = express.Router();
const bookingController = require("../../controller/user.booking.controller.js");
const { isAuthenticated } = require("../../middleware/auth.js");

router.get("/", isAuthenticated, bookingController.getUsersBookings);

router.get("/:id", isAuthenticated, bookingController.getUsersBookingById);

router.delete("/:id", isAuthenticated, bookingController.cancelUserBooking);

module.exports = router;
