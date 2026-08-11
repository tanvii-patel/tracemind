import "./Navbar.css";

import {
    Search,
    Bell,
    Moon,
    ChevronDown,
    User,
    Settings,
    LogOut
} from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    const fullName = user?.fullName || "User";


    /* Close dropdown when clicking outside */

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {

                setProfileOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    /* Logout */

    function handleLogout() {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        navigate("/login");

    }


    return (

        <div className="navbar">

            {/* SEARCH */}

            <div className="navbar-search">

                <Search size={18} />

                <input
                    placeholder="Search agents, runs, workflows..."
                />

            </div>


            {/* RIGHT SIDE */}

            <div className="navbar-right">


                {/* SYSTEM STATUS */}

                <div className="system-status">

                    <span className="status-dot"></span>

                    <span>
                        System Healthy
                    </span>

                </div>




                {/* PROFILE */}

                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >

                    <button
                        className={`profile ${
                            profileOpen ? "profile-active" : ""
                        }`}
                        type="button"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                    >

                        <div className="avatar">

                            {fullName
                                .charAt(0)
                                .toUpperCase()
                            }

                        </div>


                        <div className="profile-info">

                            <h4>
                                {fullName}
                            </h4>

                            <span>
                                Administrator
                            </span>

                        </div>


                        <ChevronDown
                            className={`profile-arrow ${
                                profileOpen
                                    ? "arrow-open"
                                    : ""
                            }`}
                            size={18}
                        />

                    </button>


                    {/* DROPDOWN */}

                    {profileOpen && (

                        <div className="profile-dropdown">


                            



                           


                            <button
                                type="button"
                                className="logout-btn"
                                onClick={handleLogout}
                            >

                                <LogOut size={17} />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Navbar;