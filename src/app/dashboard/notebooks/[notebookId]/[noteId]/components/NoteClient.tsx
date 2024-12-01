'use client';

import { useState } from 'react';
import BlockComponent from './BlockComponent';
import AddBlockButton from './AddBlockButton';
import { Block, Note, Notebook } from '@/types/custom';
import { ArrowLeft02Icon } from 'hugeicons-react';
import Link from 'next/link';
import { addBlock, updateBlock } from '../actions';

export default function NoteClient({ note, initialBlocks } : {note: Note; initialBlocks: Block[]}) {
  const [blocks, setBlocks] = useState(initialBlocks);

  const handleAddBlock = async (blockType: string) => {
    const { data, error } = await addBlock(note.note_id, blockType)
    if (error) {
      alert('Error adding block:');
    } else {
      setBlocks((prev) => [...prev, data[0]]);
    }
  };

  const handleUpdateBlock = async (blockId: number, updatedContent: string) => {
    const { error } = await updateBlock(blockId, updatedContent);
    if (error) {
      alert('Error updating block:');
    } else {
      setBlocks((prev) =>
        prev.map((block) =>
          block.block_id === blockId ? { ...block, block_content: updatedContent } : block
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{note.note_title}</h1>
      <div>
        {blocks.length > 0 ? (
          blocks.map((block) => (
            <BlockComponent
              key={block.block_id}
              block={block}
              onUpdate={(content) => handleUpdateBlock(block.block_id, content)}
            />
          ))
        ) : (
          <p className="text-slate-500 py-2">Type / to create a block</p>
        )}
      </div>
      <AddBlockButton onAdd={handleAddBlock} />
    </div>
  );
}