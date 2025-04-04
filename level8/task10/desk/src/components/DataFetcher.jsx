import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import "../styles.css";

const DataFetcher = () => {
    const [forceRefresh, setForceRefresh] = useState(false);
    const { data, loading, error, refetch } = useAxios("/posts?_limit=5", {}, forceRefresh);

    return (
        <div className="container">
            <h2>🔄 Custom Axios Hook with Caching</h2>

            <button onClick={() => { 
                setForceRefresh(true);
                refetch();
            }}>
                Refresh Data
            </button>

            {loading && <p className="loading">Fetching data...</p>}
            {error && <p className="error">{error}</p>}

            <ul>
                {data && data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetcher;
