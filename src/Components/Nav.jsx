import React, { useEffect, useState } from 'react';
import { Link, useLocation  } from 'react-router-dom';

const Nav = ({ search, setSearch, navigate, setIsLoggedIn, setError }) => {
    const logout = () => {
        sessionStorage.removeItem('token');
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
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (token && token._id && token.username) {
          const username = token.username;
          setName(username);
        }
      }, []);
    return (
<nav class="navbar navbar-expand-lg bg-body-tertiary mb-5">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Simple Blog</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="post">New Post</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="about">About</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome, {name}
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" onClick={logout}>Logout</Link></li>
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
