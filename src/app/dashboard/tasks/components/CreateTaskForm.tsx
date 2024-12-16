'use client';

import { useRef, useState } from 'react';
import { addTask, getMinimalCourses } from '../actions';
import { MinimalCourse } from '@/types/custom';
import TaskCard from './TaskCard';

export default function CreateTaskForm({ onClose, courses }: { onClose: () => void; courses: MinimalCourse[]}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<MinimalCourse[]>(courses);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const formData = new FormData(formRef.current!);
      await addTask(formData);
      formRef.current?.reset();
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  // Filter courses based on input
  /* const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredCourses(
      courses.filter((course) =>
        course.course_name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCourseSelect = (courseId: number) => {
    if (!selectedCourses.includes(courseId)) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
    setInputValue('');
    setFilteredCourses(courses); // Reset dropdown after selection
  }; */

  // Remove selected course
  const removeCourse = (courseId: number) => {
    setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
  };

  return (
    <div className='fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50'>
      <form ref={formRef} onSubmit={handleSubmit} className="w-1/2 space-y-4 bg-slate-100 p-6 rounded-xl">
        <h2 className='text-lg font-medium'>Add New Task</h2>
        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium">
            Description
          </label>
          <input
            type="text"
            id="task_description"
            name="task_description"
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="taskDueDate" className="block text-sm font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="task_due_date"
            name="task_due_date"
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="taskStatus" className="block text-sm font-medium">
            Status
          </label>
          <select 
            name="task_status" 
            id="task_status" 
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md" 
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {selectedCourses.map((courseId) => {
            const course = courses.find((course) => course.course_id === courseId);
            return (
              <div
                key={courseId}
                className="flex items-center bg-blue-200 px-2 rounded-lg text-sm text-slate-500 font-light"
              >
                {course?.course_name}
                <button
                  type="button"
                  onClick={() => removeCourse(courseId)}
                  className="ml-2 text-slate-500 text-sm font-light"
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
        
        <div className='flex gap-4 justify-end'>
          <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md">Cancel</button>
          <button
            type="submit"
            className={`py-2 px-4 bg-blue-500 text-white rounded-md`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
        
        

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
    
  );
};