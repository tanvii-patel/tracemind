import axios from "axios";

const API = "https://trace-mind.onrender.com/api/monitoring";

export const getSystemHealth = () =>
    axios.get(API);