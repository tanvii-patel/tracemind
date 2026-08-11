import { X } from "lucide-react";

import "./RunModal.css";

function RunModal({ run, onClose }) {

    if (!run) return null;

    return (

        <div className="modal-overlay">

            <div className="run-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >

                    <X size={20} />

                </button>

                <h2>Run Details</h2>

                <div className="run-info">

                    <p><strong>Status:</strong> {run.status}</p>

                    <p><strong>Cost:</strong> ${run.cost}</p>

                    <p><strong>Duration:</strong> {run.duration ?? "-"} ms</p>

                    <p><strong>Created:</strong> {run.createdAt ?? "-"}</p>

                </div>

                <div className="section">

                    <h3>Prompt</h3>

                    <div className="box">

                        {run.prompt}

                    </div>

                </div>

                <div className="section">

                    <h3>Response</h3>

                    <div className="box">

                        {run.response}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RunModal;