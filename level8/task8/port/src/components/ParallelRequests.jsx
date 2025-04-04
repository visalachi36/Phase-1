import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles.css"; // Import styles

const ParallelRequests = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMultipleAPIs = async () => {
            try {
                setLoading(true);
                
                // Fetch users and posts in parallel
                const [usersResponse, postsResponse] = await Promise.all([
                    api.get("/users"), // Fetch users
                    api.get("/posts?_limit=5") // Fetch first 5 posts
                ]);

                setUsers(usersResponse.data);
                setPosts(postsResponse.data);
            } catch (err) {
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMultipleAPIs();
    }, []);

    return (
        <div className="container">
            <h2>🌍 Parallel API Requests</h2>

            {loading && <p className="loading">Fetching data...</p>}
            {error && <p className="error">{error}</p>}

            <div className="data-section">
                <div className="box">
                    <h3>👥 Users</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="box">
                    <h3>📝 Recent Posts</h3>
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>{post.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ParallelRequests;
