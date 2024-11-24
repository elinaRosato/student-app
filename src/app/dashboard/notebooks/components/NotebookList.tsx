import { MinimalCourse, Notebook } from "@/types/custom";
import { FilterHorizontalIcon, Sorting01Icon } from "hugeicons-react";
import NotebookCard from "./NotebookCard";

export default function NotebookList ({ notebooks, courses }: { notebooks: Array<Notebook>; courses: MinimalCourse[] }) {
    return (
        <div className="space-y-4 bg-slate-200 p-4 rounded-xl">
          <div className='flex justify-between'>
            <h2 className='text-xl'>My notebooks</h2>
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
          
          {notebooks.map((notebook) => (
            <NotebookCard key={notebook.notebook_id} notebook={notebook} />
          ))}
        </div>
      );
}