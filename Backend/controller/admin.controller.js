const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie.js");
const {
  sendAdminVerificationEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
  sendResetSuccessEmail,
} = require("../mailtrap/emails.js");

module.exports.signup = async (req, res) => {
  const { email, password, name, phonenumber } = req.body;
  try {
    if (!email || !password || !name || !phonenumber) {
      throw new Error("All Fields are required");
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      throw new Error("User Already Exists");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      phonenumber,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      role: "admin", // ✅ Explicitly setting role here
    });

    await user.save();

    //jwt token and setting cookie
    generateTokenAndSetCookie(res, user);

    await sendAdminVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true, // ✅ Make sure this is included
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ data: { success: false, message: error.message } });
  }
};

module.exports.verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Verification Token" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phonenumber: user.phonenumber,
        role: user.role,
        createdAt: user.createdAt, // ✅ Ensure createdAt is included
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    if (user.role != "admin") {
      return res
        .status(400)
        .json({ success: false, message: "You are not an admin" });
    }
    const isPasswordvalid = await bcryptjs.compare(password, user.password);
    if (!isPasswordvalid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    generateTokenAndSetCookie(res, user);

    user.lastlogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Admin logged in Successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phonenumber: user.phonenumber,
        role: user.role,
        lastlogin: user.lastlogin, // ✅ Ensure lastlogin is sent
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });
    }
    if (user.role != "admin") {
      return res
        .status(400)
        .json({ success: false, message: "You are not an admin" });
    }
    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    //send email
    await sendForgotPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgot password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (user.role != "admin") {
      throw new Error("User is not an admin");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
