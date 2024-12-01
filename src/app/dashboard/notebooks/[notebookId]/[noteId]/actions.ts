'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getNote(noteId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('notes').select('*').eq('note_id', noteId).single();
  if (error) {
    console.error('Error fetching note:', error.message);
    return { error };
  }
  return { data };
}

export async function getNoteIds() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('notes').select('note_id');

  if (error) {
    console.error('Error fetching note IDs:', error.message);
    return [];
  }

  return data || [];
}

export async function getNotebookName(notebookId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('notebooks')
    .select('notebook_name')
    .eq('notebook_id', notebookId)
    .single();
  if (error) {
    console.error('Error fetching notebook:', error.message);
    return undefined;
  }
  return  data.notebook_name ;
}

export async function getBlocks (noteId: number) {
	const supabase = await createClient();

	const { data: blocks, error } = await supabase
	.from("blocks")
	.select("*")
	.eq("note_id", noteId);

	if (error) {
	return { error };
	} else {
	return { blocks };
	}	
}

export async function addBlock (noteId: number, blockType: string,) {
	const supabase = await createClient();

	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
			throw new Error ('User is not logged in')
	}

	const { data, error } = await supabase
		.from("blocks")
		.insert({
			block_content: "",
			block_type: blockType,
			note_id: noteId,
			user_id: user.id,
		})
        .select();

	if (error) {
		return { error }
	} else {
        return { data }
	}
}

export async function updateBlock (blockId: number, updatedContent: string,) {
  const supabase = await createClient();

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // If no user is logged in, throw an error
  if (!user) {
    throw new Error('User is not logged in');
  }

  // Update the block content
  const { data, error } = await supabase
    .from("blocks")
    .update({ block_content: updatedContent })
    .eq('block_id', blockId)
    .select(); 

  if (error) {
    return { error };
  } else if (data && data.length > 0) {
    return { data: data[0] };
  } else {
    return { error: "No block updated" };
  }
	
}