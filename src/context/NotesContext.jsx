import { createContext, useContext, useEffect, useReducer } from "react";

// Define reducer function to handle state updates based on action type
const notesReducer = (state, action) => {
    switch (action.type) {
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
// Define the provider component that will wrap around the app
 export const NotesProvider = ({ children }) => {
    // Initialize state with reducer and load from localStorage if available
    const [notes, dispatch] = useReducer(notesReducer, [], () => {
        const localData = localStorage.getItem("notes");
        return localData ? JSON.parse(localData) : []; 
    });

    // Save notes to localStorage whenever notes state changes
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    // Function to add a new note
    const addNote = (note) => {
        dispatch({ type: "ADD_NOTE", payload: note });
    };

    // Function to update an existing note
    const updateNote = (updatedNote) => {
        dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
    };

    // Function to delete a note
    const deleteNote = (id) => {
        dispatch({ type: "DELETE_NOTE", payload: id });
    };

    // Provide state and functions to all components within the app
    return (
        <NotesContext.Provider
            value={{ notes, addNote, deleteNote, updateNote }}
        >
            {children}
        </NotesContext.Provider>
    );
};

// Custom hook to use notes context in other components
export const useNotes = () => useContext(NotesContext);
export const NotesContext = createContext();
 
