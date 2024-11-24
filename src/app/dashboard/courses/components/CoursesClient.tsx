'use client';

import { useState } from 'react';
import CreateCourseForm from './CreateCourseForm';
import CourseList from './CourseList';

const CoursesClient = ({ courses }: { courses: any[] }) => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  const openAddCourseModal = () => setShowAddCourseModal(true);
  const closeAddCourseModal = () => setShowAddCourseModal(false);

  return (
    <div className="text-gray-700">
        <div className='flex justify-between'>
        <h1 className="text-3xl font-bold">Courses</h1>
        <button onClick={openAddCourseModal} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add course
        </button>
        </div>
      {showAddCourseModal && (
        <div className="modal">
          <CreateCourseForm onClose={closeAddCourseModal} />
        </div>
      )}
      <hr className="my-4" />
      <CourseList courses={courses} />
    </div>
  );
};

export default CoursesClient;
