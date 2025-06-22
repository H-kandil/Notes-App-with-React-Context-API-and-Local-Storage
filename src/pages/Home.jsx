// Importing the custom hook `useNotes` from context to access notes data and actions
// استدعاء hook مخصص من الكونتكست عشان نقدر نستخدم بيانات النوتات ونعمل عمليات عليها زي الحذف
import { useNotes } from "../context/NotesContext";

// Importing `Link` from react-router-dom to navigate between pages
// استدعاء Link من مكتبة الراوتر عشان ننتقل بين الصفحات داخل التطبيق بدون إعادة تحميل الصفحة
import { Link } from "react-router-dom";

function Home() {
    // Destructuring notes and deleteNote from the context
    // استخلاص بيانات النوتات ودالة الحذف من الكونتكست
    const { notes, deleteNote } = useNotes();

    // Function to handle deleting a note after user confirmation
    // دالة مسؤولة عن حذف النوتة بعد تأكيد المستخدم
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this note?")) {
            deleteNote(id);
        }
    };

    return (
        <div
            className="min-h-screen p-8"
            style={{
                // Applying a multi-color gradient background with animation
                // خلفية متدرجة بألوان مميزة مع حركة متدرجة تعطي جمالية للتصميم
                backgroundImage:
                    "linear-gradient(135deg, rgb(255,25,77), rgb(112,42,140), rgb(255,115,38), rgb(255,204,13))",
                backgroundSize: "400% 400%",
                animation: "gradientMove 15s ease infinite",
            }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header section: Title + Add button */}
                {/* قسم الرأس: عنوان التطبيق وزر الإضافة */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
                        My Notes
                    </h1>
                    <Link
                        to="/new"
                        className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300"
                    >
                        + Add Note
                    </Link>
                </div>

                {/*  If no notes, show message. Else, show notes list */}
                {notes.length === 0 ? (
                    <p className="text-white text-center text-xl mt-32">
                        No notes yet 😔
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Loop through each note and render it */}
                        {/* التكرار على كل نوتة وعرضها بتصميم كارت */}
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Note title */}
                                    {/* عنوان النوتة */}
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        {note.title}
                                    </h2>

                                    {/* Note content preview */}
                                    {/* جزء من محتوى النوتة */}
                                    <p className="text-gray-600 mb-4 line-clamp-4">
                                        {note.content}
                                    </p>
                                </div>

                                {/* Note category and date */}
                                {/* تصنيف النوتة وتاريخها */}
                                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                                    <span className="italic">
                                        {note.category}
                                    </span>
                                    <span>{note.date}</span>
                                </div>

                                {/* Buttons for edit and delete */}
                                {/* أزرار التعديل والحذف */}
                                <div className="flex justify-end gap-2">
                                    <Link
                                        to={`/edit/${note.id}`}
                                        className=" bg-blue-600 text-white hover:bg-blue-300 px-4 py-1 rounded-xl shadow"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className=" bg-purple-600 hover:bg-blue-600 text-white px-4 py-1 rounded-xl shadow"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CSS for animated gradient background */}
            {/* كود CSS لتعريف حركة الخلفية المتدرجة */}
            <style>
                {`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>
        </div>
    );
}

// Exporting the Home component to be used in routes
// تصدير مكون الصفحة الرئيسية لاستخدامه داخل الراوتر
export default Home;
