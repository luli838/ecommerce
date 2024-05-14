// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    browserLocalPersistence,
    getAuth,
    setPersistence,
  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7PGbvxeSdCl7uHfi4sbSjdQBprUxu4xw",
  authDomain: "ecommerce-palma-c383f.firebaseapp.com",
  databaseURL: "https://ecommerce-palma-c383f-default-rtdb.firebaseio.com",
  projectId: "ecommerce-palma-c383f",
  storageBucket: "ecommerce-palma-c383f.appspot.com",
  messagingSenderId: "548893968300",
  appId: "1:548893968300:web:c861e4a3a6c094bab71c09",
  measurementId: "G-6DY6DK56DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//Set persistence to Local Storage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LocalStorage.");
  })
  .catch((err) => {
    console.error("Error setting auth persistence:", err);
  });
