import { createContext, useContext, useReducer, useEffect } from 'react';

// Create a context for notes
const NotesContext = createContext();

// Action types for the reducer
const ACTIONS = {
  ADD: 'ADD_NOTE',
  DELETE: 'DELETE_NOTE',
  UPDATE: 'UPDATE_NOTE',
};

// Reducer function to manage notes state
function notesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];
    case ACTIONS.DELETE:
      return state.filter(note => note.id !== action.payload);
    case ACTIONS.UPDATE:
      return state.map(note =>
        note.id === action.payload.id ? action.payload : note
      );
    default:
      return state;
  }
}

// Function to get initial notes from localStorage
function getInitialNotes() {
  const saved = localStorage.getItem('notes');
  return saved ? JSON.parse(saved) : [];
}

// Provider component to wrap the application and provide notes state
export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, [], getInitialNotes);

  // Effect to save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
}

// Custom hook to use the NotesContext
export function useNotes() {
  return useContext(NotesContext);
}
