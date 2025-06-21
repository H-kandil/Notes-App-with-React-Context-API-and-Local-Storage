import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<NewNote />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
