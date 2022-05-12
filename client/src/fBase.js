// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHhcLdqmDfHvrHwnQUOTqDMEeh_3dsKug",
  authDomain: "earlgrey-c6e9b.firebaseapp.com",
  projectId: "earlgrey-c6e9b",
  storageBucket: "earlgrey-c6e9b.appspot.com",
  messagingSenderId: "743112147824",
  appId: "1:743112147824:web:bb1951e426848d796445b5",
  measurementId: "G-RFNPR9ZDDQ"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();