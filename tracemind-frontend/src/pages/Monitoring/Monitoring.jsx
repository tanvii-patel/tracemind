import { useEffect, useState } from "react";
import {
    Cpu,
    MemoryStick,
    HardDrive,
    Bot,
    Activity,
    AlertTriangle,
    Clock3
} from "lucide-react";

import { getSystemHealth } from "../../services/monitoringService";

import "./Monitoring.css";

function Monitoring() {

    const [health, setHealth] = useState({

        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,

        runningAgents: 0,
        activeWorkflows: 0,
        failedRuns: 0

    });

    const [updatedAt, setUpdatedAt] = useState("");

    useEffect(() => {

        loadHealth();

        const interval = setInterval(() => {

            loadHealth();

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    async function loadHealth() {

        try {

            const response = await getSystemHealth();

            setHealth(response.data);

            setUpdatedAt(
                new Date().toLocaleTimeString()
            );

        }

        catch (err) {

            console.log(err);

        }

    }

    function statusColor(value){

        if(value<50) return "green";

        if(value<80) return "yellow";

        return "red";

    }

    return (

        <div className="monitor-page">

            <div className="monitor-header">

                <div>

                    <h1>System Monitoring</h1>

                    <p>

                        Live infrastructure health

                    </p>

                </div>

                <div className="updated">

                    <Clock3 size={18}/>

                    Updated {updatedAt}

                </div>

            </div>

            <div className="usage-grid">

                <div className="usage-card">

                    <Cpu size={30}/>

                    <h3>CPU Usage</h3>

                    <h2>{health.cpuUsage.toFixed(1)}%</h2>

                    <div className="progress">

                        <div

                            className={`fill ${statusColor(health.cpuUsage)}`}

                            style={{width:`${health.cpuUsage}%`}}

                        />

                    </div>

                </div>

                <div className="usage-card">

                    <MemoryStick size={30}/>

                    <h3>Memory Usage</h3>

                    <h2>{health.memoryUsage.toFixed(1)}%</h2>

                    <div className="progress">

                        <div

                            className={`fill ${statusColor(health.memoryUsage)}`}

                            style={{width:`${health.memoryUsage}%`}}

                        />

                    </div>

                </div>

                <div className="usage-card">

                    <HardDrive size={30}/>

                    <h3>Disk Usage</h3>

                    <h2>{health.diskUsage.toFixed(1)}%</h2>

                    <div className="progress">

                        <div

                            className={`fill ${statusColor(health.diskUsage)}`}

                            style={{width:`${health.diskUsage}%`}}

                        />

                    </div>

                </div>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <Bot size={26}/>

                    <h4>Running Agents</h4>

                    <span>{health.runningAgents}</span>

                </div>

                <div className="stat-card">

                    <Activity size={26}/>

                    <h4>Active Workflows</h4>

                    <span>{health.activeWorkflows}</span>

                </div>

                <div className="stat-card">

                    <AlertTriangle size={26}/>

                    <h4>Failed Runs</h4>

                    <span>{health.failedRuns}</span>

                </div>

            </div>

        </div>

    );

}

export default Monitoring;