import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
    const { notes, deleteNote } = useNotes();

    const [todoLists, setTodoLists] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("todoLists"));
            return Array.isArray(saved)
                ? saved
                : Array.from({ length: 5 }, (_, i) => ({
                      id: i + 1,
                      title: `To-do List ${i + 1}`,
                      tasks: [],
                      input: "",
                      editingTitle: false,
                  }));
        } catch (error) {
            return [];
        }
    });

    const [timer, setTimer] = useState(1500); // 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [workDuration, setWorkDuration] = useState(1500);
    const [breakDuration, setBreakDuration] = useState(300);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        const savedLists = JSON.stringify(todoLists);
        localStorage.setItem("todoLists", savedLists);
    }, [todoLists]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        new Audio(
                            "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
                        ).play();
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTimer(isBreak ? breakDuration : workDuration);
    };
    const toggleMode = () => {
        setIsBreak((prev) => !prev);
        setTimer(!isBreak ? breakDuration : workDuration);
    };

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
            <div className="flex flex-wrap gap-6 justify-center">
                {todoLists.map((list) => (
                    <div
                        key={list.id}
                        className="bg-white rounded-2xl shadow-lg p-4 w-72 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-2">
                            {list.editingTitle ? (
                                <input
                                    type="text"
                                    value={list.title}
                                    onChange={(e) =>
                                        handleTitleEdit(list.id, e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        toggleTitleEditing(list.id, false)
                                    }
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
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                toggleEditing(list.id, i, false)
                                            }
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
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleTaskAdd(list.id)
                            }
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
                                key={note.id}
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
                                        to={`/edit/${note.id}`}
                                        className="bg-orange-300 hover:bg-pink-700 text-white px-2 py-1 rounded-lg font-semibold shadow-md transition"
                                    >
                                        Edit
                                    </Link>
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

            <div
                className="mt-10 text-black text-center bg-white bg-opacity-40 py-5 rounded-2xl w-100"
                flex
                justify-center
                items-center
                min-h-screen
            >
                <h2 className="text-3xl font-bold mb-4">Pomodoro Timer</h2>
                <div className="text-6xl font-mono mb-4">
                    {Math.floor(timer / 60)
                        .toString()
                        .padStart(2, "0")}
                    :{(timer % 60).toString().padStart(2, "0")}
                </div>
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        onClick={handleStart}
                        className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded"
                    >
                        Start
                    </button>
                    <button
                        onClick={handlePause}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
                    >
                        Pause
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-red-600 hover:bg-red-700 text-black px-4 py-2 rounded"
                    >
                        Reset
                    </button>
                    <button
                        onClick={toggleMode}
                        className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded"
                    >
                        {isBreak ? "Back to Work" : "Take Break"}
                    </button>
                </div>
                <div className="flex justify-center gap-1">
                    <div>
                        <label className="block text-black text-sm">
                            Work (minutes)
                        </label>
                        <input
                            type="number"
                            value={workDuration / 60}
                            onChange={(e) =>
                                setWorkDuration(+e.target.value * 60)
                            }
                            className="rounded text-black px-2 py-1"
                            min={1}
                        />
                    </div>
                    <div>
                        <label className="block text-black text-sm">
                            Break (minutes)
                        </label>
                        <input
                            type="number"
                            value={breakDuration / 60}
                            onChange={(e) =>
                                setBreakDuration(+e.target.value * 60)
                            }
                            className="rounded text-black px-2 py-1"
                            min={1}
                        />
                    </div>
                    <div>
                        <label className="block text-black text-sm">
                            Volume
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(+e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}

export default Home;
