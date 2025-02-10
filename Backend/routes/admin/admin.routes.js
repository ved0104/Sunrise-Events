// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");
const serviceController = require("../../controller/service.controller.js");
const userController = require("../../controller/user.controller.js");

// Get all services
router.get("/services", serviceController.getAllServices);

//get by id
router.get("/services/:id", serviceController.getServiceById);

// Get services by category
router.get(
  "/services/category/:category",
  serviceController.getServiceByCategory
);

// Add new service
router.post(
  "/services/add",
  isAuthenticated,
  isAdmin,
  serviceController.addService
);

// Update service
router.put(
  "/services/:id",
  isAuthenticated,
  isAdmin,
  serviceController.updateService
);

router.delete(
  "/services/:id",
  isAuthenticated,
  isAdmin,
  serviceController.deleteService
);

//managing users

//get all users
router.get("/users", isAuthenticated, isAdmin, userController.getAllUsers);
router.get("/users/:id", isAuthenticated, isAdmin, userController.getUserById);
router.put(
  "/users/:id/role",
  isAuthenticated,
  isAdmin,
  userController.updateUserRole
);
router.delete(
  "/users/:id",
  isAuthenticated,
  isAdmin,
  userController.deleteUser
);

module.exports=router;