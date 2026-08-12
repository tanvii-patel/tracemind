import axios from "axios";

const API = "http://trace-mind.onrender.com/api/analytics";

export const getAnalytics = () =>
    axios.get(API);