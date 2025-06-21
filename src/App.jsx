import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewNote />} />
        </Routes>
    );
}

export default App;
