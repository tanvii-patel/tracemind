import axios from "axios";

const API = "http://trace-mind.onrender.com/api/dashboard";


export const getDashboardStats = async () => {
    const response = await axios.get(API);
    return response.data;
};