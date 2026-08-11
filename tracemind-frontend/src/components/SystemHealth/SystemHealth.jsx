import {
    Cpu,
    MemoryStick,
    Server,
    Wifi
} from "lucide-react";

import "./SystemHealth.css";

function SystemHealth() {

    return (

        <div className="health-card">

            <div className="health-header">

                <h2>System Health</h2>

                <span className="online">

                    ● Online

                </span>

            </div>

            <div className="health-item">

                <div className="health-title">

                    <Cpu size={20}/>

                    <span>CPU Usage</span>

                    <strong>34%</strong>

                </div>

                <div className="progress">

                    <div
                        className="fill cpu"
                        style={{width:"34%"}}
                    ></div>

                </div>

            </div>

            <div className="health-item">

                <div className="health-title">

                    <MemoryStick size={20}/>

                    <span>Memory</span>

                    <strong>68%</strong>

                </div>

                <div className="progress">

                    <div
                        className="fill memory"
                        style={{width:"68%"}}
                    ></div>

                </div>

            </div>

            <div className="health-item">

                <div className="health-title">

                    <Server size={20}/>

                    <span>Queue</span>

                    <strong>14 Jobs</strong>

                </div>

                <div className="progress">

                    <div
                        className="fill queue"
                        style={{width:"45%"}}
                    ></div>

                </div>

            </div>

            <div className="health-item">

                <div className="health-title">

                    <Wifi size={20}/>

                    <span>API Status</span>

                    <strong>100%</strong>

                </div>

                <div className="progress">

                    <div
                        className="fill api"
                        style={{width:"100%"}}
                    ></div>

                </div>

            </div>

        </div>

    );

}

export default SystemHealth;