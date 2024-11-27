import { createClient } from '@/utils/supabase/server';
import { ArrowLeft02Icon } from 'hugeicons-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const supabase = await createClient();

  // Fetch all course IDs from the database
  const { data: courses, error } = await supabase.from('courses').select('course_id');

  if (error || !courses) {
    console.error('Error fetching courses:', error?.message);
    return [];
  }

  // Map courses to params objects
  return courses.map((course) => ({
    courseId: course.course_id.toString(),
  }));
}

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const supabase = await createClient();

  const { courseId } = await params

  // Fetch data for a single course based on courseId
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('course_id', courseId)
    .single();

  if (error || !course) {
    return (
      <div className="p-6">
        <Link className="flex gap-2 p-4 bg-slate-50 rounded-md" href={`/dashboard/courses`} >
            <ArrowLeft02Icon/>
            Back to courses
        </Link>
        <h1 className="text-xl font-bold text-red-500">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-slate-200 rounded-lg" href="/dashboard/courses" >
          <ArrowLeft02Icon/>
          Back to courses
      </Link>
      <h1 className="text-3xl font-bold">{course.course_name}</h1>
      <p><strong>Credits:</strong> {course.credits}</p>
    </div>
  );
}
