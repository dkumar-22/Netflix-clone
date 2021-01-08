import React, {useState,useEffect} from 'react'
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        // do this
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        if (window.scrollY < 100) {
          // do this
          handleShow(false);
        } else handleShow(true);
      });
    };
  });
    return (
        <div className={`nav ${show && "nav-scroll"}`}>
            <img className="nav-logo" src="https://cutt.ly/GjktD5I" alt="Netflix Logo" />
            
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatar" className="nav-avatar"/>
        </div>
    )
}

export default Nav
