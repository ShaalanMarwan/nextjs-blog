import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDm6KFJroBJPAAgFj6f7n-MEd6CjfFVca0",
  authDomain: "nextjs-blog-sm.firebaseapp.com",
  projectId: "nextjs-blog-sm",
  storageBucket: "nextjs-blog-sm.appspot.com",
  messagingSenderId: "635395999695",
  appId: "1:635395999695:web:6cdc0136c872ec070cb4ba",
  measurementId: "G-CPGKQ7E53H",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
