import { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

function NewNote() {
    // 🧠 حالة محلية لكل حقل في النموذج
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const { addNote } = useNotes(); // ✅ جلبنا دالة إضافة نوتة من الـ Context
    const navigate = useNavigate(); // ✅ لاستخدامها في إعادة التوجيه

    // ✅ الدالة التي يتم استدعاؤها عند إرسال النموذج
    const handleSubmit = (e) => {
        e.preventDefault(); // ❌ يمنع تحديث الصفحة

        if (!title || !content || !category) {
            alert("Please fill in all fields"); // ❗تحقق بسيط
            return;
        }

        const newNote = {
            id: Date.now(), // 🆔 نستخدم التوقيت كمعرف فريد
            title,
            content,
            category,
            date: new Date().toLocaleString(), // 📅 نضيف التاريخ تلقائيًا
        };

        addNote(newNote); // ✅ نرسل النوتة إلى الـ Context
        navigate("/"); // ⬅️ نرجع المستخدم للصفحة الرئيسية
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add a New Note</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* عنوان النوتة */}
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* محتوى النوتة */}
                <textarea
                    placeholder="Content"
                    className="w-full border p-2 rounded"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                {/* اختيار الفئة (Category) */}
                <select
                    className="w-full border p-2 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                </select>

                {/* زر الحفظ */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Note
                </button>
            </form>
        </div>
    );
}
export default NewNote;
