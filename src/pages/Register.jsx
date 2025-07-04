import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { name, email, password } = form;

        if (!name || !email || !password) {
            setError("يرجى ملء جميع الحقول.");
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:5000/api/users/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "حدث خطأ أثناء التسجيل");
            } else {
                localStorage.setItem("token", data.token);
                navigate("/");
            }
        } catch (err) {
            setError("فشل الاتصال بالخادم");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    إنشاء حساب جديد
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="الاسم الكامل"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="كلمة المرور"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-black text-white py-3 rounded-lg font-semibold transition"
                    >
                        تسجيل
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
