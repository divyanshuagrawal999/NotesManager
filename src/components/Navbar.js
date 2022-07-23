import React from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import{
  Link
}from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  
  const handlelogout = () =>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();
  React.useEffect(()=>{
    // ga.send(["pageview",location.pathname]);
    console.log(location.pathname);
  },[location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">

    <Link className="navbar-brand" to="/">iNoteBook</Link>


    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">


        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} to="/" >Home</Link>
        </li>

        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
        </li>

       {/* Disabled link */}
       {/* <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}


      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">signup</Link>
      </form>:<button onClick={handlelogout} className = "btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar