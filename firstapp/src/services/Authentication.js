import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
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
    return createUserWithEmailAndPassword(auth, email, pass);
  },

  updateUser: function () {
    return updateProfile();
  },

  signinUser: function (email, pass) {
    return signInWithEmailAndPassword(auth, email, pass);
  },

  signOutUser: function () {
    return signOut(auth);
  },

  // download: function () {
  //   products.forEach((item) => {
  //     const myPicks = ref(storage, item.name + "/");
  //     var imagelist = [];
  //     listAll(myPicks)
  //       .then(async (res) => {
  //         const { items } = res;
  //         items.map(async (items) => {
  //           await getDownloadURL(items).then(res => {
  //             imagelist.push(res)
  //           }).then(() => {
  //             if (imagelist.length > 3) {
  //               item.images = imagelist
  //               ApiService.addProducts(item)
  //             }
  //           })
  //         })
  //         console.log(item)
  //       })
  //       .catch((error) => {
  //         // Uh-oh, an error occurred!
  //       });
  //   });
  // },
};

export default AuthService;
