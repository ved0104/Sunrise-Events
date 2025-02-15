const express = require("express");
const router = express.Router();

const galleryController = require("../../controller/gallery.controller.js");

//gallery routes users
router.get("/", galleryController.getAllGalleryItems);
router.get("/:category", galleryController.getGalleryByEventType);

module.exports = router;
