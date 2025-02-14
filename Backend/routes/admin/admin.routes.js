const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require("../../controller/admin.controller.js");
const { verifyToken } = require("../../middleware/verifyToken.js");

router.get("/admin/check-auth", verifyToken, checkAuth);
router.post("/admin/signup", signup);
router.post("/admin/login", login);
router.post("/admin/logout", logout);

router.post("/admin/verify-email", verifyEmail);
router.post("/admin/forgot-password", forgotPassword);

router.post("/admin/reset-password/:token", resetPassword);

module.exports = router;
