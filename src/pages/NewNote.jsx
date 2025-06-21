import { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

const categories = ["Work", "Personal", "Ideas"];

export default function NewNote() {
    const { addNote } = useContext(NotesContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(categories[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) return alert("Please fill in all fields");

        const newNote = {
            id: Date.now(),
            title,
            content,
            category,
            date: new Date().toLocaleDateString(),
        };

        addNote(newNote);
        navigate("/");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    className="p-2 border rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <select
                    className="p-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Note
                </button>
            </form>
        </div>
    );
}

