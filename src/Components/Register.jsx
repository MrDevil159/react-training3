import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
 console.log(        username,
    email,
    password);
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      console.log(response.data);
      setError('');
      navigate('/', {state: {msg: "Successfully Registered"}});
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.error);
    }
  };

  return (

<div className="container">
<div className="card card-container">
    <img id="profile-img" className="profile-img-card" alt="dummy pic" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
    <p id="profile-name" className="profile-name-card">  {error && <span>{error}</span>}</p>
    <form className="form-signin" onSubmit={handleRegister}>
        <span id="reauth-email" className="reauth-email"></span>
        <input type="text"
      className="form-control"
      id="username"
      placeholder="Enter username"
      value={username}
      onChange={(e) => setUsername(e.target.value)} required/>
              <input type="email"
      className="form-control"
      id="exampleInputEmail1"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password"
      className="form-control"
      id="exampleInputPassword1"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)} required/>
              <input type="password"
      className="form-control"
      id="exampleInputPassword2"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)} required/>

        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Register</button>
        <p id="profile-name" className="profile-name-card">Already Having an Account? </p>
        <Link to="/"><button className="btn btn-lg btn-primary btn-block btn-signup">Login</button></Link>

    </form>

</div>
</div>
  );
};

export default Register;
