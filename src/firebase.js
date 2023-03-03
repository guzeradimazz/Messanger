import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtNhg3ZTpKWc9DvL3qwznHeVX5mkX_D8w",
  authDomain: "messanger-271fa.firebaseapp.com",
  projectId: "messanger-271fa",
  storageBucket: "messanger-271fa.appspot.com",
  messagingSenderId: "706972794767",
  appId: "1:706972794767:web:3b3b9ea583610eb0c5d5fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
