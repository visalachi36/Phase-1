import { useState, useEffect } from "react";
import axios from "axios";

const DataFetcher = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log("Fetching data..."); // Debugging log
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                console.log("Response Data:", response.data); // Log response
                setPosts(response.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>Posts from JSONPlaceholder</h2>

            {loading && <p className="loading">Loading data...</p>}
            {error && <p className="error">{error}</p>}

            <ul>
                {posts.length > 0 ? (
                    posts.slice(0, 10).map((post) => (
                        <li key={post.id}>
                            <strong>{post.title}</strong>
                            <p>{post.body}</p>
                        </li>
                    ))
                ) : (
                    !loading && <p>No data available</p>
                )}
            </ul>
        </div>
    );
};

export default DataFetcher;
