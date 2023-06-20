import React from 'react';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom'
const Layout = ({ search, setSearch, navigate, setIsLoggedIn, setError }) => {
  return (
    <div className="App">
      <Nav search={search} setSearch={setSearch} navigate={navigate} setIsLoggedIn={setIsLoggedIn} setError={setError}/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;


