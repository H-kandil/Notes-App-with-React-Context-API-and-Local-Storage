import { useNotes } from "../context/NotesContext"; // Import custom hook to access notes context (state and actions)
import { Link } from "react-router-dom"; // Import Link component for client-side navigation

function Home() {
    // Destructure notes array and deleteNote function from custom context hook
    const { notes, deleteNote } = useNotes();

    // Function to handle deleting a note after user confirmation
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this note?")) {
            deleteNote(id); // Call context function to delete note by id
        }
    };

    return (
        <div
            className="min-h-screen p-8 flex flex-col items-center justify-center"
            style={{
                // Set a colorful animated gradient background using inline styles
                backgroundImage:
                    "linear-gradient(135deg, rgb(255,25,77), rgb(112,42,140), rgb(255,115,38), rgb(255,204,13))",
                backgroundSize: "400% 400%",
                animation: "gradientMove 15s ease infinite",
            }}
        >
            {/* Container for the notes app content */}
            <div className="rounded-2xl shadow-2xl w-full max-w-6xl">
                {/* Header section with title and add note button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white -800">
                        My Notes
                    </h1>
                    {/* Link to navigate to new note creation page */}
                    <Link
                        to="/new"
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        + Add Note±
                    </Link>
                </div>

                {/* Conditional rendering: show message if no notes, else display notes grid */}
                {notes.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10 text-lg">
                        No notes yet 😔
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Map through notes array to display each note card */}
                        {notes.map((note) => (
                            <div
                                key={note.id} // Unique key for each note for React reconciliation
                                className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Note title */}
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        {note.title}
                                    </h2>
                                    {/* Note content with line clamp to limit visible lines */}
                                    <p className="text-gray-600 mb-4 line-clamp-4">
                                        {note.content}
                                    </p>
                                </div>
                                {/* Note category and date shown in smaller text */}
                                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                                    <span className="italic">
                                        {note.category}
                                    </span>
                                    <span>{note.date}</span>
                                </div>
                                {/* Action buttons for editing and deleting the note */}
                                <div className="flex justify-end gap-2">
                                    {/* Link to edit page for this note */}
                                    <Link
                                        to={`/edit/${note.id}`}
                                        className="bg-orange-300 hover:bg-pink-700 text-white px-2 py-1 rounded-lg font-semibold shadow-md transition"
                                    >
                                        Edit
                                    </Link>
                                    {/* Button to delete note, triggers handleDelete */}
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="bg-pink-600 hover:bg-pink-700 text-white px-2 py-1 rounded-lg font-semibold shadow-md transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Embedded CSS keyframes for background gradient animation */}
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

export default Home; 
