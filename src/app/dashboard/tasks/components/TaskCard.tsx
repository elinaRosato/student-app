'use client';

import { MinimalCourse, Task } from '@/types/custom';
import { Delete01Icon, Edit01Icon, MultiplicationSignIcon, PlusSignIcon } from "hugeicons-react";
import { addTaskCourse, deleteTask, deleteTaskCourse, getMinimalCourses, updateTask } from '../actions';
import { useState } from 'react';
import Link from 'next/link';
import EditTaskModal from './EditTaskModal';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../globals.css";

export default function TaskCard( { task, courses }: { task: Task, courses: MinimalCourse[] } ) {
  const [showModal, setShowModal] = useState(false);
  const [isDescriptionEditable, setDescriptionEditable] = useState(false);
  const [isStatusEditable, setStatusEditable] = useState(false);
  const [isDateEditable, setDateEditable] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const [showCourses, setShowCourses] = useState(false);

  const filteredCourses = courses.filter(
    (course) =>
      !(task.task_courses?.some(
        (taskCourse) => taskCourse.course_id === course.course_id
      ) || task.task_courses === null)
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Not Started": "text-orange-400 bg-orange-100",
      "In Progress": "text-blue-400 bg-blue-100",
      "Done": "text-green-400 bg-green-100",
    };
    return colors[status] || "text-gray-400 bg-gray-100";
  };
  
  const handleDelete = async (e: React.MouseEvent, taskId: number) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteTask(taskId);
    } catch (error: any) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleUpdate = async ( task: Task ) => {
  
    try { 
      await updateTask(task);
    } catch (error: any) {
      console.log('Error updating task:', error.message);
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

  // Format the date for display as "Dec 15"
  const formattedDate = task.task_due_date
    ? new Date(task.task_due_date).toLocaleDateString('en-US', {
        month: 'short', // "Dec"
        day: 'numeric', // "15"
      })
    : '';
  
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedTask({ ...updatedTask, task_description: e.target.value });
    };
  
    const handleStatusChange = (status: string) => {
      setUpdatedTask({ ...updatedTask, task_status: status });
      setStatusEditable(false); // Close dropdown after selection
      handleUpdate({ ...updatedTask, task_status: status });
    };
  
    const handleDateChange = (date: Date | null) => {
      if (date) {
        setUpdatedTask({ ...updatedTask, task_due_date: date.toISOString() });
      }
    };
  
    const handleDescriptionBlur = () => {
      setDescriptionEditable(false);
      handleUpdate(updatedTask);
    };
  
    const handleStatusBlur = () => {
      setStatusEditable(false);
      handleUpdate(updatedTask);
    };
  
    const handleDateBlur = () => {
      setDateEditable(false);
      handleUpdate(updatedTask);
    };

    const handleAddRelatedCourse = (course_id: number) => {
      addTaskCourse(task.task_id, course_id);
      setShowCourses(false);
      setUpdatedTask({ ...updatedTask, task_courses: [ ...(updatedTask.task_courses || []), {course_id: course_id} ], });
    }

    const handleDeleteRelatedCourse = (course_id: number) => {
      deleteTaskCourse(task.task_id, course_id);
      setUpdatedTask({ ...updatedTask, task_courses: [ ...(updatedTask.task_courses || [])].filter((task_course) => task_course.course_id != course_id), });
    }

  return (
    <>
      <Link className="flex flex-col justify-between p-4 bg-slate-50 border border-slate-200 rounded-md" href={``}>          
        <div className="flex justify-between">
          <div className='flex gap-2'>
            {isDescriptionEditable ? (
              <input
                type="text"
                value={updatedTask.task_description}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
                autoFocus
                className="text-lg font-medium text-slate-600 w-full bg-slate-50 focus:outline-none"
              />
            ) : (
              <h3
                onClick={() => setDescriptionEditable(true)}
                className="text-lg font-medium text-slate-600 cursor-pointer"
              >
                {updatedTask.task_description}
              </h3>
            )}
          </div>
          <div className='flex gap-4'>
            <button onClick={(e) => openModal(e)}>
              <Edit01Icon size={18} />
            </button>
            <button onClick={(e) => handleDelete(e, task.task_id) }>
              <Delete01Icon size={18} />
            </button>
          </div>
        </div>
        <div className='relative flex flex-wrap gap-2 wrap mt-2'>
          {updatedTask.task_courses?.map((task_course) => (
            <div key={task_course.course_id} className='flex items-center gap-1 bg-slate-200 px-2 py-[0.15rem] rounded-xl'>
              <p className="text-sm text-slate-500 font-light" >
                {courses.find((course)  => course.course_id === task_course.course_id)?.course_name}
              </p>
              <MultiplicationSignIcon size={12} onClick={() => {handleDeleteRelatedCourse(task_course.course_id)}}/>
            </div>
          ))}
          <button 
            className='rounded-full border border-slate-500 p-1'
            onClick={() => {setShowCourses(!showCourses)}}
          >
            <PlusSignIcon size={15} />
          </button>
          {showCourses && 
          <div className='absolute top-[120%] bg-slate-50 p-2 rounded-lg border border-slate-200 '>
            {filteredCourses?.map((course) => (
              <div 
                key={course.course_id} 
                className=' px-2 py-[0.15rem] border-b border-b-slate-200 '
                onClick={() => {handleAddRelatedCourse(course.course_id)}}
              >
                <p className="text-sm text-slate-500 font-light" >
                  {course.course_name || ''}
                </p>
              </div>
            ))}
          </div>
          }
          
        </div>
        <hr className="my-4" />
        <div className='flex justify-between gap-2'>
          {isStatusEditable ? (
            <div className="relative w-[40%]" >
              <p
                onClick={() => setStatusEditable(false)}
                className={`${getStatusColor(updatedTask.task_status)} inline-flex px-3 py-[0.15rem] rounded-xl font-light text-sm cursor-pointer`}
              >
                {updatedTask.task_status}
              </p>
              <div className="absolute w-full border border-slate-200 bg-slate-50 rounded-md p-2 mt-1 z-10">
                <p className='text-sm text-slate-500'>Select a status</p>
                <hr className="my-2" />
                <div className="flex flex-col items-start">
                  {["Not Started", "In Progress", "Done"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`inline-flex px-3 py-[0.15rem] my-[0.2rem] rounded-xl font-light text-sm text-left cursor-pointer ${getStatusColor(status)}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p
              onClick={() => setStatusEditable(true)}
              className={`${getStatusColor(updatedTask.task_status)} px-3 py-[0.15rem] rounded-xl font-light text-sm cursor-pointer`}
            >
              {updatedTask.task_status}
            </p>
          )}

          {isDateEditable ? (
            <div className='flex justify-end'>
              <ReactDatePicker
                selected={updatedTask.task_due_date ? new Date(updatedTask.task_due_date) : null}
                onChange={(date) => handleDateChange(date)}
                onBlur={handleDateBlur}
                autoFocus // Automatically opens the date picker when rendered
                className="pl-2 bg-slate-50 text-slate-500 border border-slate-200 rounded-lg focus:outline-none"
                open // Keeps the date picker always open
                onClickOutside={() => setDateEditable(false)} // Closes the date picker when clicking outside
              />
            </div>
          ) : (
            <p
              onClick={() => setDateEditable(true)}
              className="text-slate-400 font-light text-sm cursor-pointer"
            >
              {formattedDate  || 'Set Due Date'}
            </p>
          )}
        </div>
      </Link>
      {showModal && task && (
        <EditTaskModal
          task={task}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
    
  );
};