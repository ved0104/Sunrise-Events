const express = require("express");
const router = express.Router();
const serviceController = require("../../controller/service.controller.js");
const { isAuthenticated } = require("../../middleware/auth.js");

const {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require("../../controller/auth.controller.js");
const { verifyToken } = require("../../middleware/verifyToken.js");

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

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
