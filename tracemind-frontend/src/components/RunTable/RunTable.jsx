import { useEffect, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";

import {
    getRuns,
    getRun,
    deleteRun
} from "../../services/runService";

import RunModal from "../RunModal/RunModal";

import "./RunTable.css";

function RunTable() {

    const [runs, setRuns] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedRun, setSelectedRun] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        loadRuns();

    }, []);

    async function loadRuns() {

        try {

            const response = await getRuns();

            setRuns(response.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function viewRun(id) {

        try {

            const response = await getRun(id);

            setSelectedRun(response.data);

            setShowModal(true);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function removeRun(id) {

        const confirmDelete = window.confirm(
            "Delete this run?"
        );

        if (!confirmDelete) return;

        try {

            await deleteRun(id);

            loadRuns();

        }

        catch (err) {

            console.log(err);

        }

    }

    const filteredRuns = runs.filter(run =>

        (run.prompt || "")
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="run-card">

            <div className="run-toolbar">

                <div className="search-box">

                    <Search size={18} />

                    <input

                        type="text"

                        placeholder="Search Prompt..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Prompt</th>

                        <th>Status</th>

                        <th>Cost</th>

                        <th>Duration</th>

                        <th>Created</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredRuns.map((run) => (

                            <tr key={run.id}>

                                <td>

                                    {run.prompt}

                                </td>

                                <td>

                                    <span className={`status ${run.status.toLowerCase()}`}>

                                        {run.status}

                                    </span>

                                </td>

                                <td>

                                    ${run.cost?.toFixed(2)}

                                </td>

                                <td>

                                    {run.duration ?? "-"} ms

                                </td>

                                <td>

                                    {

                                        run.createdAt

                                            ? new Date(run.createdAt).toLocaleString()

                                            : "-"

                                    }

                                </td>

                                <td className="actions">

                                    <button

                                        onClick={() => viewRun(run.id)}

                                    >

                                        <Eye size={18} />

                                    </button>

                                    <button

                                        onClick={() => removeRun(run.id)}

                                    >

                                        <Trash2 size={18} />

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            {

                showModal &&

                <RunModal

                    run={selectedRun}

                    onClose={() => setShowModal(false)}

                />

            }

        </div>

    );

}

export default RunTable;