const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Gallery = require('../models/Gallery');

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get services by category
router.get('/services/:category', async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create booking
router.post('/bookings', async (req, res) => {
  // Check date availability
  const existingBooking = await Booking.findOne({ 
    date: req.body.date,
    service: req.body.service
  });
  
  if (existingBooking) {
    return res.status(400).json({ message: 'Date already booked' });
  }

  const booking = new Booking({
    ...req.body,
    user: req.user.id // From JWT
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;