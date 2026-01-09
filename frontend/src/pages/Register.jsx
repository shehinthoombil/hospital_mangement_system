import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
    });

    const navigate = useNavigate();

    const submit = async () => {
        try {
            await api.post("/auth/register", form);
            alert("Registration successful");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-96 border p-6 rounded">
                <h2 className="text-xl font-bold mb-4">Register</h2>

                <input
                    placeholder="Name"
                    className="input"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Email"
                    className="input mt-2"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input mt-2"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <select
                    className="input mt-2"
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option value="USER">User</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button className="btn mt-4 w-full" onClick={submit}>
                    Register
                </button>
            </div>
        </div>
    );
}
