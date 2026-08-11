import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import Agents from "./pages/Agents/Agents";
import Runs from "./pages/Runs/Runs";
import Analytics from "./pages/Analytics/Analytics";
import Monitoring from "./pages/Monitoring/Monitoring";
import History from "./pages/History/History";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./App.css";
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/animations.css";
import AIExecute from "./pages/AIExecute/AIExecute";
import Playground from "./pages/AIPlayground/AIPlayground";
function App() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/*"
                element={

                    <ProtectedRoute>

                        <div className="app-layout">

                            <Sidebar />

                            <div className="main-layout">

                                <Navbar />

                                <Routes>

                                    <Route
                                        path="/"
                                        element={<Dashboard />}
                                    />

                                    <Route
                                        path="/agents"
                                        element={<Agents />}
                                    />

                                    <Route
                                        path="/runs"
                                        element={<Runs />}
                                    />

                                    <Route
                                        path="/analytics"
                                        element={<Analytics />}
                                    />

                                    <Route
                                        path="/monitoring"
                                        element={<Monitoring />}
                                    />

                                    <Route
                                        path="/history"
                                        element={<History />}
                                    />
                           <Route
    path="/execute"
    element={<AIExecute />}
/>

            <Route path="/playground" element={<Playground />} />
                                </Routes>

                            </div>

                        </div>

                    </ProtectedRoute>

                }
            />

        </Routes>

    );

}

export default App;