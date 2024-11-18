'use client';

import { Course } from '@/types/custom';
import CourseCard from './CourseCard';

export default function CourseList( { courses }: { courses: Array<Course> } ) {

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <CourseCard key={course.course_id} course={course}/>
      ))}
    </div>
  );
};