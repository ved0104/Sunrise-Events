const express = require("express");

const router = express.Router();
const userController = require("../controller/user.controller");

//testing route
router.get("/test", (req, res) => {
  res.send("Hello from test route");
});

//signup route
router.post("/signup", userController.registerUser);

//login/signin route
router.post("/signin", userController.loginUser);

module.exports = router;
