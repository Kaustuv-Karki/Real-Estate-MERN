// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnZqHI5nhp4anodq3i3ghIgufZ7CnmR5o",
  authDomain: "mern-estate-a9e12.firebaseapp.com",
  projectId: "mern-estate-a9e12",
  storageBucket: "mern-estate-a9e12.appspot.com",
  messagingSenderId: "196370984318",
  appId: "1:196370984318:web:54ebe7ef255acc1da9172f",
  measurementId: "G-9JXGEH4JZ7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
