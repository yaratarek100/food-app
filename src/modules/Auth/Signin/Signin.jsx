import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Signin() {
  let {register, formState:{errors}, handleSubmit} = useForm();

  const onSubmit = async(data) => {
    try{
      let respose =await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data)
      console.log(respose);
      
        }catch(error){
      console.log(error);
      console.log(error.response.data.message);
        }
  }

  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Log In</h2>
        <p className="text-black-50 ">Welcome Back! Please enter your details</p>
      </div>
      <form action="" className="text-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text">
        <i className="fa-solid fa-mobile-screen"></i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            {...register('email',{required : 'email is required'})}
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">Enter your E-mail</label>
        </div>
      </div>
        {errors.email && <span className="text-danger"> {errors.email.message}</span>}
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text ">
        <i className="fa-solid fa-lock"></i>
        </span>
        <div className="form-floating">
          <input
            type="password"
            {...register('password',{required : 'password is required'})}
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">Password</label>


        </div>
      </div>
        {errors.password && <span className="text-danger"> {errors.password.message}</span>}

      <div className="links d-flex justify-content-between ">
        <Link to={'/signup'} className="text-black text-decoration-none">Register Now?</Link>
        <Link to={'/forget-password'} className="auth-link text-decoration-none" >Forgot Password?</Link>
      </div>

      <button className="btn auth-btn">Login</button>

      </form>
    </>
  );
}
