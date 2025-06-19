// src/pages/Home.jsx

import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

function Home() {
    const { notes } = useContext(NotesContext);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Notes</h1>
            {notes.length === 0 ? (
                <p>No notes yet. Add your first one!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-white p-4 shadow rounded"
                        >
                            <h2 className="font-semibold text-lg">
                                {note.title}
                            </h2>
                            <p>{note.content}</p>
                            <span className="text-sm text-gray-500">
                                Category: {note.category}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
