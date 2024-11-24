'use client';

import { useState } from 'react';
import CreateNotebookModal from './CreateNotebookModal';
import NotebookList from './NotebookList';
import { Course, MinimalCourse, Notebook } from '@/types/custom';

export default function NotebooksClient ({ notebooks, courses }: { notebooks: Notebook[]; courses: MinimalCourse[] }) {
  const [showAddNotebookModal, setShowAddNotebookModal] = useState(false);

  const openAddNotebookModal = () => setShowAddNotebookModal(true);
  const closeAddNotebookModal = () => setShowAddNotebookModal(false);

  return (
    <div className="text-gray-700">
        <div className='flex justify-between'>
        <h1 className="text-3xl font-bold">Notebooks</h1>
        <button onClick={openAddNotebookModal} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add notebook
        </button>
        </div>
      {showAddNotebookModal && (
        <div className="modal">
          <CreateNotebookModal onClose={closeAddNotebookModal} courses={courses} />
        </div>
      )}
      <hr className="my-4" />
      <NotebookList notebooks={notebooks} courses={courses} />
    </div>
  );
};