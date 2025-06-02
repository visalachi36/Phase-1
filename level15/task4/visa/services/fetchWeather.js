import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { API_KEY, CITY } = process.env;

export const fetchWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

  try {
    const res = await axios.get(url);
    const { main, weather } = res.data;

    return {
      city: CITY,
      temperature: main.temp,
      humidity: main.humidity,
      condition: weather[0].main
    };
  } catch (err) {
    console.error("Error fetching weather:", err.message);
    return null;
  }
};
