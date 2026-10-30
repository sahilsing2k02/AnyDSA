import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj8KGhhOWdn7qq_1Y-Vizs65C83Fr-fbU",
  authDomain: "anydsa-82acd.firebaseapp.com",
  projectId: "anydsa-82acd",
  storageBucket: "anydsa-82acd.firebasestorage.app",
  messagingSenderId: "900129433019",
  appId: "1:900129433019:web:32c506ac1d5f9fda1f509e",
  measurementId: "G-C84SWLPWE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
