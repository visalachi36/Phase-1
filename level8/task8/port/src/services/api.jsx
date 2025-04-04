import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // API Base URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
