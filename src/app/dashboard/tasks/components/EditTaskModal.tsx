import { Course, Task } from "@/types/custom";
import { useState } from "react";

export default function EditTaskModal({ task, onClose, onUpdate }: { task: Task, onClose: () => void, onUpdate: (updatedCourse: Task) => void }) {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(updatedTask);
    onUpdate(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-1/2 bg-slate-100 p-6 rounded-md">
      <h2 className="text-xl mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              name="task_description"
              value={updatedTask.task_description}
              onChange={handleChange}
              className="w-full bg-slate-50 p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              name="task_due_date"
              value={updatedTask.task_due_date || ''}
              onChange={handleChange}
              className="w-full bg-slate-50 p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select 
            name="task_status" 
            value={updatedTask.task_status || ''}
            onChange={handleChange}
            className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md" 
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In progress</option>
            <option value="Done">Done</option>
          </select>
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
