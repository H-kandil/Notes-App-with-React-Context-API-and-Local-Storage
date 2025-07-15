import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }
        try {
            const res = await fetch(
                "https://note-app-backend-4.onrender.com/api/users/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                })
            );
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="bg-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Create Account ✍️
                </h2>
                {error && (
                    <p className="text-red-400 mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7632e7]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7632e7]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7632e7]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#7632e7] hover:bg-[#5c23c2] text-white py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#7632e7] font-semibold hover:underline"
                    >
                        Sign in
                    </Link>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">OR</div>

                <div className="mt-4 space-y-3">
                    <button className="flex items-center justify-center w-full border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium gap-2">
                        <FaApple className="text-white text-sm" />
                        <span>Continue with Apple</span>
                    </button>
                    <button className="flex items-center justify-center w-full border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium gap-2">
                        <FaGoogle className="text-white text-sm" />
                        <span>Continue with Google</span>
                    </button>
                    <button className="flex items-center justify-center w-full border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium gap-2">
                        <FaFacebookF className="text-white text-sm" />
                        <span>Continue with Facebook</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
