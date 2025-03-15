import React, { useEffect, useState } from "react";
import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import {
  imgBaseUrl,
  privateAxiosInstance,
  USERS_URLS,
} from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";
import emptyImg from "./../../../assets/empty.jpg";
import { notify } from "./../../../utils/notify";
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";
import DeleteConfermation from './../../Shared/Delete-confairmation/Delete-confairmation';
import PageSelector from './../../Shared/pageSelector/pageSelector';

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
    const [pageArray, setPageArray] = useState([]);

  const [showDeletionCard, setShowDeletionCard] = useState(false);

  let getUsersList = async ( pageNumber) => {
    try {
      let response = await privateAxiosInstance.get(
        USERS_URLS.USERS_LIST,
        {
          params: {
            pageSize: 6,
            pageNumber: pageNumber,
          },
        }
      );
      setUsersList(response.data.data);
      setPageArray(
        Array.from(
          { length: response.data.totalNumberOfPages },
          (_, i) => i + 1
        )
      );
    }catch (error) {
      console.log(error);
    }
    setIsLoaded(true)
  };

  const deleteUser = async () => {

    try {
      let response = await privateAxiosInstance.delete(
        USERS_URLS.USERS(activeField)
      );
      notify(response?.data?.message, "success");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }

    handleClose();
    await getUsersList(pageNumber);
  };

  const handleClose = async () => {
    setActiveField(null);
    setShowDeletionCard(false);
  };

  useEffect(() => {
    getUsersList(pageNumber); 
  }, [pageNumber]);

  let processUsers = async (userId, operation) => {
    try {
      let response;
      switch (operation.toLowerCase()) {
        case "get":
          response = await privateAxiosInstance.get(USERS_URLS.USERS(userId));
          console.log(response.data);
          break;
          // case "put":
          //   response = await privateAxiosInstance.put(
          //     USERS_URLS.USERS(userId),
          //   );
          //   break;
          // case "delete":

          // setShowDeletionCard(true);
          //  setIdForDeletion(userId);
          // console.log(usersList.length);

          break;

        default:
          console.error("Invalid operation:", operation);
          return;
      }
    } catch (error) {
      console.log(error);
    }
  }; //محتاج تعديل فيما بعد

  return (
    
      <div className="list">
        <Header title={"Users"} titleSpan={" List"}></Header>
        <SmallHeader Item={"users"}></SmallHeader>
   
        {isLoaded ? (
  usersList.length === 0 ? (
    <>
    <table className="table table-striped table-hover users-list ">
    <thead>
      <tr>
        <th scope="col">UserName</th>
        <th scope="col">Image</th>
        <th scope="col">Role </th>
        <th scope="col">Email</th>
        <th scope="col">Country</th>
        <th scope="col">PhoneNumber</th>
        <th scope="col">CreationDate</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
  </table>
    <Nodata />
    </>
  ) : (
    <>
    <table className="table table-striped table-hover users-list ">
           <thead>
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">Image</th>
              <th scope="col">Role </th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">CreationDate</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
      <tbody>
        {usersList.map((item) => (
          <tr key={item?.id}>
            <td>{item?.userName}</td>
            <td>
              <img
                src={item?.imagePath ? imgBaseUrl + item.imagePath : emptyImg}
                className="rounded-3 mx-auto d-block"
              />
            </td>
            <td>{item?.group?.name}</td>
            <td>{item?.email}</td>
            <td>{item?.country}</td>
            <td>{item?.phoneNumber}</td>
            <td>{item?.creationDate}</td>
            <td className="position-relative">
              <i
                className="fa fa-ellipsis-h"
                onClick={() =>
                  setActiveField(activeField === item?.id ? null : item?.id)
                }
              ></i>
              <div className={activeField === item?.id ? "active-field" : ""}>
                <button
                  className="btn text-secondary rounded-0"
                  onClick={() => processUsers(item?.id, "get")}
                >
                  <i className="fa-regular fa-eye"></i> View
                </button>
                <button
                  className="btn text-secondary rounded-0"
                  onClick={() => processUsers(item?.id, "put")}
                >
                  <i className="fa fa-edit"></i> Edit
                </button>
                <button
                  className="btn text-secondary rounded-0"
                  onClick={() => setShowDeletionCard(true)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   <PageSelector pageNumber={pageNumber} setPageNumber={setPageNumber} pageArray={pageArray} ></PageSelector>
   </>
  )
) : (

  <LoadingScreen />
)}

    
        <DeleteConfermation
         
          show={showDeletionCard}
          deletionFunction={deleteUser}
          handleClose={handleClose}
        ></DeleteConfermation>

        
      </div>
    
  );
}
