const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin.js");

const galleryController = require("../../controller/gallery.controller.js");

//gallery routes users
router.get("/", galleryController.getAllGalleryItems);
router.get("/:category", galleryController.getGalleryByEventType);

module.exports = router;
