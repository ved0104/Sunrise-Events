// middleware/auth.js (JWT Verification)
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodes ", decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

// Security measures:
// - Use helmet.js for secure headers
// - Rate limiting with express-rate-limit
// - Input validation with Joi
// - Store images in Cloudinary with signed uploads
// - Use bcrypt for password hashing
