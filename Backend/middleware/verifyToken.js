const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, msg: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
