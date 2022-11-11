import React from 'react';
import logo from './logo.svg';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4JGoVpXJOzK0hynV2spYUHuHoJC6cATs",
  authDomain: "tv-maze-app-pietro-milanese.firebaseapp.com",
  databaseURL: "https://tv-maze-app-pietro-milanese-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tv-maze-app-pietro-milanese",
  storageBucket: "tv-maze-app-pietro-milanese.appspot.com",
  messagingSenderId: "622772533009",
  appId: "1:622772533009:web:7f3c0789d901f672d4beb0",
  measurementId: "G-2QBMKJTD4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



function App() {
  return (
    <h1 className="text-3xl font-bold underline">CIAO FUCKING WORLD</h1>
  );
}

export default App;
