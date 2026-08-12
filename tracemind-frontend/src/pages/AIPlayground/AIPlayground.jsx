import { useEffect, useState } from "react";

import {
    Sparkles,
    Play,
    Clock,
    DollarSign,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

import axios from "axios";

import "./AIPlayground.css";

function AIPlayground() {

    const [agents, setAgents] = useState([]);

    const [form, setForm] = useState({
        provider: "GEMINI",
        model: "gemini-3.5-flash",
        prompt: "",
        agentId: ""
    });

    const [response, setResponse] = useState("");
    const [runInfo, setRunInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // LOAD AGENTS
    // =========================

    useEffect(() => {
        loadAgents();
    }, []);

    async function loadAgents() {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://trace-mind.onrender.com/api/agents",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAgents(res.data);

        } catch (err) {

            console.error("AGENT LOAD ERROR:", err);

            setError("Unable to load agents.");

        }
    }

    // =========================
    // HANDLE INPUT
    // =========================

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    // =========================
    // EXECUTE AI
    // =========================

    async function executeAI(e) {

        e.preventDefault();

        if (!form.prompt.trim()) {

            setError("Please enter a prompt.");

            return;
        }

        setLoading(true);
        setError("");
        setResponse("");
        setRunInfo(null);

        const startTime = Date.now();

        try {

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "https://trace-mind.onrender.com/api/ai/execute",
                {
                    provider: "GEMINI",
                    model: "gemini-3.5-flash",
                    prompt: form.prompt,
                    agentId: form.agentId
                        ? Number(form.agentId)
                        : null
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const duration = Date.now() - startTime;

            setResponse(res.data.response);

            setRunInfo({
                status: res.data.status,
                cost: res.data.cost,
                duration: res.data.duration || duration,
                createdAt: res.data.createdAt
            });

            // Reload agents so Runs/Cost values update
            loadAgents();

        } catch (err) {

            console.error("AI EXECUTION ERROR:", err);

            if (err.response) {

                setError(
                    err.response.data?.message ||
                    err.response.data?.error ||
                    `AI execution failed (${err.response.status})`
                );

            } else if (err.request) {

                setError(
                    "Cannot connect to the backend. Make sure Spring Boot is running."
                );

            } else {

                setError("AI execution failed.");

            }

        } finally {

            setLoading(false);

        }
    }

    return (

        <div className="playground-page">

            {/* HEADER */}

            <div className="playground-header">

                <div className="title-row">

                    <Sparkles size={30} />

                    <div>

                        <h1>AI Playground</h1>

                        <p>
                            Test and execute Gemini AI directly from TraceMind.
                        </p>

                    </div>

                </div>

            </div>


            <div className="playground-grid">

                {/* ========================= */}
                {/* LEFT PANEL */}
                {/* ========================= */}

                <div className="playground-card">

                    <div className="card-heading">

                        <h2>AI Configuration</h2>

                        <span>
                            Configure your AI execution
                        </span>

                    </div>


                    <form onSubmit={executeAI}>

                        {/* PROVIDER */}

                        <label>
                            Provider
                        </label>

                        <select
                            name="provider"
                            value={form.provider}
                            onChange={handleChange}
                        >

                            <option value="GEMINI">
                                Google Gemini
                            </option>

                        </select>


                        {/* MODEL */}

                        <label>
                            Model
                        </label>

                        <input
                            type="text"
                            value="gemini-3.5-flash"
                            readOnly
                        />


                        {/* AGENT */}

                        <label>
                            Agent
                        </label>

                        <select
                            name="agentId"
                            value={form.agentId}
                            onChange={handleChange}
                        >

                            <option value="">
                                No Agent
                            </option>

                            {agents.map((agent) => (

                                <option
                                    key={agent.id}
                                    value={agent.id}
                                >
                                    {agent.name} — ID {agent.id}
                                </option>

                            ))}

                        </select>


                        {/* SELECTED AGENT INFO */}

                        {form.agentId && (

                            <div className="selected-agent-info">

                                {(() => {

                                    const selectedAgent =
                                        agents.find(
                                            agent =>
                                                String(agent.id) ===
                                                String(form.agentId)
                                        );

                                    if (!selectedAgent) {
                                        return null;
                                    }

                                    return (
                                        <>
                                            <strong>
                                                {selectedAgent.name}
                                            </strong>

                                            <span>
                                                {selectedAgent.description ||
                                                    "AI automation agent"}
                                            </span>

                                            <small>
                                                Status:{" "}
                                                {selectedAgent.status}
                                            </small>
                                        </>
                                    );

                                })()}

                            </div>

                        )}


                        {/* PROMPT */}

                        <label>
                            Prompt
                        </label>

                        <textarea
                            name="prompt"
                            rows="9"
                            placeholder="Enter your prompt here..."
                            value={form.prompt}
                            onChange={handleChange}
                        />


                        {/* ERROR */}

                        {error && (

                            <div className="playground-error">

                                <AlertCircle size={18} />

                                <span>
                                    {error}
                                </span>

                            </div>

                        )}


                        {/* EXECUTE BUTTON */}

                        <button
                            type="submit"
                            className="execute-btn"
                            disabled={loading}
                        >

                            {loading ? (

                                <>
                                    <span className="spinner"></span>
                                    Running...
                                </>

                            ) : (

                                <>
                                    <Play size={18} />
                                    Execute AI
                                </>

                            )}

                        </button>

                    </form>

                </div>


                {/* ========================= */}
                {/* RIGHT PANEL */}
                {/* ========================= */}

                <div className="playground-card response-card">

                    <div className="card-heading">

                        <h2>AI Response</h2>

                        <span>
                            Gemini 3.5 Flash output
                        </span>

                    </div>


                    {/* EMPTY */}

                    {!response && !loading && (

                        <div className="empty-response">

                            <Sparkles size={42} />

                            <h3>
                                Ready to execute
                            </h3>

                            <p>
                                Enter a prompt and execute Gemini.
                            </p>

                        </div>

                    )}


                    {/* LOADING */}

                    {loading && (

                        <div className="empty-response">

                            <div className="loading-orb">

                                <Sparkles size={32} />

                            </div>

                            <h3>
                                AI is thinking...
                            </h3>

                            <p>
                                Waiting for Gemini response.
                            </p>

                        </div>

                    )}


                    {/* RESPONSE */}

                    {response && (

                        <div className="response-content">

                            <div className="success-badge">

                                <CheckCircle2 size={17} />

                                Execution successful

                            </div>


                            <div className="response-text">

                                {response}

                            </div>

                        </div>

                    )}


                    {/* RUN INFORMATION */}

                    {runInfo && (

                        <div className="run-info">

                            <div>

                                <Clock size={17} />

                                <span>
                                    {runInfo.duration} ms
                                </span>

                            </div>


                            <div>

                                <DollarSign size={17} />

                                <span>
                                    $
                                    {Number(
                                        runInfo.cost || 0
                                    ).toFixed(4)}
                                </span>

                            </div>


                            <div>

                                <CheckCircle2 size={17} />

                                <span>
                                    {runInfo.status}
                                </span>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
}

export default AIPlayground;