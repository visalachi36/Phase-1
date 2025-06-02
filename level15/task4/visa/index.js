// index.js
import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Weather from './models/Weather.js';

dotenv.config();

const fetchAndStoreWeather = async () => {
  try {
    const API_KEY = process.env.API_KEY;
    const CITY = process.env.CITY || 'Coimbatore';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    const weather = new Weather({
      city: CITY,
      temperature: data.main.temp,
      description: data.weather[0].description,
      timestamp: new Date()
    });

    await weather.save();
    console.log('✅ Weather data saved:', weather);
  } catch (error) {
    console.error('❌ Error fetching weather:', error.message);
  }
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  fetchAndStoreWeather().then(() => mongoose.disconnect());
});
