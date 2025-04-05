import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_b9WhUnjbCdyz9XM-c8iX1fNRtg4hhdE",
  authDomain:  "stock-sphere-f0360.firebaseapp.com",
  projectId:  "stock-sphere-f0360",
  storageBucket:  "stock-sphere-f0360.firebasestorage.app",
  messagingSenderId:  "691104941409",
  appId:  "1:691104941409:web:752422cb0cc313323fb120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };