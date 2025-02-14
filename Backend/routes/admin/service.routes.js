const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");

const serviceController = require("../../controller/service.controller.js");
const upload = require("../../middleware/multerCloudinary.js"); // Adjust path if different

// Get all services
router.get("/", serviceController.getAllServices);

//get by id
router.get("/:id", serviceController.getServiceById);

// Get services by category
router.get("/category/:category", serviceController.getServiceByCategory);

// Add new service
router.post(
  "/add",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  serviceController.addService
);

// Update service
router.put("/:id", isAuthenticated, isAdmin, serviceController.updateService);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  serviceController.deleteService
);

module.exports = router;
