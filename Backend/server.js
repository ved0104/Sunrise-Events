require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const dbConnect = require("./db/dbconnect.js");
const authRoutes = require("./routes/auth/auth.js");
const adminRoutes = require("./routes/admin/admin.routes.js");
const userBookingRoutes = require("./routes/auth/booking.routes.js");
const userGalleryRoutes = require("./routes/auth/gallery.routes.js");
const userServicesRoutes = require("./routes/auth/service.routes.js");

const adminServicesRoutes = require("./routes/admin/service.routes.js");
const adminGalleryRoutes = require("./routes/admin/gallery.routes.js");
const adminUserRoutes = require("./routes/admin/user.routes.js");
const adminBookingRoutes = require("./routes/admin/booking.routes.js");
const adminDashboardRoutes = require("./routes/admin/admin.dashboard.routes.js");

app.use(
  cors({
    origin: "http://localhost:5173", // Set frontend origin explicitly
    credentials: true, // Allow credentials (cookies, sessions)
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth/", authRoutes);
app.use("/api/auth", adminRoutes);
// app.use("/services", serviceRoutes);
app.use("/booking", userBookingRoutes);
app.use("/users/gallery", userGalleryRoutes);
app.use("/users/bookings", userBookingRoutes);
app.use("/users/services", userServicesRoutes);

app.use("/admin", adminDashboardRoutes);
app.use("/admin/gallery", adminGalleryRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/services", adminServicesRoutes);
app.use("/admin/users", adminUserRoutes);
app.use("/admin/bookings", adminBookingRoutes);

// Database connection
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
