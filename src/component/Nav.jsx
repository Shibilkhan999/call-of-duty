import React from "react";
import "../component/Nav.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Call_of_Duty_2023_logo.svg"
          alt="Call of Duty Logo"
          className="logo-image"
        />
      </div>
      
      <ul className="nav-links">
        <li>
          <a href="#">Games</a>
          <span className="dropdown">+</span>
        </li>
        <li>
          <a href="#">News</a>
          <span className="dropdown">+</span>
        </li>
        <li>
          <a href="#">Store</a>
        </li>
        <li>
          <a href="#">Esports</a>
          <span className="dropdown">+</span>
        </li>
        <li>
          <a href="#">Support</a>
        </li>
        <li>
          <a href="#">Xbox Game Pass</a>
        </li>
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
      
      {/* <ul className="nav2">
      <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul> */}
      
      <div className="cta-button">
        <a href="#">Get Black Ops 6</a>
      </div>
    </nav>
  );
};

export default Navbar;
