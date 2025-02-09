// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Service = require('../models/Service');

// Admin middleware (add to middleware/admin.js)
exports.admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }
  next();
};

// Add new service
router.post('/services', [auth, admin], async (req, res) => {
  const service = new Service({
    ...req.body
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update service
router.put('/services/:id', [auth, admin], async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Other admin routes follow similar pattern...