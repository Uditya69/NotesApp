//firebase crud service

import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Note } from "./types";

const notesCollection = collection(db, "notes");
//function to convert notes into firestore format as firestore dosent store id within the document
const formatNote = (note: Note): DocumentData => {
  const { id, ...rest } = note; //destructuring id from note
  return rest;
};

export const addNote = async (note: Note) => {
  await addDoc(notesCollection, formatNote(note));
};
export const getNotes = async (): Promise<Note[]> => {
  const Snapshot = await getDocs(notesCollection);
  return Snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Note));
};
export const updateNote = async (note: Note) => {
  if (note.id) {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, formatNote(note));
   }
};
export const deleteNote= async(id:string)=>{
    const noteRef=doc(db,"notes",id);
    await deleteDoc(noteRef);
}
