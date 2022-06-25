import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyCLdtBSKLczw78PhnebmE7OjrB6yapZK9M",
//   authDomain: "kltn-e2f17.firebaseapp.com",
//   projectId: "kltn-e2f17",
//   storageBucket: "kltn-e2f17.appspot.com",
//   messagingSenderId: "2376285238",
//   appId: "1:2376285238:web:e19ae67e80fe223b09ec97",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCMPoAg7W6TFvUfcEz7NwToIOxwtLYyukE",
  authDomain: "kltn-6245e.firebaseapp.com",
  projectId: "kltn-6245e",
  storageBucket: "kltn-6245e.appspot.com",
  messagingSenderId: "94368579370",
  appId: "1:94368579370:web:c42cd3ac114eae77306853",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
