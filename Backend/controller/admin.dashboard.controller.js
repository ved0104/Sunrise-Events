const User = require("../models/user.model.js");
const Service = require("../models/service.model.js");
const Gallery = require("../models/gallery.model.js");
const Booking = require("../models/booking.model.js");

// Controller for fetching dashboard statistics
module.exports.getDashboardStats = async (req, res) => {
  try {
    // Count total users
    const totalUsers = await User.countDocuments();

    // Count all services (since there's no status field)
    const activeServices = await Service.countDocuments();

    // Count gallery items
    const galleryItems = await Gallery.countDocuments();

    // Count monthly bookings (using Booking as a proxy for "visits" or activity)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const stats = [
      { title: "Total Users", value: totalUsers.toString() },
      { title: "Active Services", value: activeServices.toString() },
      { title: "Gallery Items", value: galleryItems.toString() },
      { title: "Monthly Bookings", value: monthlyBookings.toString() },
    ];

    return res.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching dashboard stats" });
  }
};

// Controller for fetching recent activities
module.exports.getRecentActivities = async (req, res) => {
  try {
    // Fetch the 10 most recent bookings
    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name")
      .populate("service", "title")
      .lean();

    // Map bookings into activity objects, ensuring `service` exists before trying to access `title`
    const activities = bookings.map((booking) => {
      const serviceTitle = booking.service
        ? booking.service.title
        : "No service available";
      return {
        id: booking._id,
        action: `Booking created for "${serviceTitle}" by ${booking.user.name}`,
        date: booking.createdAt,
        status: booking.status, // e.g., "pending", "approved", or "rejected"
      };
    });

    return res.json({ success: true, activities });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching recent activities" });
  }
};
