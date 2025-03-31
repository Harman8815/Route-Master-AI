// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw3xcwoWOJ2PMx89ZA1nioaqSB1yUXvpE",
  authDomain: "routematter-ai-trip-planner.firebaseapp.com",
  projectId: "routematter-ai-trip-planner",
  storageBucket: "routematter-ai-trip-planner.appspot.com",  // ✅ Fixed typo
  messagingSenderId: "914085044033",
  appId: "1:914085044033:web:5572afd1512c52746c4bc0",
  measurementId: "G-WTNNNBYWVG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
