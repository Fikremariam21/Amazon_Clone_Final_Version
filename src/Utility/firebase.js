import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB2i8dRMwHg6uOQ6QiKw-d4N2M2IuIoMs",
  authDomain: "clone-3147d.firebaseapp.com",
  projectId: "clone-3147d",
  storageBucket: "clone-3147d.firebasestorage.app",
  messagingSenderId: "35126180913",
  appId: "1:35126180913:web:da8ccefe263fecb9b7e910"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
export const storage = app.storage();

