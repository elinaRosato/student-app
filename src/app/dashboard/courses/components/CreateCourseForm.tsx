'use client';

import { useRef, useState } from 'react';
import { addCourse } from '../actions';

export default function CreateCourseForm({ onClose}: { onClose: () => void}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const formData = new FormData(formRef.current!);
      await addCourse(formData);
      formRef.current?.reset();
      alert('Course created successfully!');
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50'>
      <form ref={formRef} onSubmit={handleSubmit} className="w-1/2 space-y-4 bg-slate-100 p-6 rounded-xl">
        <h2 className='text-lg font-medium'>Add New Course</h2>
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium">
            Course Name
          </label>
          <input
            type="text"
            id="course_name"
            name="course_name"
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="courseCode" className="block text-sm font-medium">
            Course Code
          </label>
          <input
            type="text"
            id="course_code"
            name="course_code"
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="credits" className="block text-sm font-medium">
            Credits
          </label>
          <input
            type="number"
            id="credits"
            name="credits"
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
          />
        </div>
        <div className='flex gap-4 justify-end'>
          <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md">Cancel</button>
          <button
            type="submit"
            className={`py-2 px-4 bg-blue-500 text-white rounded-md`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
        
        

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
    
  );
};