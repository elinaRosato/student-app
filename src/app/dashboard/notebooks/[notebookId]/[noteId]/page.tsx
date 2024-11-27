import { createClient } from '@/utils/supabase/server';
import { ArrowLeft02Icon } from 'hugeicons-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const supabase = await createClient();

  // Fetch all course IDs from the database
  const { data: notes, error } = await supabase.from('notes').select('note_id');

  if (error || !notes) {
    console.error('Error fetching notes:', error?.message);
    return [];
  }

  // Map notes to params objects
  return notes.map((note) => ({
    noteId: note.note_id.toString(),
  }));
}

export default async function NotePage({ params }: { params: { noteId: string } }) {
  const supabase = await createClient();

  const { noteId } = await params

  // Fetch data for a single note based on noteId
  const { data: note, error: noteError } = await supabase
    .from('notes')
    .select('*')
    .eq('note_id', noteId)
    .single();

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

  const { data: notebook, error: notebookError } = await supabase
      .from('notebooks')
      .select('notebook_name')
      .eq('notebook_id', note.notebook_id)
      .single();

  return (
    <div className="p-6">
      <Link className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-slate-200 rounded-lg" href={`/dashboard/notebooks/${note.notebook_id}`} >
          <ArrowLeft02Icon/>
          Back to {notebook?.notebook_name}
      </Link>
      <h1 className="text-3xl font-bold">{note.note_title}</h1>
      <textarea name="note_content" id="">

      </textarea>
    </div>
  );
}