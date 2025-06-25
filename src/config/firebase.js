// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWwocPvJQdPc1JmeTkE8NeEEAIlpX70jM",
  authDomain: "coal-mine-breakdown-management.firebaseapp.com",
  projectId: "coal-mine-breakdown-management",
  storageBucket: "coal-mine-breakdown-management.firebasestorage.app",
  messagingSenderId: "124227564187",
  appId: "1:124227564187:web:f891d1ae87d1d6ae6dcc3e",
  measurementId: "G-8CXG8XDEH4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
