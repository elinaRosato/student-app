import { Block } from '@/types/custom';
import React, { useEffect } from 'react'
import BlockComponent from './BlockComponent';

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Edge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';


type Props = {
    blocks:  Block[],
    handleAddBlock: (blockType: string, order: number | undefined) => void;
    handleUpdateBlockContent: (blockId: number, content: string) => void;
    handleDelete: (blockId: number) => void;
    handleReorderBlocks: (sourceIndex: number, destinationIndex: number, closestEdgeOfTarget: Edge | null) => void;
}

export default function BlockList({ 
  blocks, 
  handleAddBlock, 
  handleUpdateBlockContent, 
  handleDelete,
  handleReorderBlocks,
}: Props) {
  

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data && source.data.block_id !== undefined;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceIndex = blocks.findIndex(
          (block) => block.block_id === source.data.block_id
        );
        const targetIndex = blocks.findIndex(
          (block) => block.block_id === target.data.block_id
        );

        if (sourceIndex < 0 || targetIndex < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(target.data);
        console.log(closestEdgeOfTarget);
        if (closestEdgeOfTarget === 'top') {
          console.log('Reordering to top');
          handleReorderBlocks(sourceIndex, targetIndex, 'top');
        } else if (closestEdgeOfTarget === 'bottom') {
          console.log('Reordering to bottom');
          handleReorderBlocks(sourceIndex, targetIndex, 'bottom');
        }
      },
    });
  }, [blocks]);


  return (
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
  )
}