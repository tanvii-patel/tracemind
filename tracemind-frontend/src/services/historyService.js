import axios from "axios";

const API = "http://trace-mind.onrender.com/api/history";

export const getHistory = () =>
    axios.get(API);