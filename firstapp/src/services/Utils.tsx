import AuthService from "../services/Authentication";

const UtilService = {
  isMobile: function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      return true
    }
  },

  createUser: async function (email: string, pass: string){
    AuthService.registerUser(email, pass);
    console.log("user created");
  },

  signInUser: async function (email: string, pass: string){
    AuthService.signinUser(email, pass);
    console.log("userSigned IN");
  }
}

export default UtilService