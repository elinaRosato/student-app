'use client';

import { Course } from '@/types/custom';
import EditCourseModal from './EditCourseModal';
import { Delete01Icon, Edit01Icon } from "hugeicons-react";
import { deleteCourse, updateCourse } from '../actions';
import { useState } from 'react';
import Link from 'next/link';

export default function CourseCard( { course }: { course: Course } ) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e: React.MouseEvent, courseId: number) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteCourse(courseId);
    } catch (error: any) {
      console.error('Error deleting course:', error.message);
    }
  };

  const handleUpdate = async ( course: Course ) => {
  
    try { 
      await updateCourse(course);
    } catch (error: any) {
      console.log('Error updating course:', error.message);
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Link className="flex justify-between p-4 bg-slate-50 rounded-md" href={`/dashboard/courses/${course.course_id}`}>          
          <div>
            <div className='flex gap-2'>
              <span className="text-xl">{'📚'}</span>
              <h3 className="text-xl font-medium text-slate-600">{course.course_name}</h3>
            </div>
            <div className='flex gap-2'>
              <p className='text-slate-400 font-light'>{course.course_field} ~</p>
              <p className='text-slate-400 font-light'>{course.credits + ' credits' || ''}</p>
            </div>
            
          </div>
          <div className='flex gap-4'>
            <button onClick={(e) => openModal(e)}>
              <Edit01Icon size={24} color='var(--secondary)' />
            </button>
            <button onClick={(e) => handleDelete(e, course.course_id) }>
              <Delete01Icon size={24} />
            </button>
          </div>
      </Link>
      {showModal && course && (
        <EditCourseModal
          course={course}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
    
  );
};