import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notify } from "./../../../utils/notify";
import { publicAxiosInstance, USER_URLS } from "../../../services/urls";
import { EMAIL_VALIDATION, NEW_PASSWORD_VALIDATION } from "../../../services/validations";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const location = useLocation();
  let userEmail = location.state?.email;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setShowRePassword((prev) => !prev);
  };

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({ defaultValues: { email: userEmail } }, { mode: "onChange" });

  const password = watch("confirmPassword");
  const confirmPassword = watch("password");

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = async (data) => {
    try {
      let response = await publicAxiosInstance.post(USER_URLS.RESET_PASS, data);
      notify(response.data.message, "success");
      navigate("/");
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  };

  return (
    <>
      <div className="title text-start">
        <h2 className="h4">Reset Password</h2>
        <p className="text-black-50 ">
          Please Enter Your Otp or Check Your Inbox
        </p>
      </div>
      <form action="" className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3 border ">
          <span className="input-group-text border-0 ">
            <i className="fa-solid fa-envelope border-end border-2 pe-2"></i>
          </span>
          <input
            type="text"
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

        <div className="input-group mb-3 border ">
          <span className="input-group-text border-0 ">
            <i className="fa-solid fa-lock border-end border-2 pe-2"></i>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password",NEW_PASSWORD_VALIDATION)}
            className="form-control border-0 shadow-none"
            id="floatingInputGroup1"
            placeholder="password"
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
            placeholder="confirm password"
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
          <span className="text-danger"> {errors.confirmPassword.message}</span>
        )}

        <button className="btn auth-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </>
  );
}
