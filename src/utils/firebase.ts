// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5S-we4vTPdVdMXXr0AwKJ_buoJgE1Qyk",
  authDomain: "notes-8bea7.firebaseapp.com",
  projectId: "notes-8bea7",
  storageBucket: "notes-8bea7.appspot.com",
  messagingSenderId: "130428283566",
  appId: "1:130428283566:web:96ecc7c316e3686a0fdb3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);