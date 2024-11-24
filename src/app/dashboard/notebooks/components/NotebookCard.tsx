'use client';

import { MinimalCourse, Notebook } from '@/types/custom';
import { Delete01Icon, Edit01Icon } from "hugeicons-react";
import { deleteNotebook, updateNotebook } from '../actions';
import { useState } from 'react';

export default function NotebookCard( { notebook }: { notebook: Notebook } ) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (notebookId: number) => {
    try {
      await deleteNotebook(notebookId);
    } catch (error: any) {
      console.error('Error deleting notebook:', error.message);
    }
  };

  const handleUpdate = async (notebook: Notebook) => {
    try { 
      await updateNotebook(notebook);
    } catch (error: any) {
      console.log('Error updating notebook:', error.message);
    }
  };

  const openModal = (notebook: Notebook) => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
        <div className="flex justify-between p-4 bg-slate-50 rounded-md">
          <div>
            <div className='flex gap-2'>
              <span className="text-xl">{'📓'}</span>
              <h3 className="text-xl font-medium text-slate-600">{notebook.notebook_name}</h3>
            </div>
            <div className='flex flex-wrap gap-2 wrap mt-2'>
              {notebook.notebook_courses.map((course) => (
                <p key={course.course_id} className='bg-blue-200 px-2 rounded-lg text-sm text-slate-500 font-light' >{course.courses?.course_name || ''}</p>
              ))}
            </div>
          </div>
          <div className='flex gap-4 align-start'>
            <button onClick={() => openModal(notebook)}>
              <Edit01Icon size={24} color='var(--secondary)' />
            </button>
            <button onClick={() => handleDelete(notebook.notebook_id) }>
              <Delete01Icon size={24} />
            </button>
          </div>
          
        </div>
  );
};