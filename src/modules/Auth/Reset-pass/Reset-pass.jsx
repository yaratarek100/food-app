import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Signin() {

  let {register, formState:{errors}, handleSubmit} =useForm();

    const onSubmit = async(data) => {

      try{
        console.log(data);
        let respose =await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data)
        console.log(respose);
        console.log("respose");
        
          }catch(error){
        console.log("error");
        console.log(error.response.data.additionalInfo);
        // console.log(error.response.data.additionalInfo?.errors?.email);
        // console.log(error.response.data.additionalInfo?.errors?.password);
          }}
      

  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Reset  Password</h2>
        <p className="text-black-50 ">Please Enter Your Otp  or Check Your Inbox</p>
      </div>
      <form action="" className="text-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text">
        <i className="fa-solid fa-envelope"></i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            {...register('email',{required :'email is required' })}
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">Email</label>
        </div>
      </div>
       {errors.email && <span className="text-danger"> {errors.email.message}</span>}
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text ">
        <i className="fa-solid fa-lock"></i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            {...register('seed',{required :'OTP is required' })}
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">OTP</label>
        </div>
      </div>
       {errors.seed && <span className="text-danger"> {errors.seed.message}</span>}
      
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text ">
        <i className="fa-solid fa-lock"></i>
        </span>
        <div className="form-floating">
          <input
            type="password"
            {...register('password',{required :'new password is required' })}
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">New Password</label>
        </div>
      </div>
       {errors.password && <span className="text-danger"> {errors.password.message}</span>}
      
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text ">
        <i className="fa-solid fa-lock"></i>
        </span>
        <div className="form-floating">
          <input
            type="password"
            {...register('confirmPassword',{required :'this field is required' })}
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">Confirm New Password</label>
        </div>
      </div>
       {errors.confirmPassword && <span className="text-danger"> {errors.confirmPassword.message}</span>}

 
      <button className="btn auth-btn">Reset Password</button>

      </form>
    </>
  );
}
