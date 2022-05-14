import React, { useState, useEffect } from "react";
import { useAuth } from "../context/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/login.css";

function Login() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { loginHandler, token } = useAuth();

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [token]);

  function guestLogin() {
    setLoginDetails({
      email: "adarshbalika@gmail.com",
      password: "adarshBalika123",
    });
    loginHandler(loginDetails.email, loginDetails.password);
  }

  return (
    <>
      <form
        action="submit"
        className="login-container"
        onSubmit={(e) => {
          e.preventDefault();
          loginHandler(loginDetails.email, loginDetails.password);
        }}
      >
        <div className="login-card">
          <div className="logo-img-wrapper">
            {" "}
            <img src="logo.png" alt="logo"/>
          </div>
          <h1 className="login-title">Takenote</h1>
          <p className="login-sub-title">Login to continue</p>
          <div className="input-container">
            <label for="email">Email</label>
            <input
              className="input input-primary"
              type="text"
              placeholder="Type Email"
              id="email"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
            />
            <label for="Password">Password</label>
            <input
              className="input input-primary"
              type="password"
              placeholder="Type Password"
              id="password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
            <a href="../">Forgot password?</a>
          </div>
          <div className="login-actions-wrapper">
            <button className="btn btn-secondary" type="submit">
              Login
            </button>
            <button className="btn btn-secondary" onClick={guestLogin}>
              Login as Guest
            </button>
          </div>
          <p className="no-account">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export { Login };
