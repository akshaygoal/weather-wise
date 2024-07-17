
import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>CREATE AN ACCOUNT</h1>
          <div className="inputbox">
            <input
              name="name"
              value={input.name}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              required
            />
            <FaUser className="icon" />
          </div>
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

          <div className="rememberforgot">
            <label>
              <input type="checkbox" />
              I agree to the terms & conditions
            </label>
          </div>

          <button type="submit">Register</button>

          <div className="registerlink">
            <p>
              Already have an account?
              <Link to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
