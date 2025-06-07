import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (location) {
            try {
                // Fetch weather data from backend API
                const response = await fetch(`http://localhost:5000/api/weather?location=${location}`);
                const data = await response.json();

                // If successful, pass the data to the parent component
                if (response.ok) {
                    onSearch(data); // Pass the data to Home.jsx to render
                } else {
                    console.error('Error fetching data:', data);
                }
            } catch (err) {
                console.error('Backend API fetch error:', err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Enter city name..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
