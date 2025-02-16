const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");

const userController = require("../../controller/user.controller.js");

//get all users
router.get("/", isAuthenticated, isAdmin, userController.getAllUsers);
router.get("/:id", isAuthenticated, isAdmin, userController.getUserById);
router.put("/:id", isAuthenticated, isAdmin, userController.updateUserRole);
router.delete("/:id", isAuthenticated, isAdmin, userController.deleteUser);
// Create a new user
router.post("/", isAuthenticated, isAdmin, userController.createUser);

module.exports = router;
