import { createContext, useState } from "react";
import AuthService from "./services/Authentication";
import { useDispatch } from "react-redux";
import { login } from "../src/features/userSlice";
import ApiService from "./services/ApiService";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  // const [isLoggedIn, setisLoggedIn] = useState();
  const [pageName, setPageName] = useState();
  const [productConfig, setProductConfig] = useState({});
  const dispatch = useDispatch();

  const IsMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    }
    return false;
  };

  const userAuth = () => {
    dispatch(login(sessionStorage.getItem("user")));
  };

  const CreateUser = async (name, email, pass) => {
    AuthService.registerUser(email, pass)
      .then((res) => {
        var payload = {
          _id: res.user?.uid,
          fullName: name,
          emailId: res.user?.email,
        };
        dispatch(
          login(payload)
        );
        ApiService.addUser(payload)
          .then((_) => {
            sessionStorage.setItem("userLoggedin", "true");
            sessionStorage.setItem("user", JSON.stringify(payload));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        alert(error.message);
        // console.log(error);
      });
  };

  const SignInUser = async (email, pass) => {
    AuthService.signinUser(email, pass)
      .then((res) => {
        var payload = {
          _id: res.user?.uid,
          fullName: res.user.displayName,
          emailId: res.user?.email,
        };
        sessionStorage.setItem("userLoggedin", "true");
        sessionStorage.setItem("user", JSON.stringify(payload));
        // console.log("userSigned IN");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const SignoutUser = async () => {
    AuthService.signOutUser()
      .then((_) => {
        sessionStorage.setItem("userLoggedin", "false");
        sessionStorage.removeItem("user");
        // console.log("userSigned OUT");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        IsMobile,
        CreateUser,
        SignInUser,
        SignoutUser,
        pageName,
        setPageName,
        productConfig,
        setProductConfig,
        userAuth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
