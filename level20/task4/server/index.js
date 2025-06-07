import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (if accessing the API from a different port/domain)
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Weather Data Schema for MongoDB
const weatherSchema = new mongoose.Schema({
    location: String,
    data: mongoose.Schema.Types.Mixed,
    dateFetched: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);

// API route to fetch weather data and save to MongoDB
app.get('/api/weather', async (req, res) => {
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        // Construct the Weather API URL with the provided location and API key
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`;

        // Make the request to the external weather API
        const response = await axios.get(url);

        // Save the weather data to the database
        const newWeather = new Weather({
            location,
            data: response.data,
        });
        await newWeather.save();

        // Send the weather data as the response
        res.json(response.data);
    } catch (err) {
        console.error('Error fetching weather data:', err.message);
        res.status(500).json({ error: 'Something went wrong, please try again later.' });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
