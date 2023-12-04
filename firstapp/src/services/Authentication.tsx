import React from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwhdM4kg63HhUXUTKvXopb1vJRsL_THEM",
  authDomain: "wales-813d9.firebaseapp.com",
  projectId: "wales-813d9",
  storageBucket: "wales-813d9.appspot.com",
  messagingSenderId: "651931789932",
  appId: "1:651931789932:web:f456a9bbdf92919004c649",
  measurementId: "G-497DSHHEQD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
const auth = getAuth();

const AuthService = {
  registerUser: function (email: string, pass: string) {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  signinUser: function (email: string, pass: string) {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default AuthService;
