import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";


const Home = () => {
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = (data) => {
        setWeatherData(data); // Store the weather data from the backend
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
