import { useRef, useState } from "react";
import { addNotebook } from "../actions";
import { MinimalCourse } from "@/types/custom";

export default function CreateNotebookModal ({ onClose, courses }: { onClose: () => void; courses: MinimalCourse[] }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<MinimalCourse[]>(courses);
    const [inputValue, setInputValue] = useState('');

  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrorMessage('');
  
      try {
        const formData = new FormData(formRef.current!);
        formData.append("course_code", selectedCourses.join(','));
        await addNotebook(formData);
        formRef.current?.reset();
      } catch (error: any) {
        setErrorMessage(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
        onClose();
      }
    };

    // Filter courses based on input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    };
  
    // Remove selected course
    const removeCourse = (courseId: number) => {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    };


    return (
        <div className='fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50'>
          <form ref={formRef} onSubmit={handleSubmit} className="w-1/2 space-y-4 bg-slate-100 p-6 rounded-xl">
            <h2 className='text-lg font-medium'>Add New Notebook</h2>
            <div>
              <label htmlFor="notebookName" className="block text-sm font-medium">
                Notebook Name
              </label>
              <input
                type="text"
                id="notebook_name"
                name="notebook_name"
                className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
                required
              />
            </div>
    
            <div>
              <label htmlFor="notebookCourses" className="block text-sm font-medium">
                Related Courses
              </label>
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
                  placeholder="Search for a course"
                />
                {filteredCourses.length > 0 && inputValue && (
                  <div className="absolute z-10 w-full bg-white shadow-md border border-slate-200 mt-1">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.course_id}
                        className="cursor-pointer p-2 hover:bg-blue-100"
                        onClick={() => handleCourseSelect(course.course_id)}
                      >
                        {course.course_name}
                      </div>
                    ))}
                  </div>
                )}

              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedCourses.map((courseId) => {
                  const course = courses.find((c) => c.course_id === courseId);
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
            </div>
            <div className='flex gap-4 justify-end'>
              <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md">Cancel</button>
              <button
                type="submit"
                className={`py-2 px-4 bg-blue-500 text-white rounded-md`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Notebook'}
              </button>
            </div>
            
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    
          </form>
        </div>
      );
}
