// middleware/auth.js (JWT Verification)
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
};

// Security measures:
// - Use helmet.js for secure headers
// - Rate limiting with express-rate-limit
// - Input validation with Joi
// - Store images in Cloudinary with signed uploads
// - Use bcrypt for password hashing