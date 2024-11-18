'use client';

import { useRef, useState } from 'react';
import { addCourse } from '../actions';

export default function CreateCourseForm() {
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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="courseName" className="block text-sm font-medium">
          Course Name
        </label>
        <input
          type="text"
          id="course_name"
          name="course_name"
          className="w-full p-2 border border-gray-300 rounded-md"
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
          className="w-full p-2 border border-gray-300 rounded-md"
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
          className="w-full p-2 border border-gray-300 rounded-md"
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
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <button
        type="submit"
        className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md`}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Course'}
      </button>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};