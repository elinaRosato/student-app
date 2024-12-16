'use client';

import { MinimalCourse, Task } from '@/types/custom';
import TaskCard from './TaskCard';
import { FilterHorizontalIcon, FilterMailSquareIcon, Sorting01Icon } from 'hugeicons-react';

export default function TaskList( { tasks, courses }: { tasks: Task[]; courses: MinimalCourse[] } ) {

  return (
    <div className="space-y-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
      <div className='flex justify-between'>
        <h2 className='text-xl'>All Tasks</h2>
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
      
      {tasks.map((task) => (
        <TaskCard key={task.task_id} task={task} courses={courses} />
      ))}
    </div>
  );
};