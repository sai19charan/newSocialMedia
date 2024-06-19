import "./login.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { CircularProgress } from "@mui/material";
// import CircularProgress from '@mui/material/CircularProgress';
import { loginCall } from "../../apiCalls";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialBuzz</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
            <input placeholder="Password" type="password" className="loginInput" ref={password} required/>
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                "Log in"
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                "Create a New Account"
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}