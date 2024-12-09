import { Block as BlockType } from "@/types/custom";
import React, { useState, useRef, useEffect, HTMLAttributes } from "react";
import BlockOptions from "./BlockOptions";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import DropIndicator from './DropIndicator';
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import invariant from 'tiny-invariant';

type BlockState =
  | {
      type: 'idle';
    }
  | {
      type: 'preview';
      container: HTMLElement;
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    };

const stateStyles = {
  'is-dragging': 'opacity-40',
  'is-dragging-over': 'border-dashed border-2 border-blue-500', // Example style
};

const idle: BlockState = { type: 'idle' };

export default function BlockComponent({ block, resetCounter, onAdd, onUpdate, onDelete }: { block: BlockType;  resetCounter: boolean; onAdd: (type: string, order: number) => void; onUpdate(content: string) : void; onDelete: (blockId: number) => void; }) {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!block.block_content?.trim());
  const ref = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState(idle);

  const handleBlur = () => {
    setIsEditing(false);
    if (contentRef.current) {
      const newText = contentRef.current.innerText.trim();;
      setIsEmpty(!newText);
      onUpdate(newText);
    }
  };

    const handleFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleBlur();
      onAdd('text', block.order + 1);
      if (contentRef.current) {
        contentRef.current.blur()
      }
    }
  };

  useEffect(() => {
    setIsEmpty(!block.block_content?.trim());
  }, [block.block_content]);

  useEffect(() => {
    const element = ref.current;
    invariant(element);

    if (dragHandleRef.current) {
      return combine(
        draggable({
          element: dragHandleRef.current,
          getInitialData() {
            return block;
          },
          onGenerateDragPreview({ nativeSetDragImage }) {
            setCustomNativeDragPreview({
              nativeSetDragImage,
              getOffset: pointerOutsideOfPreview({
                x: '16px',
                y: '8px',
              }),
              render({ container }) {
                setState({ type: 'preview', container });
              },
            });
          },
          onDragStart() {
            setState({ type: 'is-dragging' });
          },
          onDrop() {
            setState(idle);
          },
        }),
        dropTargetForElements({
          element,
          canDrop({ source }) {
            // not allowing dropping on yourself
            if (source.element === element) {
              return false;
            }
            // only allowing tasks to be dropped on me
            return source.data && source.data.block_id !== undefined;
          },
          getData({ input }) {
            const data = block;
            return attachClosestEdge(data, {
              element,
              input,
              allowedEdges: ['top', 'bottom'],
            });
          },
          getIsSticky() {
            return true;
          },
          onDragEnter({ self }) {
            const closestEdge = extractClosestEdge(self.data);
            setState({ type: 'is-dragging-over', closestEdge });
          },
          onDrag({ self }) {
            const closestEdge = extractClosestEdge(self.data);

            // Only need to update react state if nothing has changed.
            // Prevents re-rendering.
            setState((current) => {
              if (current.type === 'is-dragging-over' && current.closestEdge === closestEdge) {
                return current;
              }
              return { type: 'is-dragging-over', closestEdge };
            });
          },
          onDragLeave() {
            setState(idle);
          },
          onDrop() {
            setState(idle);
          },
        }),
      );
    }
    
  }, [block]);

  // Define unique styles or classes based on block type
  const getBlockStyle = () => {
    switch (block.block_type) {
      case "heading_1":
        return "text-xl font-bold	";
      case "heading_2":
        return "text-lg font-semibold	";
      case "heading_3":
        return "text-md font-medium	";
      case "callout":
        return "bg-violet-100 text-sm my-2 px-3 py-3";
      case "bullet_list":
        return "text-sm list-disc pl-8";  
      case "numbered_list":
        return `text-sm list-decimal pl-8 numbered-list-item ${resetCounter ? "resetCounter" : ""}`; 
      default:
        return "text-sm";
    }
  };
  
  return (
    <div ref={ref} className={`group relative px-2 py-1 text-slate-700 rounded ${getBlockStyle()}`} >
      <div ref={dragHandleRef} className="cursor-move">
        <BlockOptions blockId={block.block_id} onDelete={onDelete} />
      </div>

      <div
        contentEditable={true}
        suppressContentEditableWarning
        ref={contentRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`cursor-${isEditing ? "text" : "none"} focus:outline-none`}
      >
        {isEmpty && !isEditing ? (
          <span className="text-slate-400 pointer-events-none">
            Start typing...
          </span>
        ): 
          block.block_content
        }
        
      </div>
      {state.type === 'is-dragging-over' && state.closestEdge ? (
          <DropIndicator edge={state.closestEdge} gap={'0px'} />
        ) : null}
    </div>
  );
}