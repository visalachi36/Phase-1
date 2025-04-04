import { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"; // Import extra styles

const DataFetcherAsync = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setData(response.data.slice(0, 10)); // Limit to 10 items
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>📜 Fetched Posts</h2>

            {loading && <p className="loading">Loading data...</p>}
            {error && <p className="error">{error}</p>}

            <ul className="post-list">
                {data.map((post) => (
                    <li key={post.id} className="post-item">
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetcherAsync;
