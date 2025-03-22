import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "./../../../utils/notify";
import { publicAxiosInstance, USER_URLS } from "../../../services/urls";
import { EMAIL_VALIDATION } from "./../../../services/validations";
import { LoginDataContext } from "../../../context/LoginDataContext";
export default function Signin() {
  const { saveLoginData } = useContext(LoginDataContext);

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  let email = watch("email", "");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      let response = await publicAxiosInstance.post(USER_URLS.LOGIN, data);
      notify("Welcome back! You have signed in successfully", "success");
      navigate("/home");
      localStorage.setItem("token", response?.data?.token);

      saveLoginData();
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
  };

  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Log In</h2>
        <p className="text-black-50 ">
          Welcome Back! Please enter your details
        </p>
      </div>
      <form action="" className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3 border ">
          <span className="input-group-text border-0 ">
            <i className="fa-solid fa-mobile-screen border-end border-2 pe-2"></i>
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
            <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
          </span>

          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="form-control border-0 shadow-none"
            id="floatingInputGroup1"
            placeholder="Password"
          />
          <button
            type="button"
            className=" border-0 px-3"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </button>
        </div>
        {errors.password && (
          <span className="text-danger"> {errors.password.message}</span>
        )}

        <div className="links d-flex justify-content-between ">
          <Link
            to={"/signup"}
            state={{ email }}
            className="text-black auth-link text-decoration-none"
          >
            Register Now?
          </Link>
          <Link
            to={"/forget-password"}
            state={{ email }}
            className="auth-link auth-link2 text-decoration-none"
          >
            Forgot Password?
          </Link>
        </div>

        <button className="btn auth-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "login"
          )}
        </button>
      </form>
    </>
  );
}
