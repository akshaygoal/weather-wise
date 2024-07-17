

import React, { useState } from "react";
import "./LoginForm.css";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (
      loggedUser &&
      input.email === loggedUser.email &&
      input.password === loggedUser.password
    ) {
      localStorage.setItem("loggedin",true)
      navigate("/home");
    } else {
      alert("Wrong Email or Password");
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="inputbox">
            <input
              name="email"
              value={input.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="inputbox">
            <input
              name="password"
              value={input.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="remeberforgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>

          <div className="registerlink">
            <p>
              Don't have an account?
              <Link to="/">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
