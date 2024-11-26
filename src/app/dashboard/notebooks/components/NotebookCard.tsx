'use client';

import { Notebook } from '@/types/custom';
import { Delete01Icon, Edit01Icon } from "hugeicons-react";
import { deleteNotebook, updateNotebook } from '../actions';
import { useState } from 'react';
import Link from 'next/link';

export default function NotebookCard( { notebook }: { notebook: Notebook } ) {

  const handleDelete = async (e: React.MouseEvent, notebookId: number) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteNotebook(notebookId);
    } catch (error: any) {
      console.error('Error deleting notebook:', error.message);
    }
  };


  return (
    <Link className="flex justify-between p-4 bg-slate-50 rounded-md" href={`/dashboard/notebooks/${notebook.notebook_id}`}>          
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
        <button onClick={(e) => handleDelete(e, notebook.notebook_id) }>
          <Delete01Icon size={24} />
        </button>
      </div>
    </Link>
  );
};