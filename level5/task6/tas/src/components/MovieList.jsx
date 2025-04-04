import MovieCard from "./MovieCard";
import styles from "../styles/MovieCard.module.css";

export default function MovieList({ movies }) {
    return (
        <div className={styles.movieList}>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
}
