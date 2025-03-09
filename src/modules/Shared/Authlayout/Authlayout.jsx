import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../assets/4 4.png";





export default function Authlayout() {


  return (
    <div className=" auth-container ">
      <div className=" container-fluid bg-layer h-100">
        <div className="row w-100 h-100 justify-content-center align-items-center">
          <div className=" col-md-5 bg-white rounded-5 text-center p-3 mt-5">
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
