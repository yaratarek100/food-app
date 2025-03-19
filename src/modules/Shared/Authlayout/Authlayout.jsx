import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../../assets/4 4.png";





export default function Authlayout() {
  const [isRegister, setIsRegister] = useState(false)
  const location = useLocation().pathname;

  useEffect(() => {
    setIsRegister(location === "/signup");
  }, [location]);

  return (
    <div className={`${isRegister? "register" : ""} auth-container `}>
      <div className=" container-fluid bg-layer h-100">
        <div className="row w-100 justify-content-center align-items-center">
          <div className= {`${isRegister? "col-10 col-md-9 col-lg-8 col-xl-6 ":"col-md-7 col-lg-6 col-xl-5"}  bg-white  rounded-5 text-center p-3 mt-5`}>
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
