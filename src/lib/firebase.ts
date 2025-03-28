import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCJbFWesbsiKwMDKIiXViMeakUBfw8OKc",
  authDomain:  "stocksp-c9aa5.firebaseapp.com",
  projectId:  "stocksp-c9aa5",
  storageBucket:  "stocksp-c9aa5.firebasestorage.app",
  messagingSenderId:  "1043014563460",
  appId:  "1:1043014563460:web:a2ab30bb5c09d2edfa34d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };