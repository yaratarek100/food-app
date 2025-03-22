import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notify } from "./../../../utils/notify";
import {  privateAxiosInstance, USER_URLS } from "../../../services/urls";
import logo from "../../../assets/4 4.png";
import { NEW_PASSWORD_VALIDATION } from "../../../services/validations";


export default function ChangePassword({show, setShow}) {
 
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewRePassword, setShowNewRePassword] = useState(false);

   const location = useLocation()
    let userEmail = location.state?.email 
  

  const togglePasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };
  const togglePasswordVisibility1 = () => {
    setShowNewPassword((prev) => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setShowNewRePassword((prev) => !prev);
  };

  let {
    register,
    formState: { errors,isSubmitting },
    handleSubmit,
    watch,
    trigger
   
  } = useForm(
    {mode :"onChange"});
  
    const newPassword = watch("confirmNewPassword")
    const confirmNewPassword = watch("newPassword")

    useEffect(()=>{
        
        if(confirmNewPassword)
          {trigger("confirmNewPassword")}
    
      },[newPassword,confirmNewPassword,trigger])

  const onSubmit = async (data) => {
    try {
      let response = await privateAxiosInstance.put(
        USER_URLS.CHANGE_PASS,
        data
      );
      notify(response.data.message, "success");
      console.log(response);
      navigate("/" );
    } catch (error) {
      console.log(error);
      notify(error.response.data.message, "error");
    }
  };

  return (
    <div className={ ` change-pass position-absolute w-100 d-flex justify-content-center align-items-center top-0 left-0 ease ${show ? "show-ease" :""}`} 
    onClick={()=>{setShow(false)}}>
 <div className={`  bg-white   rounded-5 text-center p-3 mt-5  `}   onClick={(e) => e.stopPropagation()}>
            <div className="logo w-100 position-relative">
              <img src={logo} alt="" className="w-50 mx-auto" />
              <i className="fa fa-close position-absolute " onClick={()=>{setShow(false)}}></i>
            </div>
            <div className="p-5">


   
      <div className="title text-start">
        <h2 className="h4">Reset Password</h2>
        <p className="text-black-50 ">
          Please Enter Your Otp or Check Your Inbox
        </p>
      </div>
      <form action="" className="text-start" onSubmit={handleSubmit(onSubmit)}>

      <div className="input-group mb-3 border ">
          <span className="input-group-text border-0 ">
            <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
          </span>

            <input
              type={showOldPassword ? "text" : "password"}
              {...register("oldPassword", { required: "Password is required" })}
              className="form-control border-0 shadow-none"
              id="floatingInputGroup1"
              placeholder="Old Password"
            />
            <button
              type="button"
              className=" border-0 px-3"
              onClick={togglePasswordVisibility}
              aria-label={showOldPassword ? "Hide password" : "Show password"}
            >
              <i
                className={`fa-solid ${
                  showOldPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>


        </div>
        {errors.oldPassword && (
          <span className="text-danger"> {errors.oldPassword.message}</span>
        )}

        <div className="input-group mb-3 border ">
          <span className="input-group-text border-0 ">
            <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
          </span>
            <input
               type={showNewPassword ? "text" : "password"}
              {...register("newPassword", NEW_PASSWORD_VALIDATION
            )}
              className="form-control border-0 shadow-none"
              id="floatingInputGroup1"
              placeholder="New Password"
            />
            <button
              type="button"
              className=" border-0 px-3"
              onClick={togglePasswordVisibility1}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              <i
                className={`fa-solid ${
                  showNewPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
        </div>
        {errors.newPassword && (
          <span className="text-danger"> {errors.newPassword.message}</span>
        )}

        <div className="input-group mb-3 border ">
          <span className="input-group-text border-0">
            <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
          </span>
          <input
             type={showNewRePassword ? "text" : "password"}
            {...register("confirmNewPassword", {
              required: "Confirm Password is required",



              validate: (value) =>
              (value === watch("newPassword")|| "Passwords do not match"),
            })}
            className="form-control shadow-none border-0"
            id="floatingInputGroup1"
            placeholder="Confirm New Password"
          />
          <button
              type="button"
              className=" border-0 px-3"
              onClick={togglePasswordVisibility2}
              aria-label={showNewRePassword ? "Hide password" : "Show password"}
            >
              <i
                className={`fa-solid ${
                  showNewRePassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
        </div>
        {errors.confirmNewPassword && (
          <span className="text-danger"> {errors.confirmNewPassword.message}</span>
        )}

        <button className="btn auth-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    
            </div>
            </div>
    </div>
 
  );
}
