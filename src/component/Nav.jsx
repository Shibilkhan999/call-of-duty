import React, { useState } from "react";
import "../component/Nav.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Call_of_Duty_2023_logo.svg"
          alt="Call of Duty Logo"
          className="logo-image"
        />
      </div>
      
      <div className="menu-container">
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>
        
        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li><a href="#" onClick={toggleMenu}>GAMES</a><span className="dropdown">+</span></li>
          <li><a href="#" onClick={toggleMenu}>NEWS</a><span className="dropdown">+</span></li>
          <li><a href="#" onClick={toggleMenu}>STORE</a></li>
          <li><a href="#" onClick={toggleMenu}>ESPORTS</a><span className="dropdown">+</span></li>
          <li><a href="#" onClick={toggleMenu}>SUPPORT</a></li>
          <li><a href="#" onClick={toggleMenu}>XBOX GAME PASS</a></li>
          <li><Link to={"/signup"} onClick={toggleMenu}>SIGNUP</Link></li>
          <li><Link to={"/login"} onClick={toggleMenu}>LOGIN</Link></li>
        </ul>
      </div>
      
      <div className="cta-button">
        <a href="#">GET BLACK OPS 6</a>
      </div>
    </nav>
  );
};

export default Navbar;


// import React, { useState } from "react";
// import "../component/Nav.css";
// import { Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  // const closeMenu = () => {
  //   setMenuOpen(false);
  // };

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Call_of_Duty_2023_logo.svg"
//           alt="Call of Duty Logo"
//           className="logo-image"
//         />
//       </div>

      
//       <div className="menu-icon" onClick={toggleMenu}>
//         {menuOpen ? <FiX className="icon close-icon" /> : <FiMenu className="icon" />}
//       </div>

      
//       <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
//         <li><a href="#" onClick={closeMenu}>Games</a><span className="dropdown">+</span></li>
//         <li><a href="#" onClick={closeMenu}>News</a><span className="dropdown">+</span></li>
//         <li><a href="#" onClick={closeMenu}>Store</a></li>
//         <li><a href="#" onClick={closeMenu}>Esports</a><span className="dropdown">+</span></li>
//         <li><a href="#" onClick={closeMenu}>Support</a></li>
//         <li><a href="#" onClick={closeMenu}>Xbox Game Pass</a></li>
//         <li><Link to={"/signup"} onClick={closeMenu}>Signup</Link></li>
//         <li><Link to={"/login"} onClick={closeMenu}>Login</Link></li>
//       </ul>

      
//       <div className="cta-button">
//         <a href="#">Get Black Ops 6</a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

