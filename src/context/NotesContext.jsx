import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";

const NotesContext = createContext();

const notesReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTES":
            return action.payload;
        case "ADD_NOTE":
            return [...state, action.payload];
        case "DELETE_NOTE":
            return state.filter((note) => note._id !== action.payload);
        case "UPDATE_NOTE":
            return state.map((note) =>
                note._id === action.payload._id ? action.payload : note
            );
        default:
            return state;
    }
};

export const NotesProvider = ({ children }) => {
    const [notes, dispatch] = useReducer(notesReducer, []);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Fetch notes if token exists
    useEffect(() => {
        const fetchNotes = async () => {
            if (!token) return;

            try {
                const res = await fetch(
                    "https://note-app-backend-4.onrender.com/api/notes",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    console.error("Failed to fetch notes:", res.status);
                    return;
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    dispatch({ type: "SET_NOTES", payload: data });
                } else {
                    console.error("Invalid notes format received");
                }
            } catch (err) {
                console.error("Error fetching notes:", err.message);
            }
        };

        fetchNotes();
    }, [token]);

    const addNote = async (note) => {
        if (!token) return;

        try {
            const res = await fetch(
                "https://note-app-backend-4.onrender.com/api/notes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(note),
                }
            );

            const data = await res.json();
            if (res.ok) {
                dispatch({ type: "ADD_NOTE", payload: data });
            } else {
                console.error("Error adding note:", data.message);
            }
        } catch (err) {
            console.error("Error adding note:", err.message);
        }
    };

    const updateNote = async (updatedNote) => {
        if (!token) return;

        try {
            const res = await fetch(
                `https://note-app-backend-4.onrender.com/api/notes/${updatedNote._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedNote),
                }
            );

            const data = await res.json();
            if (res.ok) {
                dispatch({ type: "UPDATE_NOTE", payload: data });
            } else {
                console.error("Error updating note:", data.message);
            }
        } catch (err) {
            console.error("Error updating note:", err.message);
        }
    };

    const deleteNote = async (id) => {
        if (!token) return;

        try {
            const res = await fetch(
                `https://note-app-backend-4.onrender.com/api/notes/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.ok) {
                dispatch({ type: "DELETE_NOTE", payload: id });
            } else {
                console.error("Error deleting note:", res.statusText);
            }
        } catch (err) {
            console.error("Error deleting note:", err.message);
        }
    };

    return (
        <NotesContext.Provider
            value={{ notes, addNote, deleteNote, updateNote, token }}
        >
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);
