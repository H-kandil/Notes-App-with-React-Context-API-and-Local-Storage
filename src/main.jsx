import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesProvider } from "./context/NotesContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <NotesProvider>
            <App />
        </NotesProvider>
    </BrowserRouter>
);
