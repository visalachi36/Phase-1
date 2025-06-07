import ForecastItem from "./ForecastItem";

const ForecastList = ({ forecast }) => {
    return (
        <div className="forecast-list">
            {forecast.map((day) => (
                <ForecastItem key={day.date} day={day} />
            ))}
        </div>
    );
};

export default ForecastList;
