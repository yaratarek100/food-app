import { useEffect, useState } from "react";
import {
  imgBaseUrl,
  privateAxiosInstance,
  USERS_URLS,
} from "../../../services/urls";
import emptyImg from "./../../../assets/no-user.png";
import { useForm } from "react-hook-form";
import {
  EMAIL_VALIDATION,
  USER_NAME_VALIDATION,
} from "../../../services/validations";
import { notify } from "../../../utils/notify";
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";

function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (event) => {
    const file = event?.target?.files[0]; 
    if (file) {
      setUserImg(URL.createObjectURL(file));
      setFileName(file.name);
      setValue("profileImage", file, { shouldValidate: true }); 
    }
  };

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {

    const formData = new FormData();
    

    for (let key in data) {
      formData.append(key,data[key]);
    }

    setEditMode(false);
    await editCurrentUser(formData);
    await getCurrentUser();
  };

  const getCurrentUser = async () => {
    try {
      let response = await privateAxiosInstance.get(USERS_URLS.CURRENT_USER);

      const currentUserData = response?.data;
      const currentUserImg = response?.data?.imagePath;

      // img handling
      currentUserImg
        ? setUserImg(imgBaseUrl + currentUserImg)
        : setUserImg(emptyImg); 

      // can be edited
      setValue("userName", currentUserData?.userName);
      setValue("email", currentUserData?.email);
      setValue("country", currentUserData?.country);
      setValue("phoneNumber", currentUserData?.phoneNumber);
      //always disabled
      setValue("group", currentUserData?.group?.name);
      setValue("creationDate", currentUserData?.creationDate);
      setValue("modificationDate", currentUserData?.modificationDate);

      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  let editCurrentUser = async (data) => {
    
    try {
      let response = await privateAxiosInstance.put(
        USERS_URLS.USERS_LIST,
        data
      );
      notify("Profile updated successfully!", "success");
      getCurrentUser();
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      {isLoaded ? (
        <form
          action=""
          className={`text-start Profile-form`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="img-input data-input">
            <input
              type="file"
              id="profileImage"
              className="d-none"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleImageChange}
            />

            <div className="img-div">
              <img src={userImg} className="w-100" />
              <p className={`m-1 text-center ${editMode? "d-block":"d-none"}`}>{fileName}</p>
            </div>
            <label htmlFor="profileImage">
              {editMode ? (
                <div className="btn">
                  <i className="fa fa-edit me-2"></i>Choose Image
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-group mb-3  ">
            <strong>User Name :</strong>
            <input
              type="text"
              {...register("userName", USER_NAME_VALIDATION)}
              className="form-control  shadow-none"
              id="floatingInputGroup1"
              placeholder="userName"
              disabled={!editMode}
            />
          </div>
          {errors.userName && editMode && (
            <span className="text-danger"> {errors.userName.message}</span>
          )}

          <div className="input-group mb-3  ">
            <strong>Email:</strong>
            <input
              type="email"
              {...register("email", EMAIL_VALIDATION)}
              className="form-control  shadow-none"
              id="floatingInputGroup1"
              placeholder="email"
              disabled={!editMode}
            />
          </div>
          {errors.email && editMode && (
            <span className="text-danger"> {errors.email.message}</span>
          )}

          <div className="input-group mb-3  ">
            <strong>Country:</strong>
            <input
              type="text"
              {...register("country", { required: "country is required" })}
              className="form-control  shadow-none"
              id="floatingInputGroup1"
              placeholder="country"
              disabled={!editMode}
            />
          </div>
          {errors.country && editMode && (
            <span className="text-danger"> {errors.country.message}</span>
          )}

          <div className="input-group mb-3  ">
            <strong>Phone Number:</strong>
            <input
              type=""
              {...register("phoneNumber", {
                required: "phoneNumber is required",
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className="form-control  shadow-none"
              id="floatingInputGroup1"
              placeholder="phoneNumber"
              disabled={!editMode}
            />
          </div>
          {errors.phoneNumber && editMode && (
            <span className="text-danger ">{errors.phoneNumber.message}</span>
          )}

          <div
            className={`input-group mb-3  ${editMode ? "d-flex" : "d-none"}`}
          >
            <strong>Password:</strong>
            <div className="d-flex flex-grow-1 pass border ">
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
                className="form-control  shadow-none border-0"
                id="floatingInputGroup1"
                placeholder="Password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className=" border-0 "
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={`fa-solid  ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>
          {errors.confirmPassword && editMode && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}

          <div className="input-group mb-3  ">
            <strong>Role:</strong>
            <input
              type="text"
              disabled
              {...register("group")}
              className="form-control  shadow-none"
            />
          </div>

          <div className="input-group mb-3  ">
            <strong>Created On:</strong>
            <input
              type="text"
              disabled
              {...register("creationDate")}
              className="form-control  shadow-none"
            />
          </div>

          <div className="input-group mb-3  ">
            <strong>Modified On:</strong>
            <input
              disabled
              type="text"
              {...register("modificationDate")}
              className="form-control  shadow-none"
            />
          </div>

          <button
            className={`${
              editMode ? "d-none" : "d-block"
            }  btn auth-btn main-btn`}
            type="button"
            onClick={() => {
              setEditMode(true);
            }}
          >
            <i className="fa-solid fa-edit me-3 "></i>
            Edit Profile
          </button>

          <button
            className={`${
              editMode ? "d-block" : "d-none"
            }  btn auth-btn main-btn`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Save"
            )}
          </button>
        </form>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </>
  );
}

export default Profile;
