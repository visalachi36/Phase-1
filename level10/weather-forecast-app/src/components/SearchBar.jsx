import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location) onSearch(location);
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
