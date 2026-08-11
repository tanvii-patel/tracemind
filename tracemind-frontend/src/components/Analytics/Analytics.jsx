import {
    TrendingUp,
    Activity,
    Timer,
    DollarSign
} from "lucide-react";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
    XAxis
} from "recharts";

import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/dashboardService";

import "./Analytics.css";

function Analytics() {

    const [stats, setStats] = useState({

        totalAgents: 0,
        activeAgents: 0,
        totalRuns: 0,
        successfulRuns: 0,
        failedRuns: 0,
        totalCost: 0,
        averageLatency: 0

    });

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data = await getDashboardStats();

            setStats(data);

            setChartData([

                {
                    day: "Agents",
                    runs: data.totalAgents
                },

                {
                    day: "Active",
                    runs: data.activeAgents
                },

                {
                    day: "Runs",
                    runs: data.totalRuns
                },

                {
                    day: "Success",
                    runs: data.successfulRuns
                },

                {
                    day: "Failed",
                    runs: data.failedRuns
                }

            ]);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="analytics-card">

            <div className="analytics-header">

                <div>

                    <h2>Workflow Analytics</h2>

                    <p>AI execution insights • Live</p>

                </div>

                <div className="live-indicator">

                    <span className="live-dot"></span>

                    Live

                </div>

            </div>

            <div className="analytics-stats">

                <div className="mini-card">

                    <Activity size={22} />

                    <div>

                        <span>Total Runs</span>

                        <h3>{stats.totalRuns}</h3>

                    </div>

                </div>

                <div className="mini-card">

                    <TrendingUp size={22} />

                    <div>

                        <span>Success Rate</span>

                        <h3>

                            {

                                stats.totalRuns === 0

                                    ? "0%"

                                    : `${((stats.successfulRuns / stats.totalRuns) * 100).toFixed(1)}%`

                            }

                        </h3>

                    </div>

                </div>

                <div className="mini-card">

                    <Timer size={22} />

                    <div>

                        <span>Avg Latency</span>

                        <h3>{stats.averageLatency.toFixed(1)} ms</h3>

                    </div>

                </div>

                <div className="mini-card">

                    <DollarSign size={22} />

                    <div>

                        <span>Total Cost</span>

                        <h3>${stats.totalCost.toFixed(2)}</h3>

                    </div>

                </div>

            </div>

            <div className="chart-container">

                <ResponsiveContainer
                    width="100%"
                    height={290}
                >

                    <AreaChart data={chartData}>

                        <defs>

                            <linearGradient

                                id="gradient"

                                x1="0"

                                y1="0"

                                x2="0"

                                y2="1"

                            >

                                <stop

                                    offset="0%"

                                    stopColor="#5B7CFF"

                                    stopOpacity={0.55}

                                />

                                <stop

                                    offset="100%"

                                    stopColor="#5B7CFF"

                                    stopOpacity={0}

                                />

                            </linearGradient>

                        </defs>

                        <XAxis

                            dataKey="day"

                            tick={{
                                fill: "#9CA3AF",
                                fontSize: 13
                            }}

                            axisLine={false}

                            tickLine={false}

                        />

                        <Tooltip

                            contentStyle={{

                                background: "#111827",

                                border: "none",

                                borderRadius: "12px",

                                color: "white"

                            }}

                        />

                        <Area

                            type="monotone"

                            dataKey="runs"

                            stroke="#5B7CFF"

                            strokeWidth={4}

                            fill="url(#gradient)"

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default Analytics;