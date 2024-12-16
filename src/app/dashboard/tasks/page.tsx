'use server'

import TasksClient from './components/TasksClient';
import { getMinimalCourses, getTasks } from './actions';

const Tasks = async () => {

  const  tasks  = await getTasks();
  
  const courses = await getMinimalCourses();


  return (
    <>
        <TasksClient tasks={tasks || []} courses={courses} />
    </>
  );
};

export default Tasks;
