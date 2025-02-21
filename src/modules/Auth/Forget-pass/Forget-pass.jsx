import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";


export default function Signin() {

  let {register, formState:{errors}, handleSubmit} = useForm();
  const navigate = useNavigate();


  
    const onSubmit = async(data) => {
      try{
        let respose =await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
        console.log(respose.data.message);

        navigate('/reset-password');
        
          }catch(error){
        console.log(error);
        console.log(error.response.data.message);
          }
        }


  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Forgot Your Password?</h2>
        <p className="text-black-50 ">No worries! Please enter your email and we will send a password reset link </p>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="text-start">
      <div className="input-group mb-3 bg-body-tertiary ">
        <span className="input-group-text">
        <i className="fa-solid fa-mobile-screen"></i>
        </span>
        <div className="form-floating">
          <input
          {...register('email',{required : 'email is required'})}
            type="text"
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Username"
          />
          <label htmlFor="floatingInputGroup1">Enter your E-mail</label>
        </div>
      </div>
      {errors.email && <span className="text-danger"> {errors.email.message}</span>}
  
      <button className="btn auth-btn">submit</button>

      </form>
    </>
  );
}
