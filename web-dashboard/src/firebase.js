// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm56vmSjWUqzroqNq_V8ofyjmspWeEuUY",
  authDomain: "restuarant-app-f79ed.firebaseapp.com",
  projectId: "restuarant-app-f79ed",
  storageBucket: "restuarant-app-f79ed.firebasestorage.app",
  messagingSenderId: "670960659056",
  appId: "1:670960659056:web:13e18b94e50f56489be2b5",
  measurementId: "G-L5Z4K250ES"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);