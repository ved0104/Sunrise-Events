// middleware/upload.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Invalid file type'), false);
  }
});

exports.uploadImage = upload.single('image');

// In gallery route
router.post('/gallery', [auth, admin, uploadImage], async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
      folder: 'sunrise-gallery'
    });
    
    const galleryItem = new Gallery({
      imageUrl: result.secure_url,
      category: req.body.category
    });
    
    await galleryItem.save();
    res.status(201).json(galleryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});