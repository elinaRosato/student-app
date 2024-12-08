import { Block as BlockType } from "@/types/custom";
import { DragDropVerticalIcon } from "hugeicons-react";
import React, { useState, useRef, useEffect } from "react";
import BlockOptions from "./BlockOptions";

export default function BlockComponent({ block, resetCounter, onAdd, onUpdate, onDelete }: { block: BlockType;  resetCounter: boolean; onAdd: (type: string, order: number) => void; onUpdate(content: string) : void; onDelete: (blockId: number) => void; }) {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!block.block_content?.trim());

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

  const openBlockOptions = () => {

  }
  
  return (
    <div className={`group relative px-2 py-1 text-slate-700 rounded ${getBlockStyle()}`} >
      <BlockOptions blockId={block.block_id} onDelete={onDelete} />

      <div
        contentEditable={true}
        suppressContentEditableWarning
        ref={contentRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`cursor-${isEditing ? "text" : "pointer"}`}
      >
        {isEmpty && !isEditing ? (
          <span className="text-slate-400 pointer-events-none">
            Start typing...
          </span>
        ): 
          block.block_content
        }
      </div>
    </div>
  );
}