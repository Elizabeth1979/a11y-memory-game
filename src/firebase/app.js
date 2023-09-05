// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbxHGO3Fn42b5QKPn0Y1W8T8n-Wf9Wdj0",
  authDomain: "a11y-booth.firebaseapp.com",
  databaseURL: "https://a11y-booth-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "a11y-booth",
  storageBucket: "a11y-booth.appspot.com",
  messagingSenderId: "566259137822",
  appId: "1:566259137822:web:acaa1012f8e3c75181dd0f",
  measurementId: "G-EJKHQB91XP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
