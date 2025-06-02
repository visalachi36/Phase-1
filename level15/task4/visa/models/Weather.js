// models/Weather.js
import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
