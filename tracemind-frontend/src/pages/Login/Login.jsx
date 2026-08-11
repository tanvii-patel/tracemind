import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login, getCurrentUser } from "../../services/authService";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",
        password: ""

    });

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await login(form);

            localStorage.setItem("token", response.data);

const userResponse = await getCurrentUser();

localStorage.setItem(
    "user",
    JSON.stringify(userResponse.data)
);

navigate("/");
        }

        catch (err) {

            alert("Invalid Email or Password");

            console.log(err);

        }

    }

    return (

        <div className="auth-page">

            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >

                <h1>TraceMind</h1>

                <p>AI Workflow Platform</p>

                <input

                    type="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={(e)=>

                        setForm({

                            ...form,

                            email:e.target.value

                        })

                    }

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={form.password}

                    onChange={(e)=>

                        setForm({

                            ...form,

                            password:e.target.value

                        })

                    }

                />

                <button>

                    Login

                </button>

                <span>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </span>

            </form>

        </div>

    );

}

export default Login;