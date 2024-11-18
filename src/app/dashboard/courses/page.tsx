'use server'

import CreateCourseForm from './components/CreateCourseForm';
import CourseList from './components/CourseList';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const Courses = async () => {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if ( !user ) {
    return redirect("/login"); 
  }

  const { data: courses, error } = await supabase.from('courses').select();
  if (error) {
    console.error('Error fetching courses:', error.message);
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Courses</h1>
        <CreateCourseForm />
        <hr className="my-4" />
        <CourseList courses={courses || []} />
      </div>
    </>
  );
};

export default Courses;