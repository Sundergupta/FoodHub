// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6BRiWOPoSKA6K1_8rIXxFRqT0nwOYl4c",
    authDomain: "foodhub-5e3a1.firebaseapp.com",
    projectId: "foodhub-5e3a1",
    storageBucket: "foodhub-5e3a1.appspot.com",
    messagingSenderId: "629293605065",
    appId: "1:629293605065:web:c59ff00e6efc1e47b2ad18",
    measurementId: "G-VZETQ3GTDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
