'use server';

import { Note } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addNote(formData: FormData, notebookId: number) {
	const supabase = await createClient();

	const noteTitle = formData.get('note_title') as string;

	if (!noteTitle) {
		throw new Error('Check the fields and try again.');
	}

	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
		throw new Error('User is not logged in');
	}

	// Insert the note into the notes table
	const { data: note, error: noteError } = await supabase
		.from('notes')
		.insert([{ 
            note_title: noteTitle, 
            user_id: user.id,
            notebook_id: notebookId,
        }])
	if (noteError) {
		throw new Error(`Error creating note`);
	}

	revalidatePath('/dashboard/notes');
}



export async function deleteNote(noteId: number) {
	const supabase = await createClient();

	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
			throw new Error ('User is not logged in')
	}

	const { data: note, error: fetchError } = await supabase
			.from('notes')
			.select('note_id')
			.eq('note_id', noteId)
			.eq('user_id', user.id)
			.single(); // Get a single note

	if (fetchError || !note) {
			throw new Error('Note not found or does not belong to the user');
	}

	const { error } = await supabase
			.from('notes')
			.delete()
			.eq('note_id', noteId)
			.eq('user_id', user.id);

	if (error) {
			throw new Error('Error deleting note: ');
	}

	// If everything goes well, revalidate the path to reflect the changes
	revalidatePath('/dashboard/notes');
}