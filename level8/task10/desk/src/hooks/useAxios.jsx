import { useState, useEffect } from "react";
import api from "../services/api";

const cache = new Map(); // Simple in-memory cache

const useAxios = (url, options = {}, forceRefresh = false) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!forceRefresh && cache.has(url)) {
                console.log("Returning cached data:", url);
                setData(cache.get(url)); // Return cached data
                setLoading(false);
                return;
            }

            const response = await api.get(url, options);
            cache.set(url, response.data); // Store response in cache
            setData(response.data);
        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, forceRefresh]);

    return { data, loading, error, refetch: () => fetchData(true) };
};

export default useAxios;
