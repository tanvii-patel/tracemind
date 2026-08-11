import { useEffect, useState } from "react";
import { getRecentRuns } from "../../services/runService";

import {
    CheckCircle2,
    XCircle,
    LoaderCircle
} from "lucide-react";

import "./Activity.css";

function Activity() {

    const [runs, setRuns] = useState([]);

    useEffect(() => {

        loadRuns();

    }, []);

    async function loadRuns() {

        try {

            const response = await getRecentRuns();

            setRuns(response.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    function getStatusIcon(status) {

        if (status === "SUCCESS") {
            return <CheckCircle2 className="success" size={18} />;
        }

        if (status === "FAILED") {
            return <XCircle className="failed" size={18} />;
        }

        return <LoaderCircle className="running" size={18} />;

    }

    function getStatusText(status) {

        if (status === "SUCCESS") {
            return "Completed Successfully";
        }

        if (status === "FAILED") {
            return "Execution Failed";
        }

        return "Running";

    }

    return (

        <div className="activity-card">

            <div className="activity-header">

                <h2>Recent Activity</h2>

            </div>

            <div className="activity-list">

                {

                    runs.map((run) => (

                        <div
                            key={run.id}
                            className="activity-item"
                        >

                            <div className="activity-icon">

                                {getStatusIcon(run.status)}

                            </div>

                            <div className="activity-info">

                                <h4>

                                    {run.agentName}

                                </h4>

                                <p>

                                    {getStatusText(run.status)}

                                </p>

                            </div>

                            <div className="activity-meta">

                                <span>

                                    ${run.cost?.toFixed(2) ?? "0.00"}

                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Activity;