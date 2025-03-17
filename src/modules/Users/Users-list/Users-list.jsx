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
import DeleteConfermation from "./../../Shared/Delete-confairmation/Delete-confairmation";
import PageSelector from "./../../Shared/pageSelector/pageSelector";
import Form from "react-bootstrap/Form";


export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [showDeletionCard, setShowDeletionCard] = useState(false);
  const [userNameFilter, setUserNameFilter] = useState("");
  const [groupsFilter, setGroupsFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  let getUsersList = async (
    userNameFilter,
    emailFilter,
    countryFilter,
    groupsFilter,
    pageNumber
  ) => {
    try {
      let response = await privateAxiosInstance.get(USERS_URLS.USERS_LIST, {
        params: {
          userName: userNameFilter,
          email: emailFilter,
          country: countryFilter,
          groups: groupsFilter,
          pageSize: 6,
          pageNumber: pageNumber,
        },
      });
      setUsersList(response.data.data);
      setPageArray(
        Array.from(
          { length: response.data.totalNumberOfPages },
          (_, i) => i + 1
        )
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoaded(true);
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

  useEffect(() => {
    getUsersList(
      userNameFilter,
      emailFilter,
      countryFilter,
      groupsFilter,
      pageNumber
    );
    console.log(emailFilter);
  }, [userNameFilter, emailFilter, countryFilter, groupsFilter, pageNumber]);

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

      <div className="search-bar my-4">
        <div className="position-relative w-50 mx-2">
          <i className="fa-solid fa-magnifying-glass position-absolute "></i>
          <input
            className="form-control px-5"
            type="search"
            placeholder="Search here ..."
            onChange={(e) => setUserNameFilter(e.target.value)}
          />
        </div>
        <div className="position-relative w-50 mx-2">
          <i className="fa-solid fa-magnifying-glass position-absolute "></i>
          <input
            className="form-control px-5"
            type="search"
            placeholder="Email ..."
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </div>
        <div className="position-relative w-50 mx-2">
          <i className="fa-solid fa-magnifying-glass position-absolute "></i>
          <input
            className="form-control px-5"
            type="search"
            placeholder="Country ..."
            onChange={(e) => setCountryFilter(e.target.value)}
          />
        </div>

        <Form.Select
          aria-label="Default select example"
          className="drop w-25"
          onChange={(e) => setGroupsFilter(e.target.value)}
        >
          <option value="">Role</option>
          <option value="1">admin</option>
          <option value="2">system user</option>
        </Form.Select>
      </div>
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
                        src={
                          item?.imagePath
                            ? imgBaseUrl + item.imagePath
                            : emptyImg
                        }
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
                          setActiveField(
                            activeField === item?.id ? null : item?.id
                          )
                        }
                      ></i>
                      <div
                        className={
                          activeField === item?.id ? "active-field" : ""
                        }
                      >
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
            <PageSelector
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              pageArray={pageArray}
            ></PageSelector>
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
