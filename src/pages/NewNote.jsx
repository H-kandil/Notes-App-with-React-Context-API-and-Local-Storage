import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

function NewNote() {
    const navigate = useNavigate();
    const { addNote } = useNotes();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !category) {
            alert("Please fill all fields");
            return;
        }

        const newNote = {
            title,
            content,
            category,
        };

        await addNote(newNote);
        navigate("/");
    };

    return (
        <div
            className="min-h-screen p-8 flex items-center justify-center"
            style={{
                backgroundImage:
                    "linear-gradient(135deg, rgb(255,25,77), rgb(112,42,140), rgb(255,115,38), rgb(255,204,13))",
                backgroundSize: "400% 400%",
                animation: "gradientMove 15s ease infinite",
            }}
        >
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add New Note
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Content"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <select
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Study">Study</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        Add Note
                    </button>
                </form>
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

export default NewNote;
