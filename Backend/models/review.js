const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
    },
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
    { timestamps: true });

module.exports = mongoose.Schema("Review", ReviewSchema);