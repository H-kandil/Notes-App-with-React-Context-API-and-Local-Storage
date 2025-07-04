// Import necessary React functions and context
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNotes } from "../context/NotesContext";

function EditNote() {
    // Get note ID from the URL parameters
    const { id } = useParams();

    // Hook for navigation
    const navigate = useNavigate();

    // Access notes and updateNote function from context
    const { notes, updateNote } = useNotes();

    // Find the note to edit based on ID
    const noteToEdit = notes.find((note) => note.id === Number(id));

    // Local state for form inputs
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    // Set the current values in form fields when component mounts
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setCategory(noteToEdit.category);
        }
    }, [noteToEdit]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate fields
        if (!title || !content || !category) {
            alert("Please fill all fields");
            return;
        }

        // Create updated note object
        const updatedNote = {
            ...noteToEdit,
            title,
            content,
            category,
            date: new Date().toLocaleString(),
        };

        updateNote(updatedNote);
        navigate("/");
    };

    // If note not found, show error message
    if (!noteToEdit) {
        return <p className="text-center mt-10 text-white">Note not found</p>;
    }

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
            {/* Note edit form container */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Edit Note
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title input */}
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Content textarea */}
                    <textarea
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* Category select */}
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

                    {/* Update button */}
                    <button
                        type="submit"
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        Update Note
                    </button>
                </form>
            </div>

            {/* Animated gradient background CSS */}
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

export default EditNote;
