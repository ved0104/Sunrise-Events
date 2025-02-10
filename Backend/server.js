require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const dbConnect = require("./db/dbconnect.js");
const authRoutes = require("./routes/auth/auth.js");
const adminRoutes = require("./routes/admin/admin.routes.js");
app.use(
  cors({
    origin: "http://localhost:5173", // Set frontend origin explicitly
    credentials: true, // Allow credentials (cookies, sessions)
  })
);
app.use(express.json());
app.use("/users", authRoutes);
app.use("/admin", adminRoutes);

// Database connection
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
