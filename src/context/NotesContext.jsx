import { createContext, useContext, useEffect, useReducer } from "react";

export const NotesContext = createContext();

const notesReducer = (state, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return [...state, action.payload];
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

    return (
        <NotesContext.Provider value={{ notes, addNote, dispatch }}>
            {children}
        </NotesContext.Provider>
    );
};

// ✅ أضف هذا السطر لكي يعمل useNotes:
export const useNotes = () => useContext(NotesContext);
