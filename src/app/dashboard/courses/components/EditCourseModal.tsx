import { Course } from "@/types/custom";
import { useState } from "react";

export default function EditCourseModal({ course, onClose, onUpdate }: { course: Course, onClose: () => void, onUpdate: (updatedCourse: Course) => void }) {
  const [updatedCourse, setUpdatedCourse] = useState<Course>(course);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(updatedCourse);
    onUpdate(updatedCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-1/2 bg-slate-100 p-6 rounded-md">
      <h2 className="text-xl mb-4">Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Course Name</label>
            <input
              type="text"
              name="course_name"
              value={updatedCourse.course_name}
              onChange={handleChange}
              className="w-full bg-slate-50 p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Course Field</label>
            <input
              type="text"
              name="course_field"
              value={updatedCourse.course_field || ''}
              onChange={handleChange}
              className="w-full bg-slate-50 p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Credits</label>
            <input
              type="number"
              name="credits"
              value={updatedCourse.credits || ''}
              onChange={handleChange}
              className="w-full bg-slate-50 p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
