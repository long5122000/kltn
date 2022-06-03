import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCLdtBSKLczw78PhnebmE7OjrB6yapZK9M",
  authDomain: "kltn-e2f17.firebaseapp.com",
  projectId: "kltn-e2f17",
  storageBucket: "kltn-e2f17.appspot.com",
  messagingSenderId: "2376285238",
  appId: "1:2376285238:web:e19ae67e80fe223b09ec97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
