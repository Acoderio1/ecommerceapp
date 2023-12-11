import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
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
  registerUser: function (email, pass) {
    return createUserWithEmailAndPassword(auth, email, pass)
  },

  signinUser: function (email, pass) {
    return signInWithEmailAndPassword(auth, email, pass)
  },

  signOutUser: function () {
    return signOut(auth)
  }
};

export default AuthService;
