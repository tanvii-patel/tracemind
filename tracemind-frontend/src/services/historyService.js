import axios from "axios";

const API = "https://trace-mind.onrender.com/api/history";

export const getHistory = () =>
    axios.get(API);