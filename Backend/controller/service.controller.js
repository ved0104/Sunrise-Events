const Service = require("../models/service.model.js");
const mongoose=require('mongoose')

module.exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//get service by id
module.exports.getServiceById = async (req, res) => { 
  try {
    const { id } = req.params;

    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Service ID format" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ success: true, service });
  } catch (err) {
    console.error("Error fetching service:", err);
    res.status(500).json({ message: err.message });
  }
};

//get services of same category
module.exports.getServiceByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const service = await Service.find({ category });

    if (service.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found for this category",
      });
    }
    return res.status(200).json({ success: true, service });
  } catch (error) {
    console.error("Error fetching service by category:", error);
    res.status(500).json({ message: error.message });
  }
};

//add a service
module.exports.addService = async (req, res) => {
  const { title, description, category, price } = req.body;

  try {
    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }
    const imageUrl = req.file.path;
    const newservice = new Service({
      title,
      category,
      description,
      price,
      image: imageUrl,
    });

    await newservice.save();

    return res.status(201).json({
      success: true,
      message: "Service added successfully.",
      newservice,
    });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//update a service
module.exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category, price } = req.body;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // Update service fields if provided
    if (title) service.title = title;
    if (description) service.description = description;
    if (image) service.image = image;
    if (category) service.category = category;
    if (price) service.price = price;

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res
      .status(500)
      .json({ success: false, message: "service updation failed" });
  }
};

//delete a service
module.exports.deleteService = async (req, res) => {
  let { id } = req.params;
  try {
    const service = Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }
    // Delete the service
    await Service.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete service. Internal Server Error.",
    });
  }
};
