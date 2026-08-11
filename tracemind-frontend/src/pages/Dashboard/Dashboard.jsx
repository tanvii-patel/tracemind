import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";
import Analytics from "../../components/Analytics/Analytics";
import Activity from "../../components/Activity/Activity";
import Agents from "../../components/Agents/Agents";
import SystemHealth from "../../components/SystemHealth/SystemHealth";

import "./Dashboard.css";

function Dashboard() {

    return (

        <div className="dashboard-page">

            <Hero />

            <Stats />

            <div className="row g-4">

                <div className="col-12 col-xl-7">

                    <Analytics />

                </div>

                <div className="col-12 col-xl-5">

                    <Activity />

                </div>

            </div>

            <div className="row g-4">

                <div className="col-12 col-xl-7">

                    <Agents />

                </div>

                <div className="col-12 col-xl-5">

                    <SystemHealth />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;