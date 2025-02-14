module.exports.isAdmin = (req, res, next) => {
  console.log("req.user in isAdmin:", req.user);
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Admins only." });
  }
  next();
};
