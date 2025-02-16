const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");
const galleryController = require("../../controller/gallery.controller.js");

const upload = require("../../middleware/multerCloudinary.js"); // Adjust path if different

//gallery routes
router.get("/", galleryController.getAllGalleryItems);

router.get("/:category", galleryController.getGalleryByEventType);

router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  galleryController.createGalleryItem
);
router.post(
  "/multiple",
  isAuthenticated,
  isAdmin,
  upload.array("images", 10),
  galleryController.createMultipleGalleryItems
);
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  galleryController.updateGalleryItem
);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  galleryController.deleteGalleryItem
);
module.exports = router;
