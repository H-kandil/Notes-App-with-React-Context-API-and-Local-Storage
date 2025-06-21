import { createContext, useEffect, useState } from "react";

export const NotesContext = createContext();<div className=""></div>

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem("notes");
        return storedNotes ? JSON.parse(storedNotes) : [];
    });

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
            {children}
        </NotesContext.Provider>
    );
};
