import React from "react";
import logo from "../../../assets/4 4.png";
import { Link, useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();
  return (
    <div className="notfound w-100 vh-100">
      <div className="robot">
        <div className="maindiv w-50 d-flex flex-column  p-4">
          <img src={logo} className="" />
          <div className="text">
            <h1>
              Oops.<span className="d-block"> Page not found </span>...
            </h1>
            <p>
              This Page doesn’t exist or was removed! We suggest you back to
              home.
            </p>
            <button
              className="btn auth-btn btnn"
              onClick={() => {
                navigate("/");
              }}
            >
                <i className="fa  fa-arrow-left me-2"></i>Back To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
