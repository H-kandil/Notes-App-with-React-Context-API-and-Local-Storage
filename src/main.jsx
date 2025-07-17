// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesProvider } from "./context/NotesContext";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // use environment variable

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <NotesProvider>
                    <App />
                </NotesProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
