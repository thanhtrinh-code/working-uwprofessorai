// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzTOcWB9TR3O8gndvArHeldZacKgKNKe8",
  authDomain: "uwprofessorai.firebaseapp.com",
  projectId: "uwprofessorai",
  storageBucket: "uwprofessorai.appspot.com",
  messagingSenderId: "424068103217",
  appId: "1:424068103217:web:990a53dadf0418ce962910",
  measurementId: "G-0JMW9N104L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
