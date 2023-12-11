import { useState } from "react";

import "./LoginDialog.scss";

import Utils from "../../services/Utils";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
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


function LoginDialog() {

  // useEffect(() => {
  //   if (isLoggedin) {
  //     setIsLoggedIn(isLoggedin);
  //   }
  
  // }, [])
  

  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState();
  const [formType, setFormtype] = useState(false);
  const [inputValues, setInputValues] = useState({
    emailId: "",
    password: "",
    confirmPassword: "",
  });
  const [inputv, setInput] = useState([
    {
      id: 1,
      name: "emailId",
      errorMessage: "",
      required: true,
      error: false,
      pattern: true,
      regex: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    },
    {
      id: 2,
      name: "password",
      errorMessage: "",
      required: true,
      error: false,
      pattern: true,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
    },
    {
      id: 3,
      name: "confirmPassword",
      errorMessage: "",
      required: true,
      error: false,
      pattern: true,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
    },
  ]);

  const createUser = async () => {
    formType
      ? Utils.createUser(inputValues.emailId, inputValues.password)
      : Utils.signInUser(inputValues.emailId, inputValues.password);
    // if (Variables.isloggedin) {
    //   setDialogOpen(false);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    setIsFormValid(validate(inputv, e.target));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const openDialog = () => setDialogOpen(!dialogOpen);

  const validate = (inputv, value) => {
    var noError;
    inputv.map((input) => {
      if (value.name === input.name && input.name === "confirmPassword") {
        if (inputValues.password !== value.value) {
          setInput((prevState) => {
            const temp = [...prevState];
            temp.map((item) => {
              if (item.name === "confirmPassword") {
                return (
                  (item.errorMessage = "passwords do not match"),
                  (item.error = true)
                );
              }
            });
            return temp;
          });
          noError = false;
        }
      }
      if (value.name === input.name) {
        if (input.required && !value.value) {
          setInput((prevState) => {
            const temp = [...prevState];
            temp.map((item) => {
              if (item.name === input.name) {
                return (
                  (item.errorMessage = input.name + " is required."),
                  (item.error = true)
                );
              }
            });
            return temp;
          });
          noError = false;
        } else if (input.pattern && !input.regex.test(value.value)) {
          setInput((prevState) => {
            const temp = [...prevState];
            temp.map((item) => {
              if (item.name === input.name) {
                return (
                  (item.errorMessage = "Please enter valid " + input.name),
                  (item.error = true)
                );
              }
            });
            return temp;
          });
          noError = false;
        } else {
          setInput((prevState) => {
            const temp = [...prevState];
            temp.map((item) => {
              if (item.name === input.name) {
                return (item.errorMessage = ""),(item.error = false);
              }
            });
            return temp;
          });
          noError = true;
        }
      }
    });
    return noError;
  };

  const loginScreen = (
    <div>
      <div className="title">{formType ? "Register" : "Login"}</div>
      <div className="authformgroup">
        <FormControl className="emailId">
          <InputLabel htmlFor="emailId">EmailId</InputLabel>
          <OutlinedInput
            id="emailId"
            label="emailId"
            type="text"
            error={inputv[0].error}
            name="emailId"
            value={inputValues.emailId}
            onChange={handleChange}
            onBlur={handleChange}
          />
          <span className="errorMessage">{inputv[0].errorMessage}</span>
        </FormControl>
        <FormControl className="password">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            label="password"
            value={inputValues.password}
            error={inputv[1].error}
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
          <span className="errorMessage">{inputv[1].errorMessage}</span>
        </FormControl>
        {formType && (
          <FormControl className="password">
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              value={inputValues.confirmPassword}
              error={inputv[2].error}
              type="password"
              onBlur={handleChange}
              onChange={handleChange}
            />
            <span className="errorMessage">{inputv[2].errorMessage}</span>
          </FormControl>
        )}
        <div className="remembrpass">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          {!formType && <div className="forgotpass">Forgot Password?</div>}
        </div>
        <div className="submitbutton">
          <Button
            type="submit"
            onClick={createUser}
            variant="contained"
            disabled={
              !inputValues.emailId ||
              !inputValues.password ||
              (!inputValues.confirmPassword && formType) ||
              !isFormValid
            }
          >
            {formType ? "Register" : "Login"}
          </Button>
        </div>
        <div className="register">
          {formType ? "Already have an account?" : "Don't have an account?"}
          <div
            className="registerbutton"
            onClick={(_) => setFormtype(!formType)}
          >
            {formType ? "Login" : "Register"}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="sidebarprofile" onClick={openDialog}>
        <AccountCircleIcon fontSize="large" />
      </div>
      <Dialog maxWidth="lg" open={dialogOpen}>
        <div className="close" onClick={openDialog}>
          close
        </div>
        <div className="authform">{loginScreen}</div>
      </Dialog>
    </div>
  );
}

export default LoginDialog;
