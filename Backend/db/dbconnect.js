const mongoose = require("mongoose");

const mongoURL =
  process.env.MONGODB_URI || "mongodb://localhost:27017/gwocSunrise";

const dbConnect = () => {
  console.log(process.env.MONGODB_URI);
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
};

module.exports = dbConnect;
