import { Note as NoteType } from "../utils/types";
import Note from "./Note";
interface NoteListProps{
    notes: NoteType[];
    onClick: (note: NoteType) => void;
    onPin: (note: NoteType) => void;
    onDelete: (noteId: string) => void;
}
function NotesList({notes, onClick, onPin, onDelete}:NoteListProps) {
  return (
    <div className=" grid grid-cols-1 gap-x-3 lg:grid-cols-2 ">
      {notes.map(note=>(
        <Note key={note.id} note={note} onClick={onClick} onPin={onPin} onDelete={onDelete}/>
      ))}
    </div>
  )
}

export default NotesList
