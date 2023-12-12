import { createContext, useState } from "react";
import AuthService from "./services/Authentication";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [pageName, setPageName] = useState();

  const IsMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      return true
    }
    return false
  }

  const CreateUser = async (email, pass) => {
    AuthService.registerUser(email, pass).then(_ =>{
      sessionStorage.setItem('userLoggedin','true')
      setisLoggedIn(true)
      // console.log("user created");
    }).catch((error => {
      alert(error.message)
      // console.log(error);
    }));
  }

  const SignInUser = async (email, pass) => {
    AuthService.signinUser(email, pass).then(_ => {
      sessionStorage.setItem('userLoggedin','true');
      setisLoggedIn(true);
      // console.log("userSigned IN");
    }).catch((error) => {
      alert(error.message)
    });
  }

  const SignoutUser = async () => {
    AuthService.signOutUser().then(_ => {
      sessionStorage.setItem('userLoggedin','false');
      setisLoggedIn(false);
      // console.log("userSigned OUT");
    }).catch((error) => {
      alert(error.message)
    });
  }


  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setisLoggedIn,
        IsMobile,
        CreateUser,
        SignInUser,
        SignoutUser,
        pageName,
        setPageName
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;