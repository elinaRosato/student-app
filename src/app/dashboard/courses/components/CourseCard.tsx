'use client';

import { Course } from '@/types/custom';
import EditCourseModal from './EditCourseModal';
import { Delete01Icon, Edit01Icon } from "hugeicons-react";
import { deleteCourse, updateCourse } from '../actions';
import { useState } from 'react';

export default function CourseCard( { course }: { course: Course } ) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (courseId: number) => {
    try {
      await deleteCourse(courseId);
    } catch (error: any) {
      console.error('Error deleting course:', error.message);
    }
  };

  const handleUpdate = async (course: Course) => {
    try { 
      await updateCourse(course);
    } catch (error: any) {
      console.log('Error updating course:', error.message);
    }
  };

  const openModal = (course: Course) => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
        <div className="flex justify-between p-4 bg-slate-50 rounded-md">
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
            <button onClick={() => openModal(course)}>
              <Edit01Icon size={24} color='var(--secondary)' />
            </button>
            <button onClick={() => handleDelete(course.course_id) }>
              <Delete01Icon size={24} />
            </button>
          </div>
          {showModal && course && (
            <EditCourseModal
              course={course}
              onClose={closeModal}
              onUpdate={handleUpdate}
            />
          )}
        </div>
  );
};