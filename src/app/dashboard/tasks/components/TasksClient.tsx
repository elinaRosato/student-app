'use client';

import { useState } from 'react';
import TaskList from './TaskList';
import { MinimalCourse, Task } from '@/types/custom';
import CreateTaskForm from './CreateTaskForm';

const CoursesClient = ({ tasks, courses }: { tasks: Task[]; courses: MinimalCourse[] }) => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  const openAddCourseModal = () => setShowAddCourseModal(true);
  const closeAddCourseModal = () => setShowAddCourseModal(false);

  return (
    <div className="text-gray-700">
        <div className='flex justify-between'>
        <h1 className="text-3xl font-bold">Tasks</h1>
        <button onClick={openAddCourseModal} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add task
        </button>
        </div>
      {showAddCourseModal && (
        <div className="modal">
          <CreateTaskForm onClose={closeAddCourseModal} courses={courses} />
        </div>
      )}
      <hr className="my-4" />
      <TaskList tasks={tasks} courses={courses} />
    </div>
  );
};

export default CoursesClient;
