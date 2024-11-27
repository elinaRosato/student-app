'use client';

import { Note } from '@/types/custom';
import { Delete01Icon, Edit01Icon } from "hugeicons-react";
import { deleteNote } from './../actions';
import { useState } from 'react';
import Link from 'next/link';

export default function NoteCard( { note }: { note: Note } ) {

  const handleDelete = async (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteNote(noteId);
    } catch (error: any) {
      console.error('Error deleting note:', error.message);
    }
  };


  return (
    <Link className="flex justify-between p-4 bg-slate-50 rounded-md" href={`/dashboard/notes/${note.note_id}`}>          
      <div>
        <div className='flex gap-2'>
          <span className="text-xl">{'📝'}</span>
          <h3 className="text-xl font-medium text-slate-600">{note.note_title}</h3>
        </div>
      </div>
      <div className='flex gap-4 align-start'>
        <button onClick={(e) => handleDelete(e, note.note_id) }>
          <Delete01Icon size={24} />
        </button>
      </div>
    </Link>
  );
};