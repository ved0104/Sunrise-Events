const express = require("express");
const router = express.Router();
const adminDashboardController = require("../../controller/admin.dashboard.controller.js");
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");
// GET /api/admin/dashboard-stats → Returns dashboard statistics
router.get(
  "/dashboard-stats",
  isAuthenticated,
  isAdmin,
  adminDashboardController.getDashboardStats
);

// GET /api/admin/recent-activities → Returns recent admin activities
router.get(
  "/recent-activities",
  isAuthenticated,
  isAdmin,
  adminDashboardController.getRecentActivities
);

module.exports = router;
