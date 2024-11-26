import { createClient } from '@/utils/supabase/server';
import { ArrowLeft02Icon } from 'hugeicons-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const supabase = await createClient();

  // Fetch all notebook IDs from the database
  const { data: notebooks, error } = await supabase.from('notebooks').select('notebook_id');

  if (error || !notebooks) {
    console.error('Error fetching notebooks:', error?.message);
    return [];
  }

  // Map notebooks to params objects
  return notebooks.map((notebook) => ({
    notebookId: notebook.notebook_id.toString(),
  }));
}

export default async function NotebookPage({ params }: { params: { notebookId: string } }) {
  const supabase = await createClient();
  console.log(params.notebookId);

  // Fetch data for a single notebook based on notebookId
  const { data: notebook, error } = await supabase
    .from('notebooks')
    .select('*')
    .eq('notebook_id', params.notebookId)
    .single();

  if (error || !notebook) {
    return (
      <div className="p-6">
        <Link className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-slate-200 rounded-lg" href={`/dashboard/notebooks`} >
            <ArrowLeft02Icon/>
            Back to notebooks
        </Link>
        <h1 className="text-xl font-bold text-red-500">Notebook not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-slate-200 rounded-lg" href="/dashboard/notebooks" >
          <ArrowLeft02Icon/>
          Back to notebooks
      </Link>
      <h1 className="text-3xl font-bold">{notebook.notebook_name}</h1>
    </div>
  );
}