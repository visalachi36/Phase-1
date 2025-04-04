import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import styles from "../styles/App.module.css";

const API_KEY = "be432db4";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchMovies = async (query) => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`${API_URL}${query}`);
            if (response.data.Response === "True") {
                setMovies(response.data.Search);
            } else {
                setError("No movies found");
                setMovies([]);
            }
        } catch (error) {
            setError("Something went wrong!");
        }
        
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h1>Movie Search</h1>
            <SearchBar onSearch={fetchMovies} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <MovieList movies={movies} />
        </div>
    );
}
