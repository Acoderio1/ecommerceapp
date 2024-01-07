import { useState, useContext, useEffect } from "react";

import "./LoginDialog.scss";
import GlobalContext from "../../GlobalContext";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  Dialog,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function LoginDialog() {
  const { CreateUser, SignInUser, userAuth, SignoutUser } = useContext(GlobalContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState();
  const [isRegister, setIsRegister] = useState();
  const user = useSelector(selectUser);
  const [inputValues, setInputValues] = useState({
    fullName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });

  const [inputconfig] = useState({
    fullName: {
      name: "fullName",
      errorMessage: "",
      required: true,
      error: false,
    },
    emailId: {
      name: "emailId",
      errorMessage: "",
      required: true,
      error: false,
      pattern: true,
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
      name: "password",
      errorMessage: "",
      required: true,
      error: false,
      pattern: true,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
    },
    confirmPassword: {
      name: "confirmPassword",
      errorMessage: "",
      required: true,
      error: false,
      pattern: true,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
    },
  });

  useEffect(() => {
    userAuth();
  }, []);

  const createUser = async () => {
    isRegister ? CreateUser(inputValues.fullName, inputValues.emailId, inputValues.password) : SignInUser(inputValues.emailId, inputValues.password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    validate(e.target);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const openDialog = () => setDialogOpen(!dialogOpen);

  const validate = (value) => {
    Object.values(inputconfig).map((input) => {
      switch (true) {
        case input.name === "fullName" && value.name === "fullName":
          if (!value.value) {
            input.errorMessage = "Please enter valid email id";
            input.error = true;
            break;
          }
          input.errorMessage = "";
          input.error = false;
          break;
        case input.name === "emailId" && value.name === "emailId":
          if (!input.regex.test(value.value)) {
            input.errorMessage = "Please enter valid email id";
            input.error = true;
            setIsFormValid(false);
            break;
          }
          input.errorMessage = "";
          input.error = false;
          setIsFormValid(true);
          break;
        case input.name === "password" && value.name === "password":
          if (!input.regex.test(value.value)) {
            input.errorMessage = "Please enter valid password";
            input.error = true;
            setIsFormValid(false);
            break;
          }
          input.errorMessage = "";
          input.error = false;
          setIsFormValid(true);
          break;
        case input.name === "confirmPassword" &&
          value.name === "confirmPassword":
          if (inputValues.password !== value.value) {
            input.errorMessage = "Passwords don't match";
            input.error = true;
            setIsFormValid(false);
            break;
          }
          input.errorMessage = "";
          input.error = false;
          setIsFormValid(true);
          break;
        default:
      }
    });
  };

  const loginScreen = (
    <div>
      <div className="title">{isRegister ? "Register" : "Login"}</div>
      <div className="authformgroup">
        {isRegister && (
          <FormControl className="fullName">
            <InputLabel htmlFor="fullName">Full Name</InputLabel>
            <OutlinedInput
              id="fullName"
              label="fullName"
              type="text"
              error={inputconfig.fullName.error}
              name="fullName"
              value={inputValues.fullName}
              onChange={handleChange}
              onBlur={handleChange}
            />
            <span className="errorMessage">
              {inputconfig.fullName.errorMessage}
            </span>
          </FormControl>
        )}
        <FormControl className="emailId">
          <InputLabel htmlFor="emailId">Email Id</InputLabel>
          <OutlinedInput
            id="emailId"
            label="emailId"
            type="text"
            error={inputconfig.emailId.error}
            name="emailId"
            value={inputValues.emailId}
            onChange={handleChange}
            onBlur={handleChange}
          />
          <span className="errorMessage">
            {inputconfig.emailId.errorMessage}
          </span>
        </FormControl>
        <FormControl className="password">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            label="password"
            value={inputValues.password}
            error={inputconfig.error}
            type={showPassword ? "text" : "password"}
            onBlur={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleChange}
          />
          <span className="errorMessage">
            {inputconfig.password.errorMessage}
          </span>
        </FormControl>
        {isRegister && (
          <FormControl className="password">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              value={inputValues.confirmPassword}
              error={inputconfig.error}
              type="password"
              onBlur={handleChange}
              onChange={handleChange}
            />
            <span className="errorMessage">
              {inputconfig.confirmPassword.errorMessage}
            </span>
          </FormControl>
        )}
        <div className="remembrpass">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          {!isRegister && <div className="forgotpass">Forgot Password?</div>}
        </div>
        <div className="submitbutton">
          <Button
            type="submit"
            onClick={createUser}
            variant="contained"
            disabled={
              !inputValues.emailId ||
              !inputValues.password ||
              (!inputValues.confirmPassword && isRegister) ||
              !isFormValid
            }
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </div>
        <div className="register">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <div
            className="registerbutton"
            onClick={(_) => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </div>
        </div>
      </div>
    </div>
  );

  const profileScreen = (
    <div>
      <div className="title">Profile</div>
      <div className="profilewrapper">
        <div className="profileicon"></div>
        <div className="logout">
          <Button
            className="logout"
            onClick={SignoutUser}
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="sidebarprofile" onClick={openDialog}>
        <AccountCircleIcon className="profileIcon" fontSize="large" />
      </div>
      <Dialog maxWidth="lg" open={dialogOpen}>
        <div className="close" onClick={openDialog}>
          <CloseIcon>close</CloseIcon>
        </div>
        <div className="authform">{user ? profileScreen : loginScreen}</div>
      </Dialog>
    </div>
  );
}

export default LoginDialog;
