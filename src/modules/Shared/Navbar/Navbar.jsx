import React, { useContext, useEffect, useState } from "react";
import emptyImg from "./../../../assets/no-user.png";
import {
  imgBaseUrl,
  privateAxiosInstance,
  USERS_URLS,
} from "../../../services/urls";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState({});

  let getCurrentUser = async () => {
    try {
      let response = await privateAxiosInstance.get(USERS_URLS.CURRENT_USER);
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-4 mb-3 p-0">
        <div className="container-fluid">
          <div className="ms-auto" id="navbarSupportedContent ">
            <ul className="navbar-nav p-0 ">
              <li className="nav-item d-flex mx-2 gap-1 justify-content-center align-items-center">
                <a className="nav-link email" href="/home/profile">
                <img
                  src={
                    currentUser?.imagePath
                      ? imgBaseUrl + currentUser?.imagePath
                      : emptyImg
                  }
                  className="h-100 rounded-circle"
                />
                  <span>
                  {JSON.parse(localStorage.getItem("loginData"))?.userName}
                  </span>
                </a>
              </li>
              {/* <li className="nav-item mx-2 collapse navbar-collapse">
                <a className="nav-link" href="#">
                  <i className="fa-solid fa-caret-down"></i>
                </a>
              </li> */}
              <li className="nav-item mx-2 collapse navbar-collapse">
                <a className="nav-link position-relative" href="#">
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
