import { useEffect, useState } from "react";
import { Note as NoteType } from "./utils/types";
import { deleteNote, getNotes, updateNote, addNote } from "./utils/CRUD";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotesList from "./components/NotesList";
import Modal from "./components/Modal";
import { BiPencil } from "react-icons/bi";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  useEffect(() => {
    ///fetching notes from firebase
    const fetchNotes = async () => {
      const getnotes = await getNotes();
      setNotes(getnotes);
    };
    fetchNotes();
  }, []);
  const handleClick = (note: NoteType) => {
    setSelectedNote(note);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedNote(null);
  };
  const handleSave = async (updatedNote: NoteType) => {
    await updateNote(updatedNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    toast.success("Note Updated");
  };
  const handleAdd = async () => {
    const newNote: NoteType = {
      title: "New Note",
      tagline: "add a tag",
      body: "lorem ipsum dolor sit amet",
      pinned: false,
    };
    setNotes([...notes, newNote]);
    await addNote(newNote);
    toast.success("Note Added Successfully");
  };
  const handleDelete = async (noteId: string) => {
    await deleteNote(noteId);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    toast.success("Note Deleted Successfully");
  };
  const handlePin = async (note: NoteType) => {
    const updatedNote = { ...note, pinned: !note.pinned };
    await updateNote(updatedNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    toast.success(updatedNote.pinned ? "Note Pinned" : "Note Unpinned");
  };

  const pinned = notes.filter((note) => note.pinned);
  const unpinned = notes.filter((note) => !note.pinned);
  const sortedNotes = [...pinned, ...unpinned];

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className=" w-[80vw] flex flex-col m-auto items-center justify-between h-screen p-5 ">
      <div className=" flex flex-row justify-between items-center mx-auto w-full px-0 gap-2 mt-0">
        <h1 className=" text-2xl text-blue-100"> Sticky Notes</h1>
        <button
          onClick={handleAdd}
          className="border border-blue-600 hover:border-blue-400 border-opacity-55 p-2 rounded-md flex flex-row items-center gap-2  transition duration-300 ease-in-out"
        >
          <p>Add Note</p>
          <BiPencil className="" size={20} />
        </button>
      </div>
      <div className="w-full">
        <ToastContainer
          theme="dark"
          autoClose={1000}
          hideProgressBar
          transition={Zoom}
        />

        <NotesList
          notes={currentNotes}
          onClick={handleClick}
          onDelete={handleDelete}
          onPin={handlePin}
        />
        {showModal && selectedNote && (
          <Modal
            note={selectedNote}
            onClose={handleModalClose}
            onSave={handleSave}
          />
        )}
      </div>
      <div className=" flex flex-row gap-2 p-5 pb-10 ">
        {Array.from(
          { length: Math.ceil(sortedNotes.length / notesPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className=" border border-gray-800 p-1 px-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition duration-300 ease-in-out"
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;
