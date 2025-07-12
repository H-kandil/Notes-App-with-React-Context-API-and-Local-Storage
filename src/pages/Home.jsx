import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
    const { notes, deleteNote } = useNotes();

    const [todoLists, setTodoLists] = useState([
        { id: 1, tasks: [], input: "" },
        { id: 2, tasks: [], input: "" },
        { id: 3, tasks: [], input: "" },
        { id: 4, tasks: [], input: "" },
        { id: 5, tasks: [], input: "" },
    ]);

    const handleTaskChange = (listId, value) => {
        setTodoLists((prev) =>
            prev.map((list) =>
                list.id === listId ? { ...list, input: value } : list
            )
        );
    };

    const handleTaskAdd = (listId) => {
        setTodoLists((prev) =>
            prev.map((list) => {
                if (list.id === listId && list.input.trim()) {
                    return {
                        ...list,
                        tasks: [
                            ...list.tasks,
                            { text: list.input, editing: false, done: false },
                        ],
                        input: "",
                    };
                }
                return list;
            })
        );
    };

    const handleTaskEdit = (listId, taskIndex, value) => {
        setTodoLists((prev) =>
            prev.map((list) => {
                if (list.id === listId) {
                    const updatedTasks = [...list.tasks];
                    updatedTasks[taskIndex].text = value;
                    return { ...list, tasks: updatedTasks };
                }
                return list;
            })
        );
    };

    const toggleEditing = (listId, taskIndex, editing) => {
        setTodoLists((prev) =>
            prev.map((list) => {
                if (list.id === listId) {
                    const updatedTasks = [...list.tasks];
                    updatedTasks[taskIndex].editing = editing;
                    return { ...list, tasks: updatedTasks };
                }
                return list;
            })
        );
    };

    const toggleDone = (listId, taskIndex) => {
        setTodoLists((prev) =>
            prev.map((list) => {
                if (list.id === listId) {
                    const updatedTasks = [...list.tasks];
                    updatedTasks[taskIndex].done =
                        !updatedTasks[taskIndex].done;
                    return { ...list, tasks: updatedTasks };
                }
                return list;
            })
        );
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this note?")) {
            deleteNote(id);
        }
    };

    return (
        <div
            className="min-h-screen p-8 flex flex-col gap-16"
            style={{
                backgroundImage:
                    "linear-gradient(135deg, rgb(255,25,77), rgb(112,42,140), rgb(255,115,38), rgb(255,204,13))",
                backgroundSize: "400% 400%",
                animation: "gradientMove 15s ease infinite",
            }}
        >
            {/* To-Do Lists Section */}
            <div className="flex flex-wrap gap-6 justify-center">
                {todoLists.map((list) => (
                    <div
                        key={list.id}
                        className="bg-white rounded-2xl shadow-lg p-4 w-72 flex flex-col"
                    >
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            To-do List {list.id}
                        </h2>
                        <div
                            className="overflow-y-auto border rounded px-2 py-2 space-y-2"
                            style={{
                                maxHeight: "280px",
                                minHeight: "280px",
                            }}
                        >
                            {list.tasks.map((task, i) => (
                                <div
                                    key={i}
                                    className="text-sm text-gray-700 border-b pb-1 flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={() => toggleDone(list.id, i)}
                                    />
                                    {task.editing ? (
                                        <input
                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                            value={task.text}
                                            onChange={(e) =>
                                                handleTaskEdit(
                                                    list.id,
                                                    i,
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    toggleEditing(
                                                        list.id,
                                                        i,
                                                        false
                                                    );
                                                }
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        <span
                                            onClick={() =>
                                                toggleEditing(list.id, i, true)
                                            }
                                            className={`cursor-pointer ${
                                                task.done
                                                    ? "line-through text-gray-400"
                                                    : ""
                                            }`}
                                        >
                                            {task.text}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={list.input}
                            onChange={(e) =>
                                handleTaskChange(list.id, e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleTaskAdd(list.id);
                            }}
                            className="mt-2 border border-gray-300 rounded px-3 py-2 text-sm w-full"
                            placeholder="Add new task"
                        />
                        <button
                            onClick={() => handleTaskAdd(list.id)}
                            className="mt-2 bg-pink-600 text-white px-3 py-2 rounded text-sm"
                        >
                            Add Task
                        </button>
                    </div>
                ))}
            </div>

            {/* Notes Section */}
            <div className="rounded-2xl shadow-2xl w-full max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">My Notes</h1>
                    <Link
                        to="/new"
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        + Add Note
                    </Link>
                </div>

                {notes.length === 0 ? (
                    <p className="text-center text-gray-100 mt-10 text-lg">
                        No notes yet 😔
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note._id || note.id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        {note.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-4">
                                        {note.content}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                                    <span className="italic">
                                        {note.category}
                                    </span>
                                    <span>{note.date}</span>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Link
                                        to={`/edit/${note._id || note.id}`}
                                        className="bg-orange-300 hover:bg-pink-700 text-white px-2 py-1 rounded-lg font-semibold shadow-md transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelete(note._id || note.id)
                                        }
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

            {/* Pomodoro Placeholder Section */}
            <div className="mt-20 text-white text-center">
                <h2 className="text-3xl font-bold mb-2">Pomodoro Timer</h2>
                <p className="text-white">Coming soon...</p>
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

export default Home;
