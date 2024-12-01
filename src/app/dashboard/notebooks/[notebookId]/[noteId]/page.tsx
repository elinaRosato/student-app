import { createClient } from '@/utils/supabase/server';
import { ArrowLeft02Icon } from 'hugeicons-react';
import Link from 'next/link';
import NoteClient from './components/NoteClient';
import { getBlocks, getNote, getNoteIds, getNotebookName } from './actions';

export async function generateStaticParams() {
  const notes = await getNoteIds();
  return notes.map((note) => ({
    noteId: note.note_id.toString(),
  }));
}

export default async function NotePage({ params }: { params: { noteId: string } }) {
  const { noteId } = await params

  const { data: note, error: noteError } = await getNote(parseInt(noteId))

  if (noteError || !note) {
    return (
      <div className="p-6">
        <Link className="flex gap-2 p-4 bg-slate-50 rounded-md" href={`/dashboard/notebooks/`} >
            <ArrowLeft02Icon/>
            Back to notebooks
        </Link>
        <h1 className="text-xl font-bold text-red-500">Note not found</h1>
      </div>
    );
  }

  const notebookName = await getNotebookName(note.notebook_id)

  const { blocks, error: blockError} = await getBlocks(note.note_id);

  if (blockError || !blocks) {
    return (
      <div className="p-6">
        <Link className="flex gap-2 p-4 bg-slate-50 rounded-md" href={`/dashboard/notebooks/`} >
            <ArrowLeft02Icon/>
            Back to notebooks
        </Link>
        <h1 className="text-xl font-bold text-red-500">Note not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-slate-200 rounded-lg" href={`/dashboard/notebooks/${note.notebook_id}`} >
          <ArrowLeft02Icon/>
          Back to {notebookName? notebookName : "Notebook"}
      </Link>
      <NoteClient note={note} initialBlocks={blocks}/>
    </div>
  );
}