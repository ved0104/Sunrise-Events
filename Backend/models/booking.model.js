const { mongoose } = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
    contactInfo: {
      name: String,
      email: String,
      phone: String
    }
  });

module.exports=mongoose.Schema("Booking",bookingSchema)