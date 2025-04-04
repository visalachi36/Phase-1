import { Link } from "react-router-dom";
import styles from "../styles/MovieCard.module.css";

export default function MovieCard({ movie }) {
    return (
        <div className={styles.card}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <Link to={`/movie/${movie.imdbID}`}>View Details</Link>
        </div>
    );
}
