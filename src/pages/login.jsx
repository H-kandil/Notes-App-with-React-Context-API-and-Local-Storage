import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch(
                "https://note-app-backend-4.onrender.com/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

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
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage:
                    "linear-gradient(135deg, rgb(255,25,77), rgb(112,42,140), rgb(255,115,38), rgb(255,204,13))",
                backgroundSize: "400% 400%",
                animation: "gradientMove 15s ease infinite",
            }}
        >
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
                    Welcome Back
                </h2>
                {error && (
                    <p className="text-red-600 mb-4 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-pink-600 font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                            alt="Apple"
                            className="w-4 h-4"
                        />
                        Apple
                    </button>
                    <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google"
                            className="w-4 h-4"
                        />
                        Google
                    </button>
                    <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                            alt="Facebook"
                            className="w-4 h-4"
                        />
                        Facebook
                    </button>
                </div>
            </div>

            <style>
                {`
                    @keyframes gradientMove {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}
            </style>
        </div>
    );
}

export default Login;
