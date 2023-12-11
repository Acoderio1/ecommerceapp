// import { error } from "console";
import AuthService from "./Authentication";

const UtilService = {
  isMobile: function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      return true
    }
  },

  createUser: async function (email, pass){
    AuthService.registerUser(email, pass).then(_ =>{
      sessionStorage.setItem('userLoggedin','true')
      console.log("user created");
    }).catch((error => {
      alert(error.message)
      console.log(error);
    }));
  },

  signInUser: async function (email, pass){
    AuthService.signinUser(email, pass);
    sessionStorage.setItem('userLoggedin','true')
    console.log("userSigned IN");
  },

  signoutUser: async function() {
    AuthService.signOutUser();
    sessionStorage.setItem('userLoggedin','false')
    console.log("userSigned OUT");
  }
}

export default UtilService