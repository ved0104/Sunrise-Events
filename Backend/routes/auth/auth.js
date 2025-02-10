const express = require("express");
const router = express.Router();
const serviceController = require("../../controller/service.controller.js");
const { isAuthenticated } = require("../../middleware/auth.js");

// Get all services
router.get("/services", serviceController.getAllServices);

//get by id
router.get("/services/:id", serviceController.getServiceById);

// Get services by category
router.get(
  "/services/category/:category",
  serviceController.getServiceByCategory
);

// Create booking
router.post("/bookings", async (req, res) => {
  // Check date availability
  const existingBooking = await Booking.findOne({
    date: req.body.date,
    service: req.body.service,
  });

  if (existingBooking) {
    return res.status(400).json({ message: "Date already booked" });
  }

  const booking = new Booking({
    ...req.body,
    user: req.user.id, // From JWT
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
