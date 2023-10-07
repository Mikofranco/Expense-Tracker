// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB4ESX78TWEHRhODpotX6DHdq7QZ4gl8E",
  authDomain: "expense-tracker-b88f6.firebaseapp.com",
  projectId: "expense-tracker-b88f6",
  storageBucket: "expense-tracker-b88f6.appspot.com",
  messagingSenderId: "1075110952298",
  appId: "1:1075110952298:web:bdc39a8266fc5073aaf913"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()