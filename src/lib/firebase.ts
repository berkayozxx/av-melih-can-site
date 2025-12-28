// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBd3MzwjcawvH9iiCJxOJ3GvfZc8NixO5E",
    authDomain: "melih-can-hukuk.firebaseapp.com",
    projectId: "melih-can-hukuk",
    storageBucket: "melih-can-hukuk.firebasestorage.app",
    messagingSenderId: "356237890728",
    appId: "1:356237890728:web:6c106c3c7463210e6d5e9d",
    measurementId: "G-LHXV1QJHCP"
};

// Initialize Firebase
// Using getApps() prevents re-initialization error in Next.js hot-reload / serverless
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
