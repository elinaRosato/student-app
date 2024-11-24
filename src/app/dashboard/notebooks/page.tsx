'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import NotebooksClient from './components/NotebooksClient';
import { Course, MinimalCourse, Notebook } from '@/types/custom';

const fetchData = async (): Promise<{ notebooks: Notebook[]; courses: MinimalCourse[] }> => {
  const supabase = await createClient();
  
  // Fetch user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch notebooks and related courses
  const { data: notebooks, error: notebooksError } = await supabase
  .from('notebooks')
  .select(`
    notebook_id,
    notebook_name,
    notebook_courses(
      course_id,
      courses(course_name)
    )
  `);

  if (notebooksError) {
    console.error('Error fetching notebooks:', notebooksError.message);
    return { notebooks: [], courses: [] };
  }

  // Fetch courses for dropdown
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('course_id, course_name');

  if (coursesError) {
    console.error('Error fetching courses:', coursesError.message);
    return { notebooks, courses: [] };
  }

  return { notebooks, courses };
};

export default async function Notebooks () {

  const { notebooks, courses } = await fetchData();

  return (
    <>
        <NotebooksClient notebooks={notebooks || []} courses={courses || []} />
    </>
  );
};