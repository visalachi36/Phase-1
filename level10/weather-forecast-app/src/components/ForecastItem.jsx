const ForecastItem = ({ day }) => {
    return (
        <div className="forecast-item">
            <p>{day.date}</p>
            <img src={day.day.condition.icon} alt="Weather Icon" />
            <p>{day.day.avgtemp_c}°C</p>
        </div>
    );
};

export default ForecastItem;
