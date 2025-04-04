const WeatherCard = ({ weather }) => {
    if (!weather) return <p>Loading...</p>;

    return (
        <div className="weather-card">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <h3>{weather.current.temp_c}°C</h3>
            <p>{weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="Weather Icon" />
        </div>
    );
};

export default WeatherCard;
