import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const login = (data) =>
    axios.post(`${API}/login`, data);

export const register = (data) =>
    axios.post(`${API}/register`, data);

export const getCurrentUser = () =>
    axios.get(`${API}/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
};