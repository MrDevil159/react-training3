import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ search, setSearch, navigate, setIsLoggedIn, setError }) => {
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setError('Logged Out!')
        navigate('/')
        
      };
      const [name, setName] = useState("");
      useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token && token._id && token.username) {
          const username = token.username;
          setName(username);
        }
      }, []);
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="about">About</Link></li>
                <li><Link onClick={logout}>Logout</Link></li>
                <li>Welcome Back, {name}</li>
            </ul>
        </nav>
    )
}

export default Nav;
