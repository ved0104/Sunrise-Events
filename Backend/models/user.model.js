const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { parsePhoneNumber } = require("libphonenumber-js");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
      validate: {
        validator: function (phone) {
          try {
            const phoneNumber = parsePhoneNumber(phone, "IN");
            return (
              phoneNumber.isValid() && phoneNumber.number.startsWith("+91")
            );
          } catch (err) {
            return false;
          }
        },
        message: "Invalid phone number. Please use the format +91XXXXXXXXXX.",
      },
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
      validate: {
        validator: function (url) {
          return /^https?:\/\/.+/.test(url);
        },
        message: "Invalid profile picture URL",
      },
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    lastlogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
  return await bcryptjs.hash(password, 10);
};

module.exports = mongoose.model("User", UserSchema);
