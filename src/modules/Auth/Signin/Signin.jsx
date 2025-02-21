import React from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Log In</h2>
        <p className="text-black-50 ">Welcome Back! Please enter your details</p>
      </div>
      <form action="">
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text">
          <i className="fa fa-wind mx-2 border-end"> </i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">Enter your E-mail</label>
        </div>
      </div>
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text">
          <i className="fa fa-wind mx-2 border-end-1"> </i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">Password</label>
        </div>
      </div>

      <div className="links d-flex justify-content-between ">
        <Link className="text-black text-decoration-none">Register Now?</Link>
        <Link className="auth-link text-decoration-none" >Forgot Password?</Link>
      </div>

      <button className="btn auth-btn">Login</button>

      </form>
    </>
  );
}
