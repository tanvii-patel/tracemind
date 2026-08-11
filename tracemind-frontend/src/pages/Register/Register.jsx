import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [form,setForm] = useState({

        fullName:"",
        email:"",
        password:""

    });

    async function handleSubmit(e){

        e.preventDefault();

        try{

            await register(form);

            alert("Registration Successful");

            navigate("/login");

        }

        catch(err){

            console.log(err);

        }

    }

    return(

        <div className="auth-page">

            <form

                className="auth-card"

                onSubmit={handleSubmit}

            >

                <h1>Create Account</h1>

                <p>Join TraceMind</p>

                <input

                    placeholder="Full Name"

                    value={form.fullName}

                    onChange={(e)=>

                        setForm({

                            ...form,

                            fullName:e.target.value

                        })

                    }

                />

                <input

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

                    Register

                </button>

                <span>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </span>

            </form>

        </div>

    );

}

export default Register;