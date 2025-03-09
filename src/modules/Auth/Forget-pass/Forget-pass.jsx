import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useLocation, useNavigate } from "react-router-dom";
import { notify } from './../../../utils/notify';
import {  publicAxiosInstance, USER_URLS } from "../../../services/urls";
import {EMAIL_VALIDATION} from './../../../services/validations';


export default function Signin() {

  const location = useLocation()
  let userEmail = location.state?.email 



  let {
    register,
    formState: { errors ,isSubmitting},
    handleSubmit,

  } = useForm({mode :"onChange" 
    , defaultValues : {email :userEmail}}  ); 


  

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await publicAxiosInstance.post(
        USER_URLS.FORGET_PASS,
        data
      );
      notify(response.data.message, "success");
      
      navigate("/reset-password",  {state : {email :data.email} });
    } catch (error) {
      console.log(error);
      notify("❌ Failed to send code! Please try again.", "error");
    }
  };

  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Forgot Your Password?</h2>
        <p className="text-black-50 ">
          No worries! Please enter your email and we will send a password reset
          link
        </p>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="text-start">
        <div className="input-group mb-3 border  ">
          <span className="input-group-text border-0">
            <i className="fa-solid fa-mobile-screen border-end border-2 pe-2"></i>
          </span>
            <input
             {...register("email", EMAIL_VALIDATION)}
              type="text"
              className="form-control shadow-none border-0"
              id="floatingInputGroup1"
              placeholder="user email"
            />
        </div>
        {errors.email && (
          <span className="text-danger"> {errors.email.message}</span>
        )}

        <button className="btn auth-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : "submit"}
        </button>
      </form>
    </>
  );
}
