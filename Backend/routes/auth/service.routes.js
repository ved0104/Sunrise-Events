const express = require("express");
const router = express.Router();
const serviceController = require("../../controller/service.controller.js");
const { isAuthenticated } = require("../../middleware/auth.js");
const bookingController = require("../../controller/user.booking.controller.js");
// Get all services
router.get("/", serviceController.getAllServices);

//get by id
router.get("/:id", serviceController.getServiceById);

// Get services by category
router.get("/category/:category", serviceController.getServiceByCategory);

// booking a service
router.post("/:id/booking", isAuthenticated, bookingController.createBooking);
module.exports = router;
