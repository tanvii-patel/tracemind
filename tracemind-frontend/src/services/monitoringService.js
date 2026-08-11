import axios from "axios";

const API = "http://localhost:8080/api/monitoring";

export const getSystemHealth = () =>
    axios.get(API);