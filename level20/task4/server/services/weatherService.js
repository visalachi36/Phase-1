import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;

const getWeatherData = async (location) => {
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
            key: API_KEY,
            q: location,
            days: 3,
            aqi: 'no',
            alerts: 'no'
        }
    });
    return response.data;
};

export default getWeatherData;
