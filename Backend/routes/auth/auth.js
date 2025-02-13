const express = require("express");
const router = express.Router();
const serviceController = require("../../controller/service.controller.js");
const { isAuthenticated } = require("../../middleware/auth.js");
const bookingController = require("../../controller/user.booking.controller.js");

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
router.post("/services/:id/booking", bookingController.createBooking);

module.exports = router;
