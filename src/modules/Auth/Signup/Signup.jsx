import React, {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "./../../../utils/notify";
import { EMAIL_VALIDATION, NEW_PASSWORD_VALIDATION } from "./../../../services/validations";
import { publicAxiosInstance, USER_URLS } from './../../../services/urls';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);


  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({ mode: "onChange" });

      const Password = watch("password")
      const confirmPassword = watch("confirmPassword")
  
      useEffect(()=>{
          
          if(confirmPassword)
            {trigger("confirmPassword")}
      
        },[Password,confirmPassword,trigger])

  const navigate = useNavigate();
  let email = watch("email", "");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setShowRePassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      let response = await publicAxiosInstance.post(USER_URLS.REGISTER, data);
      console.log(response);
      notify("Welcome back! You have signed in successfully", "success");
      navigate("/verify-account");

    }
     catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
  };

  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Register</h2>
        <p className="text-black-50 ">
          Welcome Back! Please enter your details
        </p>
      </div>
      <form action="" className="text-start registration-form " onSubmit={handleSubmit(onSubmit)}>
        <div className="inner-div d-flex gap-5 mb-3 mt-5 w-100">
          <div className="left-side w-50 px-1">
            <div className="input-group mb-3 border ">
              <span className="input-group-text border-0 ">
                <i className="fa-solid fa-user border-end border-2 pe-2"></i>
              </span>
              <input
                type="text"
                {...register("userName", {required: "user name is required" })}
                className="form-control border-0 shadow-none"
                id="floatingInputGroup1"
                autocomplete="new-password"
                placeholder="userName"
              />
            </div>
            {errors.userName && (
              <span className="text-danger"> {errors.userName.message}</span>
            )}

            <div className="input-group mb-3 border ">
              <span className="input-group-text border-0 ">
                <i className="fa-solid fa-globe border-end border-2 pe-2"></i>
              </span>
              <input
                type="text"
                {...register("country", {required: "country is required" })}
                className="form-control border-0 shadow-none"
                id="floatingInputGroup1"
                placeholder="country"
              />
            </div>
            {errors.country && (
              <span className="text-danger"> {errors.country.message}</span>
            )}

            <div className="input-group mb-3 border ">
              <span className="input-group-text border-0 ">
                <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password",NEW_PASSWORD_VALIDATION)}
                className="form-control border-0 shadow-none"
                id="floatingInputGroup1"
                placeholder="Password"
                autocomplete="new-password"
              />
              <button
                type="button"
                className=" border-0 px-3"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            {errors.password && (
              <span className="text-danger"> {errors.password.message}</span>
            )}
          </div>

          <div className="right-side w-50 px-1">
            <div className="input-group mb-3 border ">
              <span className="input-group-text border-0 ">
                <i className="fa-solid fa-envelope border-end border-2 pe-2"></i>
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

            <div className="input-group mb-3 border ">
              <span className="input-group-text border-0 ">
                <i className="fa-solid fa-mobile-screen border-end border-2 pe-2"></i>
              </span>
              <input
                type=""
                {...register("phoneNumber", {
                  required: "phoneNumber is required",  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message: "Invalid phone number"
                  }
                })}
                className="form-control border-0 shadow-none"
                id="floatingInputGroup1"
                placeholder="phoneNumber"
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-danger "> {errors.phoneNumber.message}</span>
            )}

            <div className="input-group mb-3 border ">
              <span className="input-group-text border-0">
                <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
              </span>
              <input
                type={showRePassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",

                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="form-control shadow-none border-0"
                id="floatingInputGroup1"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className=" border-0 px-3"
                onClick={togglePasswordVisibility2}
                aria-label={showRePassword ? "Hide password" : "Show password"}
              >
                <i
                  className={`fa-solid ${
                    showRePassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger ">
                {" "}
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="links text-end px-3">
          <Link
            to={"/"}
            state={{ email }}
            className="auth-link auth-link2 text-decoration-none mr-auto"
          >
            Login Now?
          </Link>
        </div>
        <button className="btn auth-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </>
  );
}
