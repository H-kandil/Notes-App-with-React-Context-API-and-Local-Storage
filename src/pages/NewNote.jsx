// Import necessary React hooks and functions
// استيراد الأدوات المطلوبة من React والمكتبات الأخرى
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

function NewNote() {
    // Local state for form inputs: title, content, and category
    // إنشاء حالات (states) محلية لحفظ قيم المدخلات
    const [title, setTitle] = useState(""); // عنوان النوتة
    const [content, setContent] = useState(""); // محتوى النوتة
    const [category, setCategory] = useState(""); // تصنيف النوتة

    // Access addNote function from global context
    // استدعاء دالة إضافة النوتة من السياق العام (context)
    const { addNote } = useNotes();

    // Hook for navigating between routes
    // استخدام useNavigate للتنقل بين الصفحات
    const navigate = useNavigate();

    // Function triggered when form is submitted
    // دالة تُنفذ عند إرسال الفورم (الضغط على زر الحفظ)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        // منع تحديث الصفحة بشكل افتراضي

        // Check if any field is empty
        // التحقق من أن جميع الحقول مملوءة
        if (!title || !content || !category) {
            alert("Please fill in all fields"); // Show alert if any field is empty
            // عرض تنبيه للمستخدم إذا كان هناك حقل فارغ
            return;
        }

        // Create new note object with user input
        // إنشاء كائن يمثل النوتة الجديدة بالقيم المدخلة
        const newNote = {
            id: Date.now(), // Unique ID using timestamp
            title, // العنوان
            content, // المحتوى
            category, // التصنيف
            date: new Date().toLocaleString(), // تاريخ الإنشاء بشكل مقروء
        };

        addNote(newNote); // Add the new note to the context
        // إضافة النوتة الجديدة للسياق (global state)

        navigate("/"); // Navigate back to the home page
        // العودة إلى الصفحة الرئيسية بعد الحفظ
    };

    return (
        // Background with gradient (same as homepage)
        // خلفية ملونة بتدرج مشابه للصفحة الرئيسية
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
            {/* Note container */}
            {/* حاوية النوتة (كارت أبيض وسط الصفحة) */}
            <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg w-full max-w-xl">
                {/* Page heading */}
                {/* عنوان الصفحة */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add a New Note
                    {/* إضافة نوتة جديدة */}
                </h2>

                {/* Form for adding a new note */}
                {/* نموذج الإدخال لإضافة نوتة جديدة */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input field for note title */}
                    {/* حقل إدخال عنوان النوتة */}
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Update title state
                        // تحديث قيمة العنوان عند الكتابة
                    />

                    {/* Textarea for note content */}
                    {/* مربع نص لإدخال محتوى النوتة */}
                    <textarea
                        placeholder="Content"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)} // Update content state
                        // تحديث قيمة المحتوى
                    ></textarea>

                    {/* Dropdown for selecting note category */}
                    {/* قائمة منسدلة لاختيار التصنيف */}
                    <select
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} // Update category state
                        // تحديث التصنيف
                    >
                        <option value="">Select a category</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Study">Study</option>
                    </select>

                    {/* Submit button */}
                    {/* زر إرسال النموذج لحفظ النوتة */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
                    >
                        Save Note
                        {/* حفظ النوتة */}
                    </button>
                </form>
            </div>
        </div>
    );
}

// Export component to be used in routes
// تصدير الكومبوننت لاستخدامه في التطبيق
export default NewNote;
