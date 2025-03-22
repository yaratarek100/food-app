import React, { useContext, useEffect, useState } from "react";
import navImg from "../../../assets/user.png";
import { imgBaseUrl, privateAxiosInstance, USERS_URLS } from "../../../services/urls";
// import { LoginDataContext } from "../../../context/LoginDataContext";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState({});

  let getCurrentUser = async () => {
    try {
      let response = await privateAxiosInstance.get(USERS_URLS.CURRENT_USER);
      console.log(response);
      setCurrentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-4 mb-3">
        <div className="container-fluid">
         
          <div className="ms-auto" id="navbarSupportedContent ">
            <ul className="navbar-nav  mb-2 mb-lg-0 ">
              <li className="nav-item d-flex mx-2 gap-1 justify-content-center align-items-center">
                <img
                  src={
                    currentUser?.imagePath
                      ? imgBaseUrl + currentUser?.imagePath
                      : navImg
                  }
                  className="h-100 rounded-circle"
                />
                <a className="nav-link email" href="#">
                  {JSON.parse(localStorage.getItem("loginData"))?.userEmail}
                </a>
              </li>
              <li className="nav-item mx-2 collapse navbar-collapse">
                <a className="nav-link" href="#">
                  <i className="fa-solid fa-caret-down"></i>
                </a>
              </li>
              <li className="nav-item mx-2 collapse navbar-collapse">
                <a className="nav-link position-relative" href="#">
                  <div id="bell d-none"> </div>
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
