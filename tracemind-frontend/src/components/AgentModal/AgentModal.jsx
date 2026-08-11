import { useEffect, useState } from "react";

import "./AgentModal.css";

function AgentModal({
    open,
    onClose,
    onSave,
    initialData
}) {

    const [form, setForm] = useState({
        name: "",
        description: "",
        model: "gemini-3.5-flash",
        status: "ACTIVE",
        totalRuns: 0,
        totalCost: 0
    });


    useEffect(() => {

        if (initialData) {

            setForm({
                name: initialData.name || "",
                description: initialData.description || "",
                model: initialData.model || "gemini-3.5-flash",
                status: initialData.status || "ACTIVE",
                totalRuns: initialData.totalRuns || 0,
                totalCost: initialData.totalCost || 0
            });

        } else {

            setForm({
                name: "",
                description: "",
                model: "gemini-3.5-flash",
                status: "ACTIVE",
                totalRuns: 0,
                totalCost: 0
            });

        }

    }, [initialData]);


    if (!open) {
        return null;
    }


    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }


    function handleSubmit(e) {

        e.preventDefault();

        onSave(form);

    }


    return (

        <div className="modal-overlay">

            <div className="agent-modal">

                <h2>
                    {initialData
                        ? "Edit Agent"
                        : "Create Agent"}
                </h2>


                <form onSubmit={handleSubmit}>


                    {/* NAME */}

                    <input
                        type="text"
                        name="name"
                        placeholder="Agent Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />


                    {/* DESCRIPTION */}

                    <textarea
                        name="description"
                        placeholder="What does this agent do?"
                        value={form.description}
                        onChange={handleChange}
                    />


                    {/* MODEL */}

                    <select
                        name="model"
                        value={form.model}
                        onChange={handleChange}
                    >

                        <option value="gemini-3.5-flash">
                            Gemini 3.5 Flash
                        </option>

                    </select>


                    {/* STATUS */}

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >

                        <option value="ACTIVE">
                            ACTIVE
                        </option>

                        <option value="INACTIVE">
                            INACTIVE
                        </option>

                    </select>


                    {/* BUTTONS */}

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-btn"
                        >
                            {initialData
                                ? "Update Agent"
                                : "Create Agent"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AgentModal;