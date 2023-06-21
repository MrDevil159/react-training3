import React, { useEffect, useState } from 'react';
import { Link, useLocation  } from 'react-router-dom';

const Nav = ({ search, setSearch, navigate, setIsLoggedIn, setError }) => {
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setError('Logged Out!')
        navigate('/')
        
      };
      const location = useLocation();
      const [path, setPath] = useState(window.location.pathname);
      const [name, setName] = useState("");
      useEffect(() => {
        setPath(location.pathname);
      }, [location]);

      useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token && token._id && token.username) {
          const username = token.username;
          setName(username);
        }
      }, []);
    return (
<nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Simple Blog</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="post">New Post</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome, {name}
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
          </ul>
        </li>


      </ul>

{path === '/' && (
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-2"
            id="search"
            type="text"
            placeholder="Search Posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      )}
    </div>
  </div>
</nav>




    )
}

export default Nav;
