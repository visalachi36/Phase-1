// routes/weatherRoutes.js
import express from 'express';
import Weather from '../models/Weather.js';

const router = express.Router();

// @route   POST /api/weather
// @desc    Add new weather entry
router.post('/', async (req, res) => {
  try {
    const { city, temperature, humidity, description } = req.body;

    // Check for missing fields
    if (!city || !temperature || !humidity || !description) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newEntry = new Weather({
      city,
      temperature,
      humidity,
      description
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/weather
// @desc    Get all weather entries
router.get('/', async (req, res) => {
  try {
    const entries = await Weather.find().sort({ timestamp: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
