const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "services"; // Folder in Cloudinary
    let resource_type = "image"; // Default is image

    // Check if file is a video (You can improve this check as needed)
    if (file.mimetype.startsWith("video")) {
      resource_type = "video";
      folder = "videos"; // Optional: Separate folder for videos
    }

    return {
      folder,
      resource_type, // "image" | "video" | "raw"
      allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov", "avi", "mkv"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
