import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../assets/4 4.png";
import "./authlayout.css";

export default function Authlayout() {
  return (
    <div className=" auth-container ">
      <div className=" container-fluid bg-layer h-100">
        <div className="row w-100 h-100 justify-content-center align-items-center">
          <div className=" col-md-6 bg-white rounded-4 text-center p-3">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="p-5">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
