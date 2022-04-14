import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ4XVS6JKSSYSanUGUl0ubndbd6P0w6j4",
  authDomain: "whatsapp-clone-3b283.firebaseapp.com",
  projectId: "whatsapp-clone-3b283",
  storageBucket: "whatsapp-clone-3b283.appspot.com",
  messagingSenderId: "867465673317",
  appId: "1:867465673317:web:8b36548e2104dd3c93e48c",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
