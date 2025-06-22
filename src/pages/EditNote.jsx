// Import necessary React functions and context
// استيراد الأدوات المطلوبة من React والمكتبات الأخرى
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNotes } from "../context/NotesContext";

function EditNote() {
    // Get note ID from the URL parameters
    // جلب معرف النوتة من عنوان الرابط (URL)
    const { id } = useParams();

    // Hook for navigation
    // هوك التنقل بين الصفحات
    const navigate = useNavigate();

    // Access notes and updateNote function from context
    // الوصول إلى الملاحظات ودالة التحديث من السياق
    const { notes, updateNote } = useNotes();

    // Find the note to edit based on ID
    // البحث عن النوتة المراد تعديلها باستخدام الـ ID
    const noteToEdit = notes.find((note) => note.id === Number(id));

    // Local state for form inputs
    // إنشاء حالات محلية لحفظ البيانات المعدلة
    const [title, setTitle] = useState(""); // عنوان النوتة
    const [content, setContent] = useState(""); // محتوى النوتة
    const [category, setCategory] = useState(""); // تصنيف النوتة

    // Set the current values in form fields when component mounts
    // تعبئة النموذج بقيم النوتة الحالية عند تحميل الصفحة
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setCategory(noteToEdit.category);
        }
    }, [noteToEdit]);

    // Handle form submission
    // دالة تنفيذ عند الضغط على زر "تحديث النوتة"
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        // منع تحديث الصفحة

        // Validate fields
        // التحقق من تعبئة كل الحقول
        if (!title || !content || !category) {
            alert("Please fill all fields"); // Show alert if any field is empty
            return;
        }

        // Create updated note object
        // إنشاء كائن جديد يمثل النوتة المعدلة
        const updatedNote = {
            ...noteToEdit, // الاحتفاظ بباقي القيم كما هي (مثل id)
            title, // العنوان الجديد
            content, // المحتوى الجديد
            category, // التصنيف الجديد
            date: new Date().toLocaleString(), // تحديث تاريخ التعديل
        };

        updateNote(updatedNote); // Update note in context
        // تحديث النوتة في السياق العام

        navigate("/"); // Redirect to homepage
        // الرجوع للصفحة الرئيسية
    };

    // If note not found, show error message
    // في حال لم يتم العثور على النوتة
    if (!noteToEdit) {
        return <p className="text-center mt-10 text-white">Note not found</p>;
    }

    return (
        // Background with gradient (same as homepage)
        // خلفية ملونة بتدرج مثل الصفحة الرئيسية
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
            {/* Note container */}
            {/* حاوية المحتوى البيضاء */}
            <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg w-full max-w-xl">
                {/* Page title */}
                {/* عنوان الصفحة */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Edit Note
                    {/* تعديل نوتة */}
                </h2>

                {/* Form for editing the note */}
                {/* نموذج تعديل النوتة */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title input */}
                    {/* حقل تعديل العنوان */}
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Content textarea */}
                    {/* تعديل محتوى النوتة */}
                    <textarea
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* Category select */}
                    {/* تعديل التصنيف */}
                    <select
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Study">Study</option>
                    </select>

                    {/* Update button */}
                    {/* زر تحديث النوتة */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
                    >
                        Update Note
                        {/* تحديث النوتة */}
                    </button>
                </form>
            </div>
        </div>
    );
}

// Export the component
// تصدير الكومبوننت لاستخدامه في التطبيق
export default EditNote;
