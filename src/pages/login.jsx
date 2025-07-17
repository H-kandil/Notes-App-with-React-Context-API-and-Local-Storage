import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import AppleSignin from "react-apple-signin-auth";

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
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

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

    const handleGoogleSuccess = async (resp) => {
        try {
            const res = await fetch(
                "https://note-app-backend-4.onrender.com/api/auth/google",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken: resp.credential }), // تم التعديل هنا
                }
            );
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.sub,
                    name: data.name,
                    email: data.email,
                })
            );

            navigate("/"); // Redirect to homepage
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleError = () => setError("Google login failed");

    const handleAppleSuccess = async (resp) => {
        try {
            const idToken = resp.authorization.id_token;
            const res = await fetch(
                "https://note-app-backend-4.onrender.com/api/auth/apple",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Apple login failed");

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.sub,
                    email: data.email,
                })
            );

            navigate("/"); // Redirect
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAppleError = () => setError("Apple login failed");

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
            <div className="bg-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Welcome Back 🌸
                </h2>
                {error && (
                    <p className="text-red-400 mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-[#7632e7]"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-[#7632e7]"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#7632e7] hover:bg-[#5c23c2] text-white py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[#7632e7] font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">OR</div>

                <div className="mt-4 space-y-3">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                    />
                    <AppleSignin
                        authOptions={{
                            clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
                            scope: "email name",
                            redirectURI: window.location.origin + "/",
                            usePopup: true,
                        }}
                        onSuccess={handleAppleSuccess}
                        onError={handleAppleError}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
