// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWUuqi770r2vjmb3oolgRThlMVm46UbIs",
  authDomain: "docs-app-0986.firebaseapp.com",
  projectId: "docs-app-0986",
  storageBucket: "docs-app-0986.appspot.com",
  messagingSenderId: "892047225230",
  appId: "1:892047225230:web:011db9f2ae084d6b02f4df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;