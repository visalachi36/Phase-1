import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // API Base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Global loading state
let loading = false;

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        console.log("🚀 Request sent:", config.url);
        loading = true;
        config.headers["Authorization"] = `Bearer fake_token_123`;
        return config;
    },
    (error) => {
        loading = false;
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        console.log("✅ Response received:", response);
        loading = false;
        return response;
    },
    (error) => {
        loading = false;
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error("⛔ Unauthorized (401). Redirecting...");
                    break;
                case 404:
                    console.error("❌ Not Found (404).");
                    break;
                case 500:
                    console.error("⚠️ Server Error (500). Please try again later.");
                    break;
                default:
                    console.error("Unknown error:", error.response.status);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
