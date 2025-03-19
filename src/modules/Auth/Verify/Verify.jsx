import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "./../../../utils/notify";
import { publicAxiosInstance,USER_URLS } from "../../../services/urls";
import {EMAIL_VALIDATION} from './../../../services/validations';
import { LoginDataContext } from "../../../context/LoginDataContext";

export default function Verify() {

      
        
        let {
          register,
          formState: { errors ,isSubmitting},
          handleSubmit,
          watch
        } = useForm({mode :"onChange"});
        
      
        const navigate = useNavigate();
        let email = watch("email", "");
      
      
      
        const onSubmit = async (data) => {
          try {
            let response = await publicAxiosInstance.put(
              USER_URLS.VERIFY_ACCOUNT,
              data
            );
            console.log(response);
            // notify("Welcome back! You have signed in successfully", "success");
            navigate("/" ); 
          } 
          catch (error) {
            console.log(error);
            notify(error.response?.data?.message, "error");
          }
        };
      
        return (
          <>
            <div className="title text-start">
              <h2 className="h4"> Verify Account  
              </h2>
              <p className="text-black-50 ">
              Please Enter Your Otp  or Check Your Inbox
              </p>
            </div>
            <form action="" className="text-start" onSubmit={handleSubmit(onSubmit)}>
            

              <div className="input-group mb-3 border ">
                <span className="input-group-text border-0 ">
                  <i className="fa-solid  fa-envelope border-end border-2 pe-2"></i>
      
                </span>
      
                  <input
                    type="email"
{...register("email", EMAIL_VALIDATION)}
                    className="form-control border-0 shadow-none"
                    id="floatingInputGroup1"
                    placeholder="email"
                  />
              </div>
              {errors.email && (
                <span className="text-danger"> {errors.email.message}</span>
              )}


          
        <div className="input-group mb-3  border ">
          <span className=" input-group-text border-0">
            <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
          </span>
          <input
            type="text"
            {...register("seed", { required: "OTP is required" })}
            className="form-control border-0 shadow-none "
            id="floatingInputGroup1"
            placeholder="OTP"
          />
        </div>
        {errors.seed && (
          <span className=" text-danger"> {errors.seed.message}</span>
        )}
      
        
      
              <button className="btn auth-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : "send"}
              </button>
            </form>
          </>
        );
      
  
}
