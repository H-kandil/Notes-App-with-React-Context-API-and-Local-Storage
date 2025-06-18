import React, { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

// Home component to display the list of notes
const Home = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-2xl shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-500">{note.category}</p>
              <p className="mt-2">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
