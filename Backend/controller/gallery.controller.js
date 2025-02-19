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
  const { category } = req.query;  // Use req.query for query parameters
  try {
    const items = await Gallery.find({ category });
    if (!items || items.length === 0) {  // Check if no items are found
      return res.status(404).json({
        success: false,
        message: "No gallery items found for this category",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Successfully sorted", items });
  } catch (error) {
    console.log("Error in fetch gallery by category: ", error);
    res.status(500).json({ success: false, message: error.message, error });
  }
};

//admin gallery functions
module.exports.createGalleryItem = async (req, res) => {
  let { category } = req.body;
  console.log("comming", req.body);
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file.",
      });
    }
    const imageUrl = req.file.path; // This is the Cloudinary URL
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const galleryItem = await new Gallery({
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

module.exports.createMultipleGalleryItems = async (req, res) => {
  try {
    const { category } = req.body;
    const imageUrls = req.files.map((file) => file.path);

    const galleryItems = imageUrls.map((url) => ({
      category,
      imageUrl: url,
    }));

    await Gallery.insertMany(galleryItems);

    res.status(201).json({
      message: "Images uploaded successfully",
      galleryItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports.updateGalleryItem = async (req, res) => {
  const { category } = req.body;
  const { id } = req.params;

  // Validate required text fields
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    // Determine the imageUrl:
    let imageUrl;
    if (req.file && req.file.path) {
      // If a new file is uploaded, use its Cloudinary URL
      imageUrl = req.file.path;
    } else {
      // If no new file, fetch the existing gallery item to retain its imageUrl
      const existingItem = await Gallery.findById(id);
      if (!existingItem) {
        return res.status(404).json({
          success: false,
          message: "Gallery item not found",
        });
      }
      imageUrl = existingItem.imageUrl;
    }

    // Update the gallery item with the new values
    const galleryItem = await Gallery.findByIdAndUpdate(
      id,
      { category, imageUrl },
      { new: true }
    );

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gallery item updated successfully",
      galleryItem,
    });
  } catch (error) {
    console.log("Error in updating gallery item:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating gallery item",
    });
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
