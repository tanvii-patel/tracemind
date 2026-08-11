import "./Hero.css";

import {

    Plus,
    Play,
    BarChart3,
    Activity,
    Cpu,
    BrainCircuit

} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Hero() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="hero-card">

            <div className="container-fluid">

                <div className="row align-items-center">

                    <div className="col-lg-8">

                        <span className="hero-badge">

                            <BrainCircuit size={16}/>

                            AI OPERATIONS PLATFORM

                        </span>

                        <h1>

                            Welcome back,

                            <span>

                                {user?.fullName || "User"} 👋

                            </span>

                        </h1>

                        <p>

                            Monitor autonomous AI agents,
                            workflows,
                            executions and performance
                            from one intelligent dashboard.

                        </p>

                        <div className="hero-buttons">

                            <button
                                className="primary-btn"
                                onClick={() => navigate("/agents")}
                            >

                                <Plus size={18}/>

                                New Agent

                            </button>

                            <button
                                className="secondary-btn"
                            >

                                <Play size={18}/>

                                Run Workflow

                            </button>

                            <button
                                className="secondary-btn"
                                onClick={() => navigate("/analytics")}
                            >

                                <BarChart3 size={18}/>

                                Analytics

                            </button>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="status-panel">

                            <h3>

                                System Status

                            </h3>

                            <div className="status-item">

                                <Activity size={18}/>

                                <span>

                                    Healthy

                                </span>

                                <div className="green-dot"></div>

                            </div>

                            <div className="status-item">

                                <Cpu size={18}/>

                                <span>

                                    CPU Usage

                                </span>

                                <strong>

                                    12%

                                </strong>

                            </div>

                            <div className="status-item">

                                <BrainCircuit size={18}/>

                                <span>

                                    Running Agents

                                </span>

                                <strong>

                                    8

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Hero;