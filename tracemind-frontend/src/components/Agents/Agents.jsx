import { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { getAgents } from "../../services/agentService";

import "./Agents.css";

function Agents() {

    const [agents, setAgents] = useState([]);

    useEffect(() => {

        loadAgents();

    }, []);

    async function loadAgents() {

        try {

            const response = await getAgents();

            setAgents(Array.isArray(response.data) ? response.data : []);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="agents-card">

            <div className="agents-header">

                <h3>Running Agents</h3>

                <span>{agents.length} Agents</span>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Agent</th>

                        <th>Model</th>

                        <th>Status</th>

                        <th>Runs</th>

                        <th>Cost</th>

                    </tr>

                </thead>

                <tbody>

                    {agents.map((agent) => (

                        <tr key={agent.id}>

                            <td>

                                <div className="agent-name">

                                    <Bot size={18} />

                                    <div>

                                        <strong>{agent.name}</strong>

                                        <p>{agent.description}</p>

                                    </div>

                                </div>

                            </td>

                            <td>{agent.model}</td>

                            <td>

                                <span className={`status ${agent.status.toLowerCase()}`}>

                                    {agent.status}

                                </span>

                            </td>

                            <td>{agent.totalRuns}</td>

                            <td>

                                ${agent.totalCost?.toFixed(2)}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Agents;