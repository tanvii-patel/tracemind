import { useEffect, useState } from "react";

import {
    Bot,
    Activity,
    CheckCircle2,
    Clock3
} from "lucide-react";

import StatCard from "./StatCard";

import { getDashboardStats } from "../../services/dashboardService";

function Stats() {

    const [stats, setStats] = useState({
        totalAgents: 0,
        activeAgents: 0,
        successfulRuns: 0,
        averageLatency: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="row g-4">

            <div className="col-12 col-sm-6 col-xl-3">

                <StatCard
                    title="AI Agents"
                    value={stats.totalAgents}
                    change="Registered"
                    color="blue"
                    icon={<Bot size={24} />}
                />

            </div>

            <div className="col-12 col-sm-6 col-xl-3">

                <StatCard
                    title="Active"
                    value={stats.activeAgents}
                    change="Currently Running"
                    color="green"
                    icon={<Activity size={24} />}
                />

            </div>

            <div className="col-12 col-sm-6 col-xl-3">

                <StatCard
                    title="Successful Runs"
                    value={stats.successfulRuns}
                    change="Completed"
                    color="purple"
                    icon={<CheckCircle2 size={24} />}
                />

            </div>

            <div className="col-12 col-sm-6 col-xl-3">

                <StatCard
                    title="Avg Latency"
                    value={`${Math.round(stats.averageLatency)} ms`}
                    change="Execution"
                    color="orange"
                    icon={<Clock3 size={24} />}
                />

            </div>

        </div>

    );
}

export default Stats;