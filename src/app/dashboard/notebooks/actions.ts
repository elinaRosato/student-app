'use server';

import { Notebook } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addNotebook(formData: FormData) {
	const supabase = await createClient();


	const notebookName = formData.get('notebook_name') as string;
	const courseIds = formData.getAll('course_code') as string[]; // Assuming you're passing course codes as an array

	if (!notebookName || courseIds.length === 0) {
		throw new Error('Check the fields and try again.');
	}

	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
		throw new Error('User is not logged in');
	}

	// Insert the notebook into the notebooks table
	const { data: notebook, error: notebookError } = await supabase
		.from('notebooks')
		.insert([{ notebook_name: notebookName, user_id: user.id }])
		.select('notebook_id')
		.single();  // We are expecting to get one notebook

	if (notebookError || !notebook) {
		throw new Error('Error creating notebook');
	}

	const notebookCoursesData = courseIds.map(courseId => ({
		notebook_id: notebook.notebook_id,
		course_id: parseInt(courseId),
	}));

	// Insert into the notebook_courses table
	const { error: notebookCoursesError } = await supabase
		.from('notebook_courses')
		.insert(notebookCoursesData);

	if (notebookCoursesError) {
		throw new Error('Error adding courses to notebook relations.');
	}

	revalidatePath('/dashboard/notebooks');
}

export async function deleteNotebook(id: number) {
	const supabase = await createClient();

	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
			throw new Error ('User is not logged in')
	}

	const { data: notebook, error: fetchError } = await supabase
			.from('notebooks')
			.select('notebook_id')
			.eq('notebook_id', id)
			.eq('user_id', user.id)
			.single(); // Get a single notebook

	if (fetchError || !notebook) {
			throw new Error('Notebook not found or does not belong to the user');
	}

	const { error } = await supabase
			.from('notebooks')
			.delete()
			.eq('notebook_id', id)
			.eq('user_id', user.id);

	if (error) {
			throw new Error('Error deleting notebook: ');
	}

	const { error: deleteCoursesError } = await supabase
			.from('notebook_courses')
			.delete()
			.eq('notebook_id', id);

	if (deleteCoursesError) {
			throw new Error('Error deleting related courses: ');
	}

	// If everything goes well, revalidate the path to reflect the changes
	revalidatePath('/dashboard/notebooks');
}

export async function updateNotebook(notebook: Notebook) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error ('User is not logged in')
    }
    
    const { error } = await supabase
        .from('notebooks')
        .update({
            notebook_name: notebook.notebook_name,
        }).match({
            user_id: user.id,
            notebook_id: notebook.notebook_id,
        })
    
    if( error ) {
        console.log(notebook)
        throw new Error ('Error updating notebook.')
    }

    revalidatePath('/dashboard/notebooks');
}