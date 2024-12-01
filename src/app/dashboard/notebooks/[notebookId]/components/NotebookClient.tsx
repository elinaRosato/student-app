'use client';

import { useState } from 'react';
import CreateNoteModal from './CreateNoteModal';
import NoteList from './NoteList';
import { Notebook, Note } from '@/types/custom';

export default function NotebookClient ({ notebook, notes }: { notebook: Notebook; notes: Note[] }) {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  const openAddNoteModal = () => setShowAddNoteModal(true);
  const closeAddNoteModal = () => setShowAddNoteModal(false);

  return (
    <div className="text-gray-700">
        <div className='flex justify-between'>
        <h1 className="text-3xl font-bold">{notebook.notebook_name}</h1>
        <button onClick={openAddNoteModal} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add note
        </button>
        </div>
      {showAddNoteModal && (
        <div className="modal">
          <CreateNoteModal onClose={closeAddNoteModal} notebookId={notebook.notebook_id} />
        </div>
      )}
      <hr className="my-4" />
      <NoteList notes={notes} />
    </div>
  );
};