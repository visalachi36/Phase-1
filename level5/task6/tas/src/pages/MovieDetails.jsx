import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/MovieCard.module.css";

const API_KEY = "be432db4";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=`;

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}${id}`);
                if (response.data.Response === "True") {
                    setMovie(response.data);
                } else {
                    setError("Movie details not found");
                }
            } catch (error) {
                setError("Something went wrong!");
            }
            setLoading(false);
        };
        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.details}>
            <h2>{movie.Title} ({movie.Year})</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
    );
}
