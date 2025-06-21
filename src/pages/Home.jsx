// src/pages/Home.jsx

import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { Link } from "react-router-dom";

function Home() {
    const { notes } = useContext(NotesContext);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">My Notes</h1>
                <Link
                    to="/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Add Note
                </Link>
            </div>

            {notes.length === 0 ? (
                <p className="text-gray-500">No notes yet.</p>
            ) : (
                <ul className="space-y-4">
                    {notes.map((note) => (
                        <li
                            key={note.id}
                            className="border p-3 rounded bg-white shadow"
                        >
                            <h2 className="font-semibold text-lg">
                                {note.title}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {note.category}
                            </p>
                            <p>{note.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;
