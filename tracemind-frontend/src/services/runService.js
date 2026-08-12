import axios from "axios";

const API = "https://trace-mind.onrender.com/api/runs";

export const getRuns = () =>
    axios.get(API);

export const getRun = (id) =>
    axios.get(`${API}/${id}`);

export const deleteRun = (id) =>
    axios.delete(`${API}/${id}`);

// Activity component uses this
export const getRecentRuns = () =>
    axios.get(`${API}/recent`);