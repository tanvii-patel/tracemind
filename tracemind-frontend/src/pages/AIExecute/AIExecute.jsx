import { useEffect, useState } from "react";
import {
    Play,
    Loader2,
    Bot,
    Sparkles,
    Clock3,
    DollarSign,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

import axios from "axios";

import "./AIExecute.css";

const API = "http://localhost:8080/api";

function AIExecute() {

    const [agents, setAgents] = useState([]);
    const [models, setModels] = useState([]);

    const [form, setForm] = useState({
        agentId: "",
        provider: "GEMINI",
        model: "",
        prompt: ""
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // LOAD AGENTS + MODELS
    // =========================

    useEffect(() => {

        loadAgents();
        loadModels();

    }, []);

    async function loadAgents() {

        try {

            const response = await axios.get(
                `${API}/agents`
            );

            setAgents(response.data);

        } catch (err) {

    console.error("AI EXECUTION ERROR:", err);

    console.error("STATUS:", err.response?.status);

    console.error("DATA:", err.response?.data);

    setError(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "AI execution failed."
    );

}
    }

    async function loadModels() {

        try {

            const response = await axios.get(
                `${API}/ai/models`
            );

            setModels(response.data);

            if (response.data.length > 0) {

                setForm(prev => ({
                    ...prev,
                    model: response.data[0]
                }));

            }

        } catch (err) {

            console.log(err);

        }

    }

    // =========================
    // INPUT CHANGE
    // =========================

    function handleChange(e) {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    }

    // =========================
    // EXECUTE AI
    // =========================

    async function executeAI(e) {

        e.preventDefault();

        setError("");
        setResult(null);

        if (!form.agentId) {

            setError("Please select an agent.");
            return;

        }

        if (!form.model) {

            setError("Please select a model.");
            return;

        }

        if (!form.prompt.trim()) {

            setError("Please enter a prompt.");
            return;

        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${API}/ai/execute`,
                {
                    provider: form.provider,
                    model: form.model,
                    prompt: form.prompt,
                    agentId: Number(form.agentId)
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setResult(response.data);

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data?.message ||
                "AI execution failed."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="ai-execute-page">

            {/* HEADER */}

            <div className="ai-header">

                <div>

                    <div className="ai-title">

                        <Sparkles size={25} />

                        <h1>AI Execution</h1>

                    </div>

                    <p>
                        Run your AI agents and monitor execution results.
                    </p>

                </div>

            </div>

            {/* MAIN GRID */}

            <div className="ai-execute-grid">

                {/* EXECUTION FORM */}

                <div className="ai-panel">

                    <div className="panel-header">

                        <Bot size={21} />

                        <div>

                            <h2>Execute Agent</h2>

                            <p>
                                Configure your AI execution
                            </p>

                        </div>

                    </div>

                    <form
                        className="ai-form"
                        onSubmit={executeAI}
                    >

                        {/* AGENT */}

                        <div className="form-group">

                            <label>Agent</label>

                            <select
                                name="agentId"
                                value={form.agentId}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Agent
                                </option>

                                {agents.map(agent => (

                                    <option
                                        key={agent.id}
                                        value={agent.id}
                                    >
                                        {agent.name}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* PROVIDER */}

                        <div className="form-group">

                            <label>Provider</label>

                            <select
                                name="provider"
                                value={form.provider}
                                onChange={handleChange}
                            >

                                <option value="GEMINI">
                                    Google Gemini
                                </option>

                            </select>

                        </div>

                        {/* MODEL */}

                        <div className="form-group">

                            <label>Model</label>

                            <select
                                name="model"
                                value={form.model}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Model
                                </option>

                                {models.map(model => (

                                    <option
                                        key={model}
                                        value={model}
                                    >
                                        {model.replace(
                                            "models/",
                                            ""
                                        )}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* PROMPT */}

                        <div className="form-group">

                            <label>Prompt</label>

                            <textarea
                                name="prompt"
                                value={form.prompt}
                                onChange={handleChange}
                                placeholder="Enter your prompt..."
                                rows="8"
                            />

                        </div>

                        {/* ERROR */}

                        {error && (

                            <div className="ai-error">

                                <AlertCircle size={18} />

                                {error}

                            </div>

                        )}

                        {/* BUTTON */}

                        <button
                            className="execute-button"
                            disabled={loading}
                        >

                            {loading ? (

                                <>
                                    <Loader2
                                        size={18}
                                        className="spin"
                                    />

                                    Executing...

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

                {/* RESULT */}

                <div className="ai-panel result-panel">

                    <div className="panel-header">

                        <Sparkles size={21} />

                        <div>

                            <h2>Execution Result</h2>

                            <p>
                                AI response and execution details
                            </p>

                        </div>

                    </div>

                    {!result && !loading && (

                        <div className="empty-result">

                            <Sparkles size={42} />

                            <h3>No execution yet</h3>

                            <p>
                                Configure an agent and execute a prompt
                                to see the result here.
                            </p>

                        </div>

                    )}

                    {loading && (

                        <div className="empty-result">

                            <Loader2
                                size={42}
                                className="spin"
                            />

                            <h3>AI is thinking...</h3>

                            <p>
                                Waiting for the model response.
                            </p>

                        </div>

                    )}

                    {result && !loading && (

                        <div className="result-content">

                            <div className="result-status">

                                {result.status === "SUCCESS" ? (

                                    <CheckCircle2 size={20} />

                                ) : (

                                    <AlertCircle size={20} />

                                )}

                                <span>
                                    {result.status}
                                </span>

                            </div>

                            <div className="response-box">

                                <h3>AI Response</h3>

                                <div className="response-text">

                                    {result.response}

                                </div>

                            </div>

                            <div className="execution-info">

                                <div>

                                    <Clock3 size={18} />

                                    <span>Duration</span>

                                    <strong>
                                        {result.duration ?? "-"} ms
                                    </strong>

                                </div>

                                <div>

                                    <DollarSign size={18} />

                                    <span>Cost</span>

                                    <strong>
                                        ${Number(
                                            result.cost ?? 0
                                        ).toFixed(3)}
                                    </strong>

                                </div>

                                <div>

                                    <Bot size={18} />

                                    <span>Model</span>

                                    <strong>
                                        {result.model}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default AIExecute;