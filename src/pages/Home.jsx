import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";

function Home() {
    const { notes, deleteNote } = useNotes();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this note?")) {
            deleteNote(id);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-7xl font-bold text-gray-800">
                        📝 My Notes
                    </h1>
                    <Link
                        to="/new"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        + Add Note
                    </Link>
                </div>

                {notes.length === 0 ? (
                    <p className="text-gray-500 text-center">No notes yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition duration-300"
                            >
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    {note.title}
                                </h2>
                                <p className="text-gray-600 mb-3">
                                    {note.content}
                                </p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span className="font-medium">
                                        {note.category}
                                    </span>
                                    <span>{note.date}</span>
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                    {/* زر التعديل */}
                                    <Link
                                        to={`/edit/${note.id}`}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </Link>

                                    {/* زر الحذف */}
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
