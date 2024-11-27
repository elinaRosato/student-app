import { MinimalCourse, Note, Notebook } from "@/types/custom";
import { FilterHorizontalIcon, Sorting01Icon } from "hugeicons-react";
import NoteCard from "./NoteCard";

export default function NoteList ({ notes }: { notes: Array<Note> }) {
    return (
        <div className="space-y-4 bg-slate-200 p-4 rounded-xl">
          <div className='flex justify-between'>
            <h2 className='text-xl'>My notes</h2>
            <div className='flex gap-4'>
              <button className='flex gap-1 bg-slate-100 p-2 rounded-md'>
                <Sorting01Icon size={20} />
                Sort
              </button>
              <button className='flex gap-1 bg-slate-100 p-2 rounded-md align-center justify-center'>
                <FilterHorizontalIcon size={20} />
                Filter
              </button>
            </div>
          </div>
          
          {notes.map((note) => (
            <NoteCard key={note.note_id} note={note} />
          ))}
        </div>
      );
}