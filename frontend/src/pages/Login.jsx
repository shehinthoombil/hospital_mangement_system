import React from "react";
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data.token);
            
             // role based redirect
            const role = JSON.parse(atob(res.data.token.split(".")[1])).role;
            if (role === "DOCTOR") navigate("/doctor");
            else if (role === "ADMIN") navigate("/admin");
            else navigate("/user");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white w-full p-2">
                    Login
                </button>

                <p className="mt-2 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
