import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles.css"; // Import styles

const CancellableRequest = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get("/posts?_limit=5", {
                    signal: controller.signal, // Pass the signal to Axios
                });
                setData(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request canceled:", err.message);
                } else {
                    setError("Failed to fetch data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort(); // Cancel the request when the component unmounts
        };
    }, []);

    return (
        <div className="container">
            <h2>🔄 Axios Request Cancellation</h2>

            {loading && <p className="loading">Fetching data...</p>}
            {error && <p className="error">{error}</p>}

            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CancellableRequest;
