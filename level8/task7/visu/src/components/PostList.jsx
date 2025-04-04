import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles.css"; 

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await api.get("/posts?_limit=5"); // Get first 5 posts
                setPosts(response.data);
            } catch (err) {
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container">
            <h2>📜 Latest Posts</h2>

            {loading && <p className="loading">Fetching posts...</p>}
            {error && <p className="error">{error}</p>}

            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
