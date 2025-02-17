// bulkUpload.js
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Gallery = require("../models/gallery.model.js"); // adjust the path as needed

// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://vedangdubey:qGd5n255O6gDUoMR@cluster0.9dxwe.mongodb.net/finalGwoc",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Configure Cloudinary (same as your middleware)
cloudinary.config({
  cloud_name: "ddemrfcj3",
  api_key: "394229334218165",
  api_secret: "svSYh9jo8RaHFseEboaq7cnjtEg",
});

// Folder where your images are stored (update the path as needed)
const folderPath = path.join(__dirname, "./thereImages");
const defaultCategory = "birthday"; // Change or customize as needed

// Allowed file extensions
const allowedExtensions = [".jpg", ".jpeg", ".png"];

async function uploadImagesFromFolder() {
  try {
    // Read all files from the folder
    const files = fs.readdirSync(folderPath);
    // Filter to only include allowed image types
    const imageFiles = files.filter((file) =>
      allowedExtensions.includes(path.extname(file).toLowerCase())
    );
    console.log(`Found ${imageFiles.length} image(s) to upload.`);

    // Upload all images to Cloudinary
    const uploadPromises = imageFiles.map((file) => {
      const filePath = path.join(folderPath, file);
      return cloudinary.uploader.upload(filePath, {
        folder: "services", // Folder in Cloudinary (as per your middleware configuration)
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Prepare the documents to insert into your Gallery collection
    const galleryItems = uploadResults.map((result) => ({
      category: defaultCategory,
      imageUrl: result.secure_url,
    }));

    // Insert all documents at once
    await Gallery.insertMany(galleryItems);
    console.log("Images uploaded and inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error during bulk upload:", error);
    process.exit(1);
  }
}

uploadImagesFromFolder();
