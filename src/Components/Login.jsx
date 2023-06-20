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
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/login`, {
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
  
  <div class="container">
        <div class="card card-container">
            <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" class="profile-name-card">  {error && <p className="error">{error}</p>}</p>
            <form class="form-signin" onSubmit={handleLogin}>
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email"
    className="form-control"
    id="email"
    placeholder="Enter email"
    value={email}
    onChange={(e) => setEmail(e.target.value)} required autofocus/>
                <input type="password"
    className="form-control"
    id="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)} required/>

                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                <Link to="/Register"><button className="btn btn-lg btn-primary btn-block btn-signup">Signup</button></Link>

            </form>

        </div>
    </div>



    </>
  );
};

export default Login;
