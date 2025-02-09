const mongoose = require('mongoose')
const gallerySchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    category: String,
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.Schema("Gallery", gallerySchema)