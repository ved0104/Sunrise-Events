const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            url: String,
            filename: String,
        },
        category: {
            type: String,
            required: true,
        },
        price: Number,
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review"
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);