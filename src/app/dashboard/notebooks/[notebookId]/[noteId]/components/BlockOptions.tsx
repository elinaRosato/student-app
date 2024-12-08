import { Delete01Icon, DragDropVerticalIcon } from "hugeicons-react";
import React, { useState, useRef, useEffect } from "react";

export default function BlockOptions({ blockId, onDelete }: { blockId: number; onDelete: (blockId: number) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div ref={menuRef} className={`absolute left-[-18px] top-1/2 -translate-y-1/2 ${isOpen ? 'opacity-100 z-10' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>
        <span className="cursor-pointer" onClick={toggleDropdown}>
          <DragDropVerticalIcon size={20} />
        </span>
        {isOpen && (
            <div className="dropdown-menu shadow-md absolute right-[-150%] mt-1 bg-slate-50 rounded-md">
            <button
                onClick={() => {
                onDelete(blockId);
                setIsOpen(false);
                }}
                className="flex gap-2 justify-center align-center dropdown-item px-4 py-2 rounded-md bg-slate-50 text-sm font-normal text-slate-700 "
            >
              <Delete01Icon size={15}/>
              Delete
            </button>
            </div>
        )}
      </div>
      
    </>
  );
}
