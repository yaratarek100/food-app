import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  imgBaseUrl,
  privateAxiosInstance,
  USERS_URLS,
} from "../../../services/urls";
import emptyImg from "./../../../assets/no-user.png";

function UserCard({ show, id, handleClose }) {
  const [userData, setUserData] = useState({});

  const getUserData = async (id) => {
    try {
      let response = await privateAxiosInstance.get(USERS_URLS.USERS(id));
      console.log(response);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [id]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="popup-card">
        <Modal.Header closeButton></Modal.Header>
        <div className="content notImg  ">
          <div className="img-div ">
            <img
              src={
                userData?.imagePath ? imgBaseUrl + userData?.imagePath  : emptyImg
              }
              className="w-100"
            />
          </div>
          <div className="user-details card-details">
            <p className="">
              <strong>User Name :</strong>
              {userData?.userName}
            </p>
            <p className="">
              <strong>Email :</strong>
              {userData?.email}
            </p>

            <p className="user-price">
              <strong>Country :</strong> {userData?.country}
            </p>

            <p className="user-category">
              <strong>Phone Number :</strong> {userData?.phoneNumber}
            </p>

            <p className="user-tag">
              <strong>Role :</strong> {userData?.group?.name}
            </p>

            <p className="user-date">
              <strong>Created On :</strong>
              {new Date(userData?.creationDate).toLocaleDateString()}
            </p>
            <p className="user-date">
              <strong>Modified On :</strong>
              {new Date(userData?.modificationDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* <button
          className="btn btn-outline-danger mb-4 me-4 ms-auto p-2 px-4"
          onClick={deletionFunction}
        >
          {isDeleting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          )  : (
            "Delete"
          )}
        </button> */}
      </Modal>
    </>
  );
}

export default UserCard;
