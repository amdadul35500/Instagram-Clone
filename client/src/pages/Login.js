import axios from "axios";
import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const SignUp = () => {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setCurrentUser } = useGlobalContext();

  const formHandle = async (e) => {
    e.preventDefault();
    const userInfo = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        "https://instagram--api.herokuapp.com/api/auth/login",
        userInfo
      );
      setCurrentUser(res.data);
      navigate("/");
    } catch (error) {
      if (error.response.data === "Email is not valid!") {
        setPasswordError(null);
        setEmailError(error.response.data);
      } else {
        setEmailError(null);
        setPasswordError(error.response.data);
      }

      console.log(error.response);
    }
  };

  return (
    <>
      <div style={{ background: "#f8f9fa !important" }}>
        <div className="signup-box">
          <img src="./images/instragram_logo.png" alt="img" />
          <form onSubmit={formHandle} className="input-fild">
            <input type="text" placeholder="Email" required ref={emailRef} />
            <p>{emailError}</p>
            <input
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <p>{passwordError}</p>
            <button type="submit" style={{ marginTop: "20px" }}>
              Log In
            </button>
          </form>
          <hr /> <span className="or">OR</span> <hr />
          <NavLink to="/signup">
            <button>Sign Up</button>
          </NavLink>
          <h4>Forgot password</h4>
        </div>
      </div>
    </>
  );
};

export default SignUp;
