'use server';

import { Course } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCourse(formData: FormData) {
    const supabase = await createClient();

    const data = {
        course_name: formData.get('course_name') as string,
        course_code: formData.get('course_code') as string,
        tags: formData.get('tags') as string,
        credits: parseInt(formData.get('credits') as string, 10),
      }

    if (!data.course_name || !data.course_code || isNaN(data.credits)) {
        throw new Error("Check the fields and try again.")
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error ('User is not logged in')
    }

    const { error } = await supabase.from('courses').insert([{
        ...data,
        course_field: 'field',
        user_id: user.id,
    }]).select();

    if( error ) {
        throw new Error ('Error adding course.')
    }

    revalidatePath('/dashboard/courses');
}

export async function deleteCourse(id: number) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error ('User is not logged in')
    }

    const { error } = await supabase.from('courses').delete().match({
        user_id: user.id,
        course_id: id,
    })

    if( error ) {
        throw new Error ('Error adding course.')
    }

    revalidatePath('/dashboard/courses');
}

export async function updateCourse(course: Course) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error ('User is not logged in')
    }
    
    const { error } = await supabase
        .from('courses')
        .update({
            course_name: course.course_name,
            course_field: course.course_field,
            credits: course.credits,
            course_code: course.course_code,  // Ensure this is handled properly (can be null or a string)
            tags: course.tags, 
        }).match({
            user_id: user.id,
            course_id: course.course_id,
        })
    
    if( error ) {
        console.log(course)
        throw new Error ('Error updating course.')
    }

    revalidatePath('/dashboard/courses');
}
