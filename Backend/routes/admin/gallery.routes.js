const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");
const galleryController = require("../../controller/gallery.controller.js");

//gallery routes
router.get("/", galleryController.getAllGalleryItems);

router.get("/:category", galleryController.getGalleryByEventType);

router.post("/", isAuthenticated, isAdmin, galleryController.createGalleryItem);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  galleryController.updateGalleryItem
);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  galleryController.deleteGalleryItem
);
module.exports = router;
