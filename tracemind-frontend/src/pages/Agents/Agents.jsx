import AgentTable from "../../components/AgentTable/AgentTable";
import "./Agents.css";

function Agents() {

    return (

        <div className="agents-page">

            <div className="page-header">

                <div>

                    <h1>AI Agents</h1>

                    <p>Manage all your AI agents from one place.</p>

                </div>

            </div>

            <AgentTable />

        </div>

    );

}

export default Agents;