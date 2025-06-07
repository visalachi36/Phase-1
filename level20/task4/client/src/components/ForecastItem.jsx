const ForecastItem = ({ day }) => {
    return (
        <div className="forecast-item">
            <p><strong>{day.date}</strong></p>
            <img src={day.day.condition.icon} alt="Weather Icon" />
            <p>{day.day.condition.text}</p>
            <p>Max: {day.day.maxtemp_c}°C</p>
            <p>Min: {day.day.mintemp_c}°C</p>
        </div>
    );
};

export default ForecastItem;
