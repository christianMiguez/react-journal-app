import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
	
	// GET FROM FIREBASE
	  apiKey: "",
	  authDomain: "",
	  projectId: "",
	  storageBucket: "",
	  messagingSenderId: "",
	  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore(app);
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}
