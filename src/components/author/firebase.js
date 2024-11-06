// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD80_f47Gv3mLQ-8EM7bjXx2NajztzRmS8",
  authDomain: "movie-api-ad771.firebaseapp.com",
  projectId: "movie-api-ad771",
  storageBucket: "movie-api-ad771.appspot.com",
  messagingSenderId: "996656760250",
  appId: "1:996656760250:web:91a3821778a972ed040983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
//add to favourites-firestore-movies+
//login,signup (back)+
