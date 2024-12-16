'use server';

import { Task } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTasks () {
	const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if ( !user ) {
    return redirect("/login"); 
  }

  // Fetch tasks with their related courses using `task_courses` join
	const { data: tasks, error } = await supabase
	.from("tasks")
	.select(`
    *,
    task_courses (
        course_id
      )
  `);
    
  if( error ) {
    throw new Error ('Error fetching tasks.')
  }
  return tasks;
}

export async function getMinimalCourses () {
	const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if ( !user ) {
    return redirect("/login"); 
  }

  // Fetch minimal version of courses 
  const { data: courses, error } = await supabase
    .from('courses')
    .select('course_id, course_name');
	
  if( error ) {
    throw new Error ('Error fetching minimal courses.')
  }
  return courses;
}

export async function addTask (formData: FormData) {
    const supabase = await createClient();

    const data = {
        task_description: formData.get('task_description') as string,
        task_due_date: formData.get('task_due_date') as string,
        task_status: formData.get('task_status') as string,
      }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }

    const { error } = await supabase.from('tasks').insert([{
        ...data,
        user_id: user.id,
    }]).select();

    if( error ) {
        throw new Error (error.message || 'Error adding task.')
    }

    revalidatePath('/dashboard/tasks');
}

export async function addTaskCourse (task_id: number, course_id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
      return redirect("/login");
  }

  const { error } = await supabase.from('task_courses').insert([{
      task_id: task_id,
      course_id: course_id,
  }])

  if( error ) {
      throw new Error (error.message || 'Error adding task related course.')
  }

  revalidatePath('/dashboard/tasks');
}

export async function deleteTask (task_id: number) {

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }

    const { error } = await supabase.from('tasks').delete().match({
        user_id: user.id,
        task_id: task_id,
    })

    if( error ) {
        throw new Error ('Error deleting task.')
    }

    revalidatePath('/dashboard/tasks');
}

export async function deleteTaskCourse (task_id: number, course_id: number) {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
      return redirect("/login");
  }

  const { error } = await supabase.from('task_courses').delete().match({
      task_id: task_id,
      course_id: course_id,
  })

  if( error ) {
      throw new Error ('Error deleting task related course.')
  }

  revalidatePath('/dashboard/tasks');
}


export async function updateTask (task: Task) {
	const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if ( !user ) {
      return redirect("/login"); 
    }
    
    const { error } = await supabase
        .from('tasks')
        .update({
            task_description: task.task_description,
            task_due_date: task.task_due_date,
            task_status: task.task_status,
        }).match({
            user_id: user.id,
            task_id: task.task_id,
        })
    
    if( error ) {
        throw new Error ('Error updating task.')
    }

    revalidatePath('/dashboard/tasks');
}
