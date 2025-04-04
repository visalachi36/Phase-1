import React from "react";
import useGeolocation from "../hooks/useGeolocation";
import "../styles.css";

const GeolocationComponent = () => {
  const { location, error } = useGeolocation();

  return (
    <div className="geo-container">
      <h2>User Location</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : location ? (
        <p className="location">
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
