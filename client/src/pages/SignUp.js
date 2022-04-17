import React, { useState, useRef } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [emailError, setEmailError] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const formHandle = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;

    const userInfo = {
      userName,
      email,
      password,
    };
    try {
      const res = await axios.post(
        "https://instagram--api.herokuapp.com/api/auth/register",
        userInfo
      );
      navigate("/login");
    } catch (error) {
      if (error.response.data.email) {
        setEmailError(error.response.data.email.msg);
      }
      if (error.response.data.userName) {
        setUserNameError(error.response.data.userName.msg);
      }
      if (error.response.data.password) {
        setPasswordError(error.response.data.password.msg);
      }
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div style={{ background: "#f8f9fa !important" }}>
        <div className="signup-box">
          <img src="./images/instragram_logo.png" alt="img" />
          <h2>
            Sign up to see photos and videos <br /> from your friends.
          </h2>
          <button>
            <span style={{ marginRight: "8px" }}>
              <FacebookIcon />
            </span>
            Log in with Facebook
          </button>
          <hr /> <span className="or">OR</span> <hr />
          <form onSubmit={formHandle} className="input-fild">
            <input type="text" placeholder="Email" required ref={emailRef} />
            <p>{emailError}</p>
            <input
              type="text"
              placeholder="Username"
              required
              ref={userNameRef}
            />
            <p>{userNameError}</p>
            <input
              type="password"
              max="6"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <p>{passwordError}</p>
            <button type="submit" style={{ marginTop: "20px" }}>
              Sign Up
            </button>
          </form>
          <NavLink to="/login">
            <h3>Log In</h3>
          </NavLink>
          <h4>
            By signing up, you agree to our Terms , Data <br /> Policy and
            Cookies Policy .
          </h4>
        </div>
      </div>
    </>
  );
};

export default SignUp;
