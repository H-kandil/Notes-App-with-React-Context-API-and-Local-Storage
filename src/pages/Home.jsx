import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const { notes, deleteNote } = useNotes();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const [todoLists, setTodoLists] = useState([
        {
            id: 1,
            title: "To-do List 1",
            tasks: [],
            input: "",
            editingTitle: false,
        },
        {
            id: 2,
            title: "To-do List 2",
            tasks: [],
            input: "",
            editingTitle: false,
        },
        {
            id: 3,
            title: "To-do List 3",
            tasks: [],
            input: "",
            editingTitle: false,
        },
        {
            id: 4,
            title: "To-do List 4",
            tasks: [],
            input: "",
            editingTitle: false,
        },
        {
            id: 5,
            title: "To-do List 5",
            tasks: [],
            input: "",
            editingTitle: false,
        },
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
            prev.map((list) =>
                list.id === listId && list.input.trim()
                    ? {
                          ...list,
                          tasks: [
                              ...list.tasks,
                              { text: list.input, editing: false, done: false },
                          ],
                          input: "",
                      }
                    : list
            )
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

    const handleTitleEdit = (listId, value) => {
        setTodoLists((prev) =>
            prev.map((list) =>
                list.id === listId ? { ...list, title: value } : list
            )
        );
    };

    const toggleTitleEditing = (listId, editing) => {
        setTodoLists((prev) =>
            prev.map((list) =>
                list.id === listId ? { ...list, editingTitle: editing } : list
            )
        );
    };

    const handleDeleteList = (listId) => {
        setTodoLists((prev) => prev.filter((list) => list.id !== listId));
    };

    const handleDuplicateList = (listId) => {
        setTodoLists((prev) => {
            const original = prev.find((list) => list.id === listId);
            if (!original) return prev;
            const newId = Math.max(...prev.map((l) => l.id)) + 1;
            const duplicate = {
                ...original,
                id: newId,
                title: original.title + " (Copy)",
                editingTitle: false,
            };
            return [...prev, duplicate];
        });
    };

    const moveList = (listId, direction) => {
        setTodoLists((prev) => {
            const index = prev.findIndex((list) => list.id === listId);
            if (index < 0) return prev;

            const newIndex = direction === "up" ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= prev.length) return prev;

            const newOrder = [...prev];
            const [moved] = newOrder.splice(index, 1);
            newOrder.splice(newIndex, 0, moved);
            return newOrder;
        });
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
                {todoLists.map((list, idx) => (
                    <div
                        key={list.id}
                        className="bg-white rounded-2xl shadow-lg p-4 w-72 flex flex-col"
                    >
                        {/* Title & Actions */}
                        <div className="flex items-center justify-between mb-2">
                            {list.editingTitle ? (
                                <input
                                    type="text"
                                    value={list.title}
                                    onChange={(e) =>
                                        handleTitleEdit(list.id, e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                            toggleTitleEditing(list.id, false);
                                    }}
                                    className="text-sm border px-2 py-1 rounded w-full"
                                    autoFocus
                                />
                            ) : (
                                <h2
                                    onClick={() =>
                                        toggleTitleEditing(list.id, true)
                                    }
                                    className="text-lg font-bold text-gray-800 cursor-pointer"
                                >
                                    {list.title}
                                </h2>
                            )}
                        </div>

                        {/* Control Buttons */}
                        <div className="flex justify-between mb-2 text-xs">
                            <button
                                onClick={() => moveList(list.id, "up")}
                                className="text-gray-500 hover:text-black"
                            >
                                ↟ Up
                            </button>
                            <button
                                onClick={() => moveList(list.id, "down")}
                                className="text-gray-500 hover:text-black"
                            >
                                ↡ Down
                            </button>
                            <button
                                onClick={() => handleDuplicateList(list.id)}
                                className="text-gray-500 hover:text-black"
                            >
                                Copy
                            </button>
                            <button
                                onClick={() => handleDeleteList(list.id)}
                                className="text-red-500 hover:text-black"
                            >
                                Delete
                            </button>
                        </div>

                        {/* Tasks */}
                        <div
                            className="overflow-y-auto border rounded px-2 py-2 space-y-2"
                            style={{ maxHeight: "280px", minHeight: "280px" }}
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
