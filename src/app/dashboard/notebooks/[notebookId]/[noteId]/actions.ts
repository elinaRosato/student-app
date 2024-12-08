'use server';

import { Note } from "@/types/custom";
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

export async function addBlock (noteId: number, blockType: string, order: number) {
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
      order: order
		})
      .select();

	if (error) {
		return { error }
	} else {
        return { data }
	}
}

export async function updateBlockContent (blockId: number, updatedContent: string,) {
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
    .update({ 
      block_content: updatedContent 
    })
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

export async function updateBlockOrder (blockId: number, updatedOrder: number,) {
  const supabase = await createClient();

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // If no user is logged in, throw an error
  if (!user) {
    throw new Error('User is not logged in');
  }

  // Update the block order
  const { data, error } = await supabase
    .from("blocks")
    .update({ 
      order: updatedOrder 
    })
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

export async function deleteBlock (blockId: number) {

  const supabase = await createClient();

	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
			throw new Error ('User is not logged in')
	}

  const { data: blockToDelete } = await supabase
	.from("blocks")
	.select("*")
	.eq("block_id", blockId)
  .single();
  if (!blockToDelete) {
    throw new Error ('Error')
  }

  const { data: blocks } = await supabase
	.from("blocks")
	.select("*")
	.eq("note_id", blockToDelete?.note_id);

  if (!blocks) {
    throw new Error ('Error')
  }

  const { data: note } = await supabase
	.from("notes")
	.select("*")
	.eq("note_id", blockToDelete?.note_id)
  .single() as { data: Note | null; error: any };

  if (!note) {
    throw new Error ('Error')
  }

  blocks.forEach(async (block) => {
    if (block.order > blockToDelete.order) {
        const  { error: updateError }  = await updateBlockOrder(block.block_id, block.order-1);
        if (updateError) {
          alert("Error updating block order");
        }
      } 
    });

	const { error } = await supabase
			.from('blocks')
			.delete()
			.eq('block_id', blockId)
			.eq('user_id', user.id);

	if (error) {
			throw new Error('Error deleting note: ');
	}

	revalidatePath(`/dashboard/notebooks/${note.notebook_id}/${note.note_id}`);
	
}