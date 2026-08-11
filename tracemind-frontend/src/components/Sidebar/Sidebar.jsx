import {
    LayoutDashboard,
    Bot,
    PlayCircle,
    Activity,
    BarChart3,
    History,
    LogOut,
    BrainCircuit,
    Sparkles
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    }

    return (

        <aside className="sidebar">

            <div>

                {/* LOGO */}

                <div className="logo">

                    <BrainCircuit size={34} />

                    <div>

                        <h2>TraceMind</h2>

                        <span>AI Operations</span>

                    </div>

                </div>


                {/* MAIN */}

                <div className="sidebar-group">

                    <span>MAIN</span>

                    <NavLink to="/">

                        <LayoutDashboard size={20} />

                        Dashboard

                    </NavLink>

                </div>


                {/* OPERATIONS */}

                <div className="sidebar-group">

                    <span>OPERATIONS</span>

                    <NavLink to="/agents">

                        <Bot size={20} />

                        Agents

                    </NavLink>

                    <NavLink to="/runs">

                        <PlayCircle size={20} />

                        Runs

                    </NavLink>

                    <NavLink to="/history">

                        <History size={20} />

                        History

                    </NavLink>

                </div>


                {/* AI */}

                <div className="sidebar-group">

                    <span>AI</span>

                    <NavLink to="/playground">

                        <Sparkles size={20} />

                        AI Playground

                    </NavLink>

                </div>


                {/* INSIGHTS */}

                <div className="sidebar-group">

                    <span>INSIGHTS</span>

                    <NavLink to="/monitoring">

                        <Activity size={20} />

                        Monitoring

                    </NavLink>

                    <NavLink to="/analytics">

                        <BarChart3 size={20} />

                        Analytics

                    </NavLink>

                </div>

            </div>


            {/* USER */}

            <div className="sidebar-user">

                <div className="user-info">

                    <h4>
                        {user?.fullName || "User"}
                    </h4>

                    <p>
                        {user?.email || "Logged in"}
                    </p>

                </div>

                <button
                    onClick={logout}
                    title="Logout"
                >

                    <LogOut size={18} />

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;