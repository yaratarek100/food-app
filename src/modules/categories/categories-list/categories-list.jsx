import React, { useEffect, useState } from "react";
import { CATEGORIES_URLS, privateAxiosInstance } from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";
import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import DeleteConfermation from "../../Shared/Delete-confairmation/Delete-confairmation";
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";
import { notify } from "../../../utils/notify";
import CategoryForm from "../CategoryForm/CategoryForm";
import PageSelector from "./../../Shared/pageSelector/pageSelector";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDeletionCard, setShowDeletionCard] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageArray, setPageArray] = useState([]);

  const getCategoriesList = async (pageNumber) => {
    try {
      let response = await privateAxiosInstance.get(
        CATEGORIES_URLS.CATEGORIES_LIST,
        {
          params: {
            pageSize: 6,
            pageNumber: pageNumber,
          },
        }
      );
      setCategoriesList(response.data.data);
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

  // useEffect(() => {
  //   console.log(pageArray);
  // }, [pageArray]);

  // let processCategory = async (categoryId, operation) => {
  //   try {
  //     let response;
  //     switch (operation.toLowerCase()) {
  //       case "get":
  //         response = await privateAxiosInstance.get(
  //           CATEGORIES_URLS.CATEGORY(categoryId)
  //         );
  //         console.log(response.data);
  //         break;

  //       default:
  //         console.error("Invalid operation:", operation);
  //         return;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteCategory = async () => {
    try {
      await privateAxiosInstance.delete(CATEGORIES_URLS.CATEGORY(activeField));
      notify("category was deleted successfully", "success");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
    await getCategoriesList(pageNumber);

    handleClose();
  };

  const addCategory = async (data) => {
    try {
      const response = await privateAxiosInstance.post(
        CATEGORIES_URLS.ADD_CATEGORY,
        data
      );
      notify("category was added successfully", "success");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
    await getCategoriesList(pageNumber);

    handleClose();
  };

  const editCategory = async (data) => {
    try {
      const response = await privateAxiosInstance.put(
        CATEGORIES_URLS.CATEGORY(activeField),
        data
      );
      notify("category was edited successfully", "success");
    }
     catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
    await getCategoriesList(pageNumber);
    handleClose();
  };

  const handleClose = async () => {
    setActiveField(null);
    setShowDeletionCard(false);
    setShowCategoryForm(false);
    setCategoryName(null);
  };

  useEffect(() => {
    getCategoriesList(pageNumber);
  }, [pageNumber]);

  return (
    <div className="list">
      <Header title={"Categories"} titleSpan={" Items"}></Header>
      <SmallHeader
        Item={"Category"}
        setShow={setShowCategoryForm}
      ></SmallHeader>

      {isLoaded ? (
        categoriesList.length === 0 ? (
          <>
            <table className="table categories-list">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
            </table>
            <Nodata />
          </>
        ) : (
              <>
          <table className="table table-striped table-hover categories-list">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="position-relative">
                    <i
                      className="fa fa-ellipsis-h"
                      onClick={() => {
                        setActiveField(
                          activeField === item.id ? null : item.id
                        );
                      }}
                    ></i>

                    <div
                      className={`start-0 ${
                        activeField === item.id ? "active-field" : ""
                      }`}
                    >
                      <button
                        className="btn  text-secondary  rounded-0 "
                        onClick={() => {
                          processRecipe(item?.id, "get");
                        }}
                      >
                        <i className="fa-regular fa-eye"></i> View
                      </button>
                      <button
                        className="btn text-secondary rounded-0"
                        onClick={() => {
                          setCategoryName(item.name);
                          setShowCategoryForm(true);
                        }}
                      >
                        <i className="fa fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn text-secondary rounded-0"
                        onClick={() => {
                          setShowDeletionCard(true);
                        }}
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

      <CategoryForm
        addCategory={addCategory}
        editCategory={editCategory}
        show={showCategoryForm}
        itemData={categoryName}
        handleClose={handleClose}
      />

      <DeleteConfermation
        show={showDeletionCard}
        deletionFunction={deleteCategory}
        handleClose={handleClose}
      />

    
    </div>
  );
}
