import axios from "axios";

const API = "http://trace-mind.onrender.com/api/monitoring";

export const getSystemHealth = () =>
    axios.get(API);