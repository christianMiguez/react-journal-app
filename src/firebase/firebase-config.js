import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBwKuGQ0SwfaGvRrRF2anyB-ZO8gbSsihs",
  authDomain: "journalapp-aa6a7.firebaseapp.com",
  projectId: "journalapp-aa6a7",
  storageBucket: "journalapp-aa6a7.appspot.com",
  messagingSenderId: "857802182000",
  appId: "1:857802182000:web:e9d2adbcb9a91dab8053b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore(app);
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}