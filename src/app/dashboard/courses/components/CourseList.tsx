'use client';

import { Course } from '@/types/custom';
import CourseCard from './CourseCard';
import { FilterHorizontalIcon, FilterMailSquareIcon, Sorting01Icon } from 'hugeicons-react';

export default function CourseList( { courses }: { courses: Array<Course> } ) {

  return (
    <div className="space-y-4 bg-slate-200 p-4 rounded-xl">
      <div className='flex justify-between'>
        <h2 className='text-xl'>My Courses</h2>
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
      
      {courses.map((course) => (
        <CourseCard key={course.course_id} course={course}/>
      ))}
    </div>
  );
};