import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../assets/4 4.png";





export default function Authlayout() {
  const [isRegister, setIsRegister] = useState(false)

useEffect(()=>{
  if(window.location.pathname==("/signup")){
    setIsRegister(true);
  }
},[,window.location.pathname])

  return (
    <div className={`${isRegister? "register" : ""} auth-container `}>
      <div className=" container-fluid bg-layer h-100">
        <div className="row w-100 h-100 justify-content-center align-items-center">
          <div className= {`${isRegister? "col-md-7":"col-md-5"}  bg-white  rounded-5 text-center p-3 mt-5`}>
            <div className="logo w-50 mx-auto">
              <img src={logo} alt="" className="w-100" />
            </div>
            <div className="p-5">
       
          

              <Outlet ></Outlet>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
