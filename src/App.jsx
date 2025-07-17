import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";
import NewNote from "./pages/NewNote";
import { NotesProvider } from "./context/NotesContext";

function App() {
    return (
        <NotesProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<NewNote />} />
                <Route path="/edit/:id" element={<EditNote />} />
                {/* Fallback route */}
                <Route path="*" element={<Home />} />
            </Routes>
        </NotesProvider>
    );
}

export default App;
