import { useEffect, useState } from "react";

import {
    PlayCircle,
    CheckCircle2,
    DollarSign,
    Timer
} from "lucide-react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis
} from "recharts";

import { getAnalytics } from "../../services/analyticsService";

import "./Analytics.css";

function Analytics() {

    const [analytics, setAnalytics] = useState({

        totalRuns:0,
        successRuns:0,
        failedRuns:0,
        successRate:0,
        averageCost:0,
        averageDuration:0

    });

    useEffect(()=>{

        loadAnalytics();

    },[]);

    async function loadAnalytics(){

        try{

            const response=await getAnalytics();

            setAnalytics(response.data);

        }

        catch(err){

            console.log(err);

        }

    }

    const pieData=[

        {
            name:"Success",
            value:analytics.successRuns
        },

        {
            name:"Failed",
            value:analytics.failedRuns
        }

    ];

    const COLORS=["#22C55E","#EF4444"];

    const barData=[

        {
            name:"Runs",
            value:analytics.totalRuns
        },

        {
            name:"Success",
            value:analytics.successRuns
        },

        {
            name:"Failed",
            value:analytics.failedRuns
        }

    ];

    return(

        <div className="analytics-page">

            <h1>Analytics</h1>

            <p>AI workflow insights</p>

            <div className="analytics-stats">

                <div className="analytics-card">

                    <PlayCircle/>

                    <h3>Total Runs</h3>

                    <h2>{analytics.totalRuns}</h2>

                </div>

                <div className="analytics-card">

                    <CheckCircle2/>

                    <h3>Success Rate</h3>

                    <h2>{analytics.successRate.toFixed(1)}%</h2>

                </div>

                <div className="analytics-card">

                    <DollarSign/>

                    <h3>Average Cost</h3>

                    <h2>${analytics.averageCost.toFixed(3)}</h2>

                </div>

                <div className="analytics-card">

                    <Timer/>

                    <h3>Avg Duration</h3>

                    <h2>{analytics.averageDuration.toFixed(0)} ms</h2>

                </div>

            </div>

            <div className="chart-grid">

                <div className="chart-card">

                    <h3>Runs by Status</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <PieChart>

                            <Pie

                                data={pieData}

                                dataKey="value"

                                outerRadius={100}

                            >

                                {

                                    pieData.map((entry,index)=>(

                                        <Cell

                                            key={index}

                                            fill={COLORS[index]}

                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip/>

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                <div className="chart-card">

                    <h3>Runs Overview</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <BarChart data={barData}>

                            <XAxis dataKey="name"/>

                            <YAxis/>

                            <Tooltip/>

                            <Bar

                                dataKey="value"

                                fill="#5B7CFF"

                                radius={[8,8,0,0]}

                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}

export default Analytics;