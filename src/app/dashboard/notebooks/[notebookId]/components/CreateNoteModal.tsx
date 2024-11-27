import { useRef, useState } from "react";
import { addNote } from "../actions";

export default function CreateNoteModal ({ onClose, notebookId }: { onClose: () => void; notebookId: number }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrorMessage('');
  
      try {
        const formData = new FormData(formRef.current!);
        await addNote(formData, notebookId);
        formRef.current?.reset();
      } catch (error: any) {
        setErrorMessage(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
        onClose();
      }
    };

    return (
        <div className='fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50'>
          <form ref={formRef} onSubmit={handleSubmit} className="w-1/2 space-y-4 bg-slate-100 p-6 rounded-xl">
            <h2 className='text-lg font-medium'>Add New Note</h2>
            <div>
              <label htmlFor="noteTitle" className="block text-sm font-medium">
                Note Title
              </label>
              <input
                type="text"
                id="note_title"
                name="note_title"
                className="w-full p-2 border border-slate-200 bg-slate-50 rounded-md"
                required
              />
            </div>
    
            <div className='flex gap-4 justify-end'>
              <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md">Cancel</button>
              <button
                type="submit"
                className={`py-2 px-4 bg-blue-500 text-white rounded-md`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Note'}
              </button>
            </div>
            
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    
          </form>
        </div>
      );
}
