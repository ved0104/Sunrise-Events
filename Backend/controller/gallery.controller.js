const Gallery = require("../models/gallery.model");

//public gallery funtions
module.exports.getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort("-createdAt");
    if (!galleryItems) {
      return res
        .status(404)
        .json({ success: false, message: "No gallery items found" });
    }
    return res.status(200).json({ success: true, galleryItems });
  } catch (error) {
    console.log("error in fetching gallery ", error);
    return res
      .status(500)
      .json({ success: false, message: "error in fetching gallery", error });
  }
};

module.exports.getGalleryByEventType = async (req, res) => {
  const { category } = req.params;
  try {
    const items = await Gallery.find({ category });
    if (!items) {
      return res.status(404).json({
        success: false,
        message: "No gallery items found for this category",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "succesfull sorted", items });
  } catch (error) {
    console.log("error in fetch gallery by category ", error);
    res.status(500).json({ success: false, message: error.message, error });
  }
};

//admin gallery functions
module.exports.createGalleryItem = async (req, res) => {
  let { title, description, category } = req.body;
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file.",
      });
    }
    const imageUrl = req.file.path; // This is the Cloudinary URL
    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const galleryItem = await new Gallery({
      title,
      description,
      imageUrl,
      category,
    });

    await galleryItem.save();

    return res.status(201).json({
      success: true,
      message: "image added successfully.",
      galleryItem,
    });
  } catch (error) {
    console.log("error in creating gallery item ", error);
    res
      .status(500)
      .json({ success: false, message: "error in creating gallery item" });
  }
};

module.exports.updateGalleryItem = async (req, res) => {
  let { title, description, imageUrl, category } = req.body;
  let { id } = req.params;

  try {
    if (!title || !description || !imageUrl || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const galleryItem = await Gallery.findByIdAndUpdate(
      id,
      { title, description, imageUrl, category },
      { new: true }
    );
    if (!galleryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({
      success: true,
      message: "Gallery item updated successfully",
      galleryItem,
    });
  } catch (error) {
    console.log("error in updating gallery item ", error);
    res
      .status(500)
      .json({ success: false, message: "error in updating gallery item" });
  }
};

module.exports.deleteGalleryItem = async (req, res) => {
  let { id } = req.params;
  try {
    const galleryItem = await Gallery.findByIdAndDelete(id);
    if (!galleryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error) {
    console.log("error in deleting gallery item ", error);
    res
      .status(500)
      .json({ success: false, message: "error in deleting gallery item" });
  }
};
