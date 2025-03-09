import React from "react";

import usersImg from "./../../../assets/eating a variety of foods-amico.svg";
import homeImg from './../../../assets/Group 48102098.svg'

export default function Header({ home, title, titleSpan }) {
  let userEmail = localStorage.getItem("loginData").userName;

  return (
    <div className="headerDiv d-flex w-100 rounded-4 align-items-center  justify-content-between">
      {home ? (
        <div className="leftSide w-50  text-white">
        <h2 className="h1 ">
          {title}
          <span>     
            {`${JSON.parse(localStorage.getItem("loginData"))?.userName} !`}
          </span>
        </h2>
        <p>
          This is a welcoming screen for the entry of the application , you
          can now see the options
        </p>
      </div>
      
      ) : (
          <div className="leftSide w-75 text-white">
          <h2 className="h1 ">
            {title} <span> {titleSpan} </span>
          </h2>
          <p>
            You can now add your items that any user can order it from the
            Application and you can edit
          </p>
        </div>
      )}
      <div className="rightSide w-25">
        <img src={home? homeImg : usersImg} className="w-100" />
      </div>
    </div>
  );
}
