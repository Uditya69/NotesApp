import { useState } from "react";
import { Note as NoteType } from "../utils/types";
interface ModalProps {
  note: NoteType;
  onClose: () => void;
  onSave: (note: NoteType) => void;
}

function Modal({ note, onClose, onSave }: ModalProps) {
  const [title, setTitle] = useState(note.title);
  const [tagline, setTagline] = useState(note.tagline);
  const [body, setBody] = useState(note.body);
  const handleSave = () => {
    const encodedBody = body.replace(/\n/g, "<br>");
    onSave({ ...note, title, tagline, body:encodedBody });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center " >
      <div className="bg-[#121212] text-gray-300 flex flex-col p-5 min-h-[60vh] min-w-[50vw] justify-between rounded-md">
        <div className="gap-2 flex border-b border-gray-700 p-3">
          <label className=" font-bold">Title:</label>
          <input
            type="text"
            value={title}
            className="bg-transparent outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-2 border-b border-gray-700 p-3 ">
          <label className="font-bold">Tag:</label>
          <input
            type="text"
            value={tagline}
            className="bg-transparent outline-none"

            onChange={(e) => setTagline(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-col min-h-[30vh] p-3">
          <label className="font-bold">Content:</label>
          <textarea
            value={body}
            className="bg-transparent min-h-[20vh] outline-none"
            onChange={(e) => setBody(e.target.value)}

          />
        </div>
        <div className=" flex flex-row gap-5">
          <button onClick={handleSave} className="border rounded-xl border-gray-600 p-2 hover:text-green-400 hover:border-green-400 transition duration-500 ease-in-out" >Save</button>
          <button onClick={onClose} className="border rounded-xl border-gray-600 p-2 hover:text-red-500 hover:border-red-500 transition duration-500 ease-in-out">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
