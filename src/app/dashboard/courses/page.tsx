'use server'

import CreateCourseForm from './components/CreateCourseForm';
import CourseList from './components/CourseList';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import CoursesClient from './components/CoursesClient';

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
        <CoursesClient courses={courses || []} />
    </>
  );
};

export default Courses;