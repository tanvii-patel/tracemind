import axios from "axios";

const API = "http://localhost:8080/api/analytics";

export const getAnalytics = () =>
    axios.get(API);