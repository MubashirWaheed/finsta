// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_7Akm3l6MAcu2fGrhOQp_wJQryg7r6T0",
  authDomain: "finsta-58c2b.firebaseapp.com",
  projectId: "finsta-58c2b",
  storageBucket: "finsta-58c2b.appspot.com",
  messagingSenderId: "713177366666",
  appId: "1:713177366666:web:4f4b6c4b960148108a6d73",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
