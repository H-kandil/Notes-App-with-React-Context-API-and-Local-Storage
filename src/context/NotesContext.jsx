import { createContext, useContext, useEffect, useReducer } from "react";

const NotesContext = createContext();

const notesReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTES":
            return action.payload;
        case "ADD_NOTE":
            return [...state, action.payload];
        case "DELETE_NOTE":
            return state.filter((note) => note.id !== action.payload);
        case "UPDATE_NOTE":
            return state.map((note) =>
                note.id === action.payload.id ? action.payload : note
            );
        default:
            return state;
    }
};

export const NotesProvider = ({ children }) => {
    const [notes, dispatch] = useReducer(notesReducer, [], () => {
        const localData = localStorage.getItem("notes");
        return localData ? JSON.parse(localData) : [];
    });

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = (note) => {
        const newNote = {
            ...note,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
        };
        dispatch({ type: "ADD_NOTE", payload: newNote });
    };

    const updateNote = (updatedNote) => {
        dispatch({
            type: "UPDATE_NOTE",
            payload: {
                ...updatedNote,
                date:
                    notes.find((note) => note.id === updatedNote.id)?.date ||
                    new Date().toLocaleDateString(),
            },
        });
    };

    const deleteNote = (id) => {
        dispatch({ type: "DELETE_NOTE", payload: id });
    };

    return (
        <NotesContext.Provider
            value={{ notes, addNote, deleteNote, updateNote }}
        >
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);
