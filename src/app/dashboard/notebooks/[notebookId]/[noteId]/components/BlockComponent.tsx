import { Block as BlockType } from "@/types/custom";
import React, { useState, useRef } from "react";

export default function BlockComponent({ block, onUpdate }: { block: BlockType; onUpdate(content: string) : void  }) {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    setIsEditing(false);
    if (contentRef.current) {
      onUpdate(contentRef.current.innerText);
    }
  };
  
  return (
    <div
      className="group relative hover:bg-gray-100 px-2 py-1 rounded"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
        <span className="cursor-pointer">⋮⋮</span>
      </div>

      <div
        contentEditable={isEditing}
        suppressContentEditableWarning
        ref={contentRef}
        onClick={() => setIsEditing(true)}
        onBlur={handleBlur}
        className={`cursor-${isEditing ? "text" : "pointer"}`}
      >
        {block.block_content || "Start typing..."}
      </div>
    </div>
  );
}