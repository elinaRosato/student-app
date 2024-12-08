'use client';

import { useState } from 'react';
import BlockComponent from './BlockComponent';
import AddBlockButton from './AddBlockButton';
import { Block, Note, Notebook } from '@/types/custom';
import { addBlock, deleteBlock, updateBlockContent, updateBlockOrder } from '../actions';

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

  return (
    <div className="py-6 px-4">
      <h1 className="text-3xl font-bold mb-4">{note.note_title}</h1>
      <hr className="border-t-1 border-solid border-slate-300 my-6" />
      <div>
        {blocks.length > 0 ? (
          blocks.map((block, index) => {
            const shouldResetCounter = 
              block.block_type === "numbered_list" &&
              (index === 0 || blocks[index - 1].block_type !== "numbered_list");

            return (
              <BlockComponent
                key={block.block_id}
                block={block}
                resetCounter={shouldResetCounter}
                onAdd={handleAddBlock}
                onUpdate={(content) => handleUpdateBlockContent(block.block_id, content)}
                onDelete={handleDelete}
              />
            )})
        ) : (
          <p className="text-slate-500 py-2">Press + to create a block</p>
        )}
      </div>
      <AddBlockButton onAdd={handleAddBlock} />
    </div>
  );
}