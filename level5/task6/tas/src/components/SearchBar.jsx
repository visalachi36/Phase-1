import { useState } from "react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim() !== "") {
            onSearch(query);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <input 
                type="text" 
                placeholder="Search for a movie..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
