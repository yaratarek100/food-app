import React, { useEffect, useState } from "react";
import { CATEGORIES_URLS, privateAxiosInstance } from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";
import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import DeleteConfirmation from "../../Shared/Delete-confairmation/Delete-confairmation";
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
  const [nameFilter, setNameFilter] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const getCategoriesList = async (pageNumber, nameFilter) => {
    try {
      let response = await privateAxiosInstance.get(
        CATEGORIES_URLS.CATEGORIES_LIST,
        {
          params: {
            name: nameFilter,
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

  const deleteCategory = async () => {
    setIsDeleting(true);
    try {
      await privateAxiosInstance.delete(CATEGORIES_URLS.CATEGORY(activeField));
      notify("category was deleted successfully", "success");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
    setIsDeleting(false);
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
    } catch (error) {
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

  useEffect(() => {
    getCategoriesList(pageNumber, nameFilter);
  }, [pageNumber, nameFilter]);

  return (
    <div className="list">
      <Header title={"Categories"} titleSpan={" Items"}></Header>
      <SmallHeader
        Item={"Category"}
        setShow={setShowCategoryForm}
      ></SmallHeader>

      <div className="search-bar my-4">
        <div className="position-relative w-50 mx-2">
          <i className="fa-solid fa-magnifying-glass position-absolute "></i>
          <input
            className="form-control px-5"
            type="search"
            placeholder="Search here ..."
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>

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
                        className="fa fa-ellipsis-h "
                        onClick={() => {
                          setActiveField(
                            activeField === item.id ? null : item.id
                          );
                        }}
                      ></i>

                      <div
                        className={` ease ${
                          activeField === item?.id ? "show-ease" : ""
                        }`}
                      >
                        {/* <button
                          className="btn  text-secondary  rounded-0 "
                          onClick={() => {
                          }}
                        >
                          <i className="fa-regular fa-eye"></i> View
                        </button> */}
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

      <DeleteConfirmation
        item="category"
        isDeleting={isDeleting}
        show={showDeletionCard}
        deletionFunction={deleteCategory}
        handleClose={handleClose}
      />
    </div>
  );
}
