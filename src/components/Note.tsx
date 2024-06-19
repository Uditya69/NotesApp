import { LuPinOff, LuPin } from "react-icons/lu";
import { Note as NoteType } from "../utils/types";
import { CiShoppingTag } from "react-icons/ci";
import { MdSubject } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
interface NoteProps {
  note: NoteType;
  onClick: (note: NoteType) => void;
  onPin: (note: NoteType) => void;
  onDelete: (noteId: string) => void;
}

function Note({ note, onClick, onPin, onDelete }: NoteProps) {
  return (
    <div
      onClick={() => onClick(note)}
      className={` border  ${note.pinned ? "border-yellow-600" : "border-cyan-900"} h-fit w-full py-3 rounded-lg m-2 hover:cursor-pointer`
      }>
      <div className=" border-b border-gray-600 ">
        <div className="flex flex-row items-center justify-between py-2 px-2">
          <div className="flex flex-row items-center gap-2">

            <MdSubject />

            <p>{note.title}</p>
          </div>
          <div className="  flex flex-row justify-between gap-3 px-5 py-2">
            <button
              className="border p-2 rounded-2xl border-red-500 border-opacity-15  hover:bg-red-600 text-red-700 hover:text-white transition duration-300 ease-in-out"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id!);
              }}
            >
              <RiDeleteBin6Line />

            </button>
            <button
              className={`${note.pinned ? "text-yellow-300 hover:text-red-500" : "hover:text-yellow-300"} transition duration-300 ease-in-out`}
              onClick={(e) => {
                e.stopPropagation();
                onPin(note);
              }}
            >
              {note.pinned ? <LuPinOff size={18}/>
                : <LuPin size={18} />

              }
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-600 ">
        <div className="flex flex-row items-center gap-2 py-2 px-2">

          <CiShoppingTag />
          <p>{note.tagline}</p>
        </div>
      </div>
      <div className="p-3 min-h-[10vh]" dangerouslySetInnerHTML={{ __html: note.body }}/>

    </div>
  );
}

export default Note;
