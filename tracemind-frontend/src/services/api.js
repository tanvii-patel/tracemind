import axios from "axios";

const api = axios.create({
    baseURL: "http://trace-mind.onrender.com/api"
});

api.interceptors.request.use((config) => {

    // Don't send token for login/register
    if (
        config.url === "/auth/login" ||
        config.url === "/auth/register"
    ) {
        return config;
    }

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;