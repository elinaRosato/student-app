'use client';

import { useState } from 'react';
import AddBlockButton from './AddBlockButton';
import { Block, Note, Notebook } from '@/types/custom';
import { addBlock, deleteBlock, updateBlockContent, updateBlockOrder } from '../actions';
import BlockList from './BlockList';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/types';


export default function NoteClient({ note, initialBlocks } : {note: Note; initialBlocks: Block[]}) {
  const [blocks, setBlocks] = useState(initialBlocks.sort((a, b) => a.order - b.order));

  const handleAddBlock = async (blockType: string, order: number | undefined) => {
    try {
      // Update the database
      const insertOrder = order !== null && order !== undefined ? order : blocks.length;
      const { data, error } = await addBlock(note.note_id, blockType, insertOrder)

      if (error) {
        alert('Error adding block');
        return;
      }

      if (order !== null && order !== undefined) {

        blocks.forEach(async (block) => {
          if (block.order >= order) {
              const  { error: updateError }  = await updateBlockOrder(block.block_id, block.order+1);
              if (updateError) {
                alert("Error updating block order");
              }
            } 
          });
        }

      // Update the local state
      setBlocks((prev) => {
        const newBlocks = [...prev];
        if (typeof order === 'number') {
          newBlocks.forEach((block) => {
            if (block.order >= order) {
              block.order += 1;
            }
          });
          newBlocks.splice(order + 1, 0, data[0]);
        } else {
          // Add the block at the end
          newBlocks.push(data[0]);
        }
        return newBlocks.sort((a, b) => a.order - b.order); // Sort blocks by order
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred");
    }
  };

  const handleUpdateBlockContent = async (blockId: number, updatedContent: string) => {
    const block = blocks.find((block) => block.block_id === blockId);

    // Check if the content is actually different
    if (block && block.block_content != updatedContent) {
      const { error } = await updateBlockContent(blockId, updatedContent);

      if (error) {
        alert("Error updating block:");
      } else {
        setBlocks((prev) =>
          prev.map((block) =>
            block.block_id === blockId
              ? { ...block, block_content: updatedContent }
              : block
          )
        );
      }
    }
  };

  const handleDelete = async (blockId: number) => {
    try {
      await deleteBlock(blockId);
      setBlocks((prevBlocks) => prevBlocks.filter((block) => block.block_id !== blockId));
    } catch (error) {
      console.error('Error deleting block:', error);
    }
  }

  const handleReorderBlocks = async (sourceIndex: number, targetIndex: number, closestEdgeOfTarget: Edge | null) => {
    const reorderedBlocks = reorderWithEdge({
      list: blocks,
      startIndex: sourceIndex,
      indexOfTarget: targetIndex,
      closestEdgeOfTarget,
      axis: 'vertical',
    });
    
    // Ensure unique order numbers
    reorderedBlocks.forEach((block, index) => {
      block.order = index + 1; // Adjust the order to be unique (starting from 1)
    });
    
    // Update the front-end state
    setBlocks(reorderedBlocks);
  
    try {
      // Perform backend updates concurrently
      const updatePromises = reorderedBlocks.map((block, index) => 
        updateBlockOrder(block.block_id, index + 1) // Ensure order starts from 1
      );
      const updateResults = await Promise.all(updatePromises);
  
      // Check for errors in any of the updates
      const errors = updateResults.filter(result => result.error);
      if (errors.length > 0) {
        console.error("Some block updates failed:", errors);
      }
    } catch (error) {
      console.error("Error while updating block order in the backend:", error);
    }
  };

  return (
    <div className="py-6 px-4">
      <h1 className="text-3xl font-bold mb-4">{note.note_title}</h1>
      <hr className="border-t-1 border-solid border-slate-300 my-6" />
      <BlockList 
        blocks={blocks} 
        handleAddBlock={handleAddBlock} 
        handleUpdateBlockContent={handleUpdateBlockContent} 
        handleDelete={handleDelete} 
        handleReorderBlocks={handleReorderBlocks} />
      <AddBlockButton onAdd={handleAddBlock} />
    </div>
  );
}