// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm56vmSjWUqzroqNq_V8ofyjmspWeEuUY",
  authDomain: "restuarant-app-f79ed.firebaseapp.com",
  projectId: "restuarant-app-f79ed",
  storageBucket: "restuarant-app-f79ed.firebasestorage.app",
  messagingSenderId: "670960659056",
  appId: "1:670960659056:web:13e18b94e50f56489be2b5",
  measurementId: "G-L5Z4K250ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Only initialize analytics if running on web
if (typeof window !== 'undefined') {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  });
}