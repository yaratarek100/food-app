import React, { useContext, useEffect } from "react";
import navImg from '../../../assets/Ellipse 235.svg'
// import { LoginDataContext } from "../../../context/LoginDataContext";

export default function Navbar() {


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-4 mb-3" >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             
              <li className="nav-item d-flex mx-2 gap-1">
                <img src={navImg} />
                <a className="nav-link" href="#">
                  {JSON.parse(localStorage.getItem("loginData"))?.userEmail}
                </a>
              </li>
              <li className="nav-item mx-2">
              <a className="nav-link" href="#">
              <i className="fa-solid fa-caret-down"></i>
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link position-relative"  href="#">
                  <div id="bell d-none">     </div>
                <i className="fa-solid fa-bell " id="bell-d"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
