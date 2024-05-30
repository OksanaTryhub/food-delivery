import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-delivery-mern.firebaseapp.com",
  projectId: "food-delivery-mern",
  storageBucket: "food-delivery-mern.appspot.com",
  messagingSenderId: "877073178166",
  appId: "1:877073178166:web:d011fb02e1a2bb3be74297",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
