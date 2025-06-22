// Import required hooks from React
// استيراد الأدوات المهمة من React: إنشاء سياق، استخدام سياق، استخدام effect، واستخدام reducer
import { createContext, useContext, useEffect, useReducer } from "react";

// Create a context for notes
// إنشاء سياق جديد لتخزين النوتات ومشاركتها بين الصفحات
export const NotesContext = createContext();

// Define reducer function to handle state updates based on action type
// دالة الـ reducer مسؤولة عن تغيير الحالة بناءً على نوع الحدث (add, delete, update)
const notesReducer = (state, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return [...state, action.payload]; // إضافة نوتة جديدة للمصفوفة

        case "DELETE_NOTE":
            return state.filter((note) => note.id !== action.payload); // حذف نوتة باستخدام ID

        case "UPDATE_NOTE":
            return state.map((note) =>
                note.id === action.payload.id ? action.payload : note
            ); // تحديث نوتة معينة بنفس الـ ID

        default:
            return state; // الحالة الافتراضية إذا لم تتطابق الأنواع
    }
};

// Define the provider component that will wrap around the app
// إنشاء كومبوننت يحتوي التطبيق ويوفر له البيانات والدوال الخاصة بالنوتات
export const NotesProvider = ({ children }) => {
    // Initialize state with reducer and load from localStorage if available
    // تهيئة الحالة باستخدام useReducer، وتحميل البيانات من localStorage عند أول تحميل
    const [notes, dispatch] = useReducer(notesReducer, [], () => {
        const localData = localStorage.getItem("notes");
        return localData ? JSON.parse(localData) : []; // إذا وُجدت بيانات محفوظة يتم استخدامها
    });

    // Save notes to localStorage whenever notes state changes
    // حفظ أي تغييرات في النوتات داخل localStorage تلقائيًا
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    // Function to add a new note
    // دالة لإضافة نوتة جديدة
    const addNote = (note) => {
        dispatch({ type: "ADD_NOTE", payload: note });
    };

    // Function to update an existing note
    // دالة لتحديث نوتة موجودة
    const updateNote = (updatedNote) => {
        dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
    };

    // Function to delete a note
    // دالة لحذف نوتة باستخدام ID
    const deleteNote = (id) => {
        dispatch({ type: "DELETE_NOTE", payload: id });
    };

    // Provide state and functions to all components within the app
    // مشاركة البيانات والدوال مع كل الصفحات اللي داخل هذا السياق
    return (
        <NotesContext.Provider
            value={{ notes, addNote, deleteNote, updateNote }}
        >
            {children}
        </NotesContext.Provider>
    );
};

// Custom hook to use notes context in other components
// هوك مخصص لتسهيل الوصول لبيانات السياق من أي مكون بسهولة
export const useNotes = () => useContext(NotesContext);
