import { PlusSignIcon } from "hugeicons-react";
import { useState } from "react";

const BlockTypes = [
  { label: "Heading 1", type: "heading_1" },
  { label: "Heading 2", type: "heading_2" },
  { label: "Text", type: "text" },
  { label: "Callout", type: "callout" },
  { label: "Numbered List", type: "numbered_list" },
  { label: "Bullet List", type: "bullet_list" },
];

export default function AddBlockButton({ onAdd }: { onAdd: (type: string, order: number | undefined) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className=" my-1 px-2 py-2 bg-slate-200 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PlusSignIcon size={18} />
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-white shadow-lg border rounded">
          {BlockTypes.map((block) => (
            <button
              key={block.type}
              className="block px-4 py-2 hover:bg-slate-100 w-full text-left"
              onClick={() => {
                onAdd(block.type, undefined);
                setIsOpen(false);
              }}
            >
              {block.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
