import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

//STORED THE FIREBASE DETAILS IN .env.local FILE

const firebaseConfig = {
  apiKey: "AIzaSyABzSU84yO8IKhYuz3strM9oltq4QV2MI4",
  authDomain: "vitaindia-e3eab.firebaseapp.com",
  projectId: "vitaindia-e3eab",
  storageBucket: "vitaindia-e3eab.appspot.com",
  messagingSenderId: "840330575906",
  appId: "1:840330575906:web:9cdd7d6d6649c42cca8a7b"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;

