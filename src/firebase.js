// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Import Firebase Auth

const firebaseConfig = {
    apiKey: "AIzaSyC6BRiWOPoSKA6K1_8rIXxFRqT0nwOYl4c",
    authDomain: "foodhub-5e3a1.firebaseapp.com",
    projectId: "foodhub-5e3a1",
    storageBucket: "foodhub-5e3a1.firebasestorage.app",
    messagingSenderId: "629293605065",
    appId: "1:629293605065:web:c59ff00e6efc1e47b2ad18",
    measurementId: "G-VZETQ3GTDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Create auth instance

export { auth }; // ✅ Export it to use in your SignIn page
