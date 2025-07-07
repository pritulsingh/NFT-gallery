// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDyUKYcrl7zNfQ_5KGY49BNrmzUDcfC7vI",
  authDomain: "nft-gallery-6d7b4.firebaseapp.com",
  projectId: "nft-gallery-6d7b4",
  storageBucket: "nft-gallery-6d7b4.appspot.com",
  messagingSenderId: "985459773211",
  appId: "1:985459773211:web:eb6d27f32d33999865cdbe",
  measurementId: "G-JF21FXLB8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
