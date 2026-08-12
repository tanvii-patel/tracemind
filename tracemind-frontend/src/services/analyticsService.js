import axios from "axios";

const API = "https://trace-mind.onrender.com/api/analytics";

export const getAnalytics = () =>
    axios.get(API);