import { useEffect, useState } from "react";

import {
    Plus,
    Pencil,
    Trash2,
    Search,
    Bot
} from "lucide-react";

import AgentModal from "../AgentModal/AgentModal";

import {
    getAgents,
    createAgent,
    updateAgent,
    deleteAgent
} from "../../services/agentService";

import "./AgentTable.css";

function AgentTable() {

    const [agents, setAgents] = useState([]);

    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [selectedAgent, setSelectedAgent] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    useEffect(() => {

        loadAgents();

    }, []);


    async function loadAgents() {

        try {

            setLoading(true);
            setError("");

            const response = await getAgents();

            console.log("AGENTS FROM BACKEND:", response.data);

            setAgents(response.data);

        } catch (err) {

            console.error("GET AGENTS ERROR:", err);

            if (err.response?.status === 401) {

                setError("Session expired. Please login again.");

            } else if (err.response?.status === 403) {

                setError("You are not authorized to access agents.");

            } else {

                setError("Unable to load agents.");

            }

        } finally {

            setLoading(false);

        }

    }


    async function handleSave(agent) {

        try {

            setError("");

            if (selectedAgent) {

                await updateAgent(
                    selectedAgent.id,
                    agent
                );

            } else {

                await createAgent(agent);

            }

            setOpenModal(false);

            setSelectedAgent(null);

            await loadAgents();

        } catch (err) {

            console.error("SAVE AGENT ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Unable to save agent."
            );

        }

    }


    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete this agent?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            setError("");

            await deleteAgent(id);

            await loadAgents();

        } catch (err) {

            console.error("DELETE AGENT ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Unable to delete agent."
            );

        }

    }


    const filteredAgents = agents.filter((agent) => {

        const searchText = search.toLowerCase();

        return (
            agent.name?.toLowerCase().includes(searchText) ||
            agent.model?.toLowerCase().includes(searchText) ||
            String(agent.id).includes(searchText)
        );

    });


    return (

        <>

            <div className="agent-manager">


                {/* TOP BAR */}

                <div className="agent-manager-top">

                    <div className="agent-search">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search agents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    <button
                        className="create-agent-btn"
                        onClick={() => {

                            setSelectedAgent(null);

                            setOpenModal(true);

                        }}
                    >

                        <Plus size={18} />

                        <span>
                            Create Agent
                        </span>

                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div
                        style={{
                            marginBottom: "16px",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            background: "rgba(239,68,68,.1)",
                            border: "1px solid rgba(239,68,68,.25)",
                            color: "#FCA5A5"
                        }}
                    >
                        {error}
                    </div>

                )}


                {/* AGENT LIST */}

                <div className="agent-list">


                    {/* HEADER */}

                    <div className="agent-list-header">

                        <span>ID</span>

                        <span>Agent</span>

                        <span>Model</span>

                        <span>Status</span>

                        <span>Runs</span>

                        <span>Cost</span>

                        <span>Actions</span>

                    </div>


                    {/* BODY */}

                    <div className="agent-list-body">


                        {loading ? (

                            <div className="empty-agents">

                                <Bot size={38} />

                                <h3>
                                    Loading agents...
                                </h3>

                            </div>

                        ) : filteredAgents.length === 0 ? (

                            <div className="empty-agents">

                                <Bot size={38} />

                                <h3>
                                    No agents found
                                </h3>

                                <p>
                                    Create your first AI agent
                                    to get started.
                                </p>

                            </div>

                        ) : (

                            filteredAgents.map((agent) => (

                                <div
                                    className="agent-row"
                                    key={agent.id}
                                >


                                    {/* ID */}

                                    <div className="agent-id">

                                        #{agent.id}

                                    </div>


                                    {/* AGENT */}

                                    <div className="agent-identity">

                                        <div className="agent-avatar">

                                            <Bot size={20} />

                                        </div>


                                        <div>

                                            <strong>
                                                {agent.name}
                                            </strong>

                                            <small>
                                                {agent.description ||
                                                    "AI automation agent"}
                                            </small>

                                        </div>

                                    </div>


                                    {/* MODEL */}

                                    <div className="agent-model">

                                        <span className="model-badge">

                                            {agent.model ||
                                                "gemini-3.5-flash"}

                                        </span>

                                    </div>


                                    {/* STATUS */}

                                    <div>

                                        <span
                                            className={`agent-status ${
                                                agent.status?.toLowerCase()
                                            }`}
                                        >

                                            <span className="status-indicator"></span>

                                            {agent.status || "ACTIVE"}

                                        </span>

                                    </div>


                                    {/* RUNS */}

                                    <div className="agent-metric">

                                        {agent.totalRuns || 0}

                                    </div>


                                    {/* COST */}

                                    <div className="agent-cost">

                                        $
                                        {Number(
                                            agent.totalCost || 0
                                        ).toFixed(2)}

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="agent-actions">


                                        <button
                                            className="edit-agent"
                                            title="Edit agent"
                                            onClick={() => {

                                                setSelectedAgent(agent);

                                                setOpenModal(true);

                                            }}
                                        >

                                            <Pencil size={17} />

                                        </button>


                                        <button
                                            className="delete-agent"
                                            title="Delete agent"
                                            onClick={() =>
                                                handleDelete(agent.id)
                                            }
                                        >

                                            <Trash2 size={17} />

                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>


            {/* MODAL */}

            <AgentModal

                open={openModal}

                onClose={() => {

                    setOpenModal(false);

                    setSelectedAgent(null);

                }}

                onSave={handleSave}

                initialData={selectedAgent}

            />

        </>

    );

}

export default AgentTable;