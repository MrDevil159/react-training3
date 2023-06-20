import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = ({ setIsLoggedIn, setError, error }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.msg) {
      setError(location.state.msg); 
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      console.log(response.data);
      e.preventDefault();
      setUsername(response.data.username);
      const obj = { _id:response.data._id, username: response.data.username, email: response.data.email };
      setIsLoggedIn(true);
      localStorage.setItem("token", JSON.stringify(obj));
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      setError("Invalid email or password"); // Set the error message

    }
  };

  return (
    <>
    
      <form onSubmit={handleLogin}>
        <div className="bg-danger form-group text-center">
        {error && <p className="error">{error}</p>} {/* Render the error message */}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-1">
          Submit
        </button>
        <Link to="/Register"><button className="btn btn-primary ms-2 mt-1">Signup</button></Link>
      </form>
    </>
  );
};

export default Login;
