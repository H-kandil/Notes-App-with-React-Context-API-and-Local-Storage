import { createContext, useContext, useEffect, useReducer } from "react";

export const NotesContext = createContext();

const notesReducer = (state, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return [...state, action.payload];
        case "DELETE_NOTE":
            return state.filter((note) => note.id !== action.payload);
        default:
            return state;
    }
};

export const NotesProvider = ({ children }) => {
    const [notes, dispatch] = useReducer(notesReducer, [], () => {
        const localData = localStorage.getItem("notes");
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = (note) => {
        dispatch({ type: "ADD_NOTE", payload: note });
    };

    const deleteNote = (id) => {
        dispatch({ type: "DELETE_NOTE", payload: id });
    };

    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);
