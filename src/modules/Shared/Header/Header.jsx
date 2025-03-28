import React from "react";

import usersImg from "./../../../assets/eating a variety of foods-amico.svg";
import homeImg from './../../../assets/Group 48102098.svg'

export default function Header({ home, title, titleSpan }) {
  let userEmail = localStorage.getItem("loginData").userName;

  return (
    <div className="headerDiv px-md-5 overflow-hidden position-relative z d-flex flex-column-reverse flex-md-row w-100 rounded-4 align-items-center justify-content-center justify-content-md-between mb-2">
      <div className="header-bg">

      <svg className="" xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="20.936875 0.4519589552238806 1159.21 326.11791417910445"   style={{maxHeight: "500px"}} width="100%" height="100%">
<path fill="" d="M24 24C24 15.5992 24 11.3988 25.6349 8.19014C27.073 5.36771 29.3677 3.073 32.1901 1.6349C35.3988 0 39.5992 0 48 0H1151C1159.4 0 1163.6 0 1166.81 1.6349C1169.63 3.073 1171.93 5.36771 1173.37 8.19014C1175 11.3988 1175 15.5992 1175 24V299C1175 307.401 1175 311.601 1173.37 314.81C1171.93 317.632 1169.63 319.927 1166.81 321.365C1163.6 323 1159.4 323 1151 323H48C39.5992 323 35.3988 323 32.1901 321.365C29.3677 319.927 27.073 317.632 25.6349 314.81C24 311.601 24 307.401 24 299V24Z" clipRule="evenodd" fillRule="evenodd"/>
<path strokeWidth="12" strokeOpacity="0.7" stroke="#54B435" d="M580 265C580 281.491 566.423 295 549.5 295C532.577 295 519 281.491 519 265C519 248.509 532.577 235 549.5 235C566.423 235 580 248.509 580 265Z"/>
<path strokeWidth="12" strokeOpacity="0.7" stroke="#54B435" d="M719 147.5C719 155.931 711.967 163 703 163C694.033 163 687 155.931 687 147.5C687 139.069 694.033 132 703 132C711.967 132 719 139.069 719 147.5Z"/>
<circle strokeWidth="12" strokeOpacity="0.7" stroke="#54B435" r="15.5" cy="45.5" cx="871.5"/>
<circle strokeWidth="24" strokeOpacity="0.1" stroke="white" r="64" cy="247" cx="76"/>
<path strokeWidth="12" strokeOpacity="0.7" stroke="#54B435" d="M112 84.5C112 97.384 101.35 108 88 108C74.6497 108 64 97.384 64 84.5C64 71.616 74.6497 61 88 61C101.35 61 112 71.616 112 84.5Z"/>
<path strokeWidth="25" strokeOpacity="0.1" stroke="white" d="M594.5 89.5C594.5 123.27 567.333 150.5 534 150.5C500.667 150.5 473.5 123.27 473.5 89.5C473.5 55.73 500.667 28.5 534 28.5C567.333 28.5 594.5 55.73 594.5 89.5Z"/>
<path strokeWidth="25" strokeOpacity="0.1" stroke="white" d="M1232.5 189C1232.5 243.9 1187.78 288.5 1132.5 288.5C1077.22 288.5 1032.5 243.9 1032.5 189C1032.5 134.1 1077.22 89.5 1132.5 89.5C1187.78 89.5 1232.5 134.1 1232.5 189Z"/>
</svg>

      </div>
      {home ? (
        <div className="leftSide w-md-50 w-100  text-white z-1">
        <h2 className="h1 ">
          {title}
          <span>     
            {`${JSON.parse(localStorage.getItem("loginData"))?.userName }  !`}
          </span>
        </h2>
        <p>
          This is a welcoming screen for the entry of the application , you
          can now see the options
        </p>
      </div>
      
      ) : (
          <div className="leftSide  w-md-50 w-100   text-white z-1">
          <h2 className=" ">
            {title} <span> {titleSpan} </span>
          </h2>
          <p>
            You can now add your items that any user can order it from the
            Application and you can edit
          </p>
        </div>
      )}
      <div className="rightSide w-md-25 w-100 z-1 text-center text-md-start ">

        <img src={home? homeImg : usersImg} className={home? "w-50 w-md-100 d-block mx-auto mx-md-0 ms-md-auto" : "w-md-75 my-2 d-block mx-md-0 mx-auto ms-md-auto"}/>
      </div>
    </div>
  );
}
