// Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import AppleSignin from "react-apple-signin-auth";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting registration..."); // English comment
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
            console.log("Response status:", res.status);
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
            console.error("Signup error:", err);
            setError(err.message);
        }
    }

    // Google OAuth success handler
    const handleGoogleSuccess = async (resp) => {
        console.log("Google response:", resp);
        try {
            const res = await fetch(
                "https://note-app-backend-4.onrender.com/api/auth/google",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tokenId: resp.credential }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Google login failed");
            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.sub,
                    name: data.name,
                    email: data.email,
                })
            );
            navigate("/");
        } catch (err) {
            console.error("Google signup error:", err);
            setError(err.message);
        }
    };

    const handleGoogleError = () => setError("Google login failed");

    // Apple OAuth success handler
    const handleAppleSuccess = async (resp) => {
        console.log("Apple response:", resp);
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
            navigate("/");
        } catch (err) {
            console.error("Apple signup error:", err);
            setError(err.message);
        }
    };

    const handleAppleError = () => setError("Apple login failed");

    return (
        <div className="h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="bg-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Create a New Account
                </h2>

                {error && (
                    <p className="text-red-400 mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7632e7]"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7632e7]"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7632e7]"
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
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        text="signup_with" // Sets the button label to "Sign up with Google"
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
                        buttonText="Sign up with Apple" // Update button text
                    />
                </div>
            </div>
        </div>
    );
}

export default Register;
