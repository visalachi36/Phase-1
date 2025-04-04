import { useState } from "react";
import { fetchWeather } from "../services/weatherAPI";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = async (location) => {
        const data = await fetchWeather(location);
        setWeatherData(data);
    };

    return (
        <div className="home">
            <SearchBar onSearch={handleSearch} />
            {weatherData && (
                <>
                    <WeatherCard weather={weatherData} />
                    <ForecastList forecast={weatherData.forecast.forecastday} />
                </>
            )}
        </div>
    );
};

export default Home;
