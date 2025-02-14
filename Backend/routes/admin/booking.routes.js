const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");

const adminBookingController = require("../../controller/admin.booking.controller");

router.get(
  "/",
  isAuthenticated,
  isAdmin,
  adminBookingController.getAllBookings
);

router.get(
  "/:id",
  isAuthenticated,
  isAdmin,
  adminBookingController.getBookingById
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  adminBookingController.updateBookingStatus
);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  adminBookingController.deleteBooking
);
module.exports = router;
