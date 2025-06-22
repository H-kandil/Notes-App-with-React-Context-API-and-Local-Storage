import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
    );
}

export default App;
