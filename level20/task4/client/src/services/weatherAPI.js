import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeather = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json`, {
            params: { key: API_KEY, q: location, days: 5 }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};