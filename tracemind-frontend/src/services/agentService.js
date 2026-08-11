import axios from "axios";

const API_URL = "http://localhost:8080/api/agents";

function authConfig() {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };
}

export function getAgents() {
    return axios.get(
        API_URL,
        authConfig()
    );
}

export function createAgent(agent) {
    return axios.post(
        API_URL,
        agent,
        authConfig()
    );
}

export function updateAgent(id, agent) {
    return axios.put(
        `${API_URL}/${id}`,
        agent,
        authConfig()
    );
}

export function deleteAgent(id) {
    return axios.delete(
        `${API_URL}/${id}`,
        authConfig()
    );
}