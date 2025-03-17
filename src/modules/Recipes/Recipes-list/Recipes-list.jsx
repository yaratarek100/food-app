import React, { useEffect, useState } from "react";
import {
  CATEGORIES_URLS,
  imgBaseUrl,
  privateAxiosInstance,
  RECIPES_URLS,
  TAGS,
} from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";

import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import emptyImg from "./../../../assets/empty.jpg";
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";
import { notify } from "../../../utils/notify";
import DeleteConfermation from "../../Shared/Delete-confairmation/Delete-confairmation";
import PageSelector from "./../../Shared/pageSelector/pageSelector";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDeletionCard, setShowDeletionCard] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);

  const navigate = useNavigate();

  let getRecipesList = async (
    nameFilter,
    tagFilter,
    categoryFilter,
    pageNumber
  ) => {
    try {
      let response = await privateAxiosInstance.get(RECIPES_URLS.RECIPES_LIST, {
        params: {
          name: nameFilter,
          tagId: tagFilter,
          categoryId: categoryFilter,
          pageSize: 6,
          pageNumber: pageNumber,
        },
      });

      setRecipesList(response.data.data);
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

  let getCategories = async () => {
    try {
      let response = await privateAxiosInstance.get(
        CATEGORIES_URLS.CATEGORIES_LIST
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getTags = async () => {
    try {
      let response2 = await privateAxiosInstance.get(TAGS);
      setTags(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    try {
      let response = await privateAxiosInstance.delete(
        RECIPES_URLS.RECIPE(activeField)
      );
      notify("recipe was deleted successfully", "success");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }

    await getRecipesList(pageNumber);
    handleClose();
  };

  const handleClose = async () => {
    setActiveField(null);
    setShowDeletionCard(false);
  };

  useEffect(() => {
    getRecipesList(nameFilter, tagFilter, categoryFilter, pageNumber);
    getCategories();
    getTags();
  }, []);

  useEffect(() => {
    getRecipesList(nameFilter, tagFilter, categoryFilter, pageNumber);
  }, [pageNumber, nameFilter, tagFilter, categoryFilter]);

  return (
    <div className="list">
      <Header title={"Recipes"} titleSpan={" Items"}></Header>
      <SmallHeader Item={"recipe"}></SmallHeader>
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

        <Form.Select
          aria-label="Default select example"
          className="drop w-25"
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="">tag</option>
          {tags.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          aria-label="Default select example"
          className="drop w-25"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">category</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </div>
      {isLoaded ? (
        recipesList.length === 0 ? (
          <>
            <table className="table table-striped table-hover recipes-list ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
            </table>
            <Nodata></Nodata>
          </>
        ) : (
          <table className="table table-striped table-hover recipes-list ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Discount</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody className="">
              {recipesList.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.name}</td>
                  <td>
                    <img
                      src={
                        item?.imagePath ? imgBaseUrl + item.imagePath : emptyImg
                      }
                      className=" rounded-3 mx-auto d-block"
                    />
                  </td>
                  <td>{item?.price}</td>
                  <td>{item?.description}</td>
                  <td>20</td>
                  <td>{item?.category[0]?.name}</td>
                  <td className="  position-relative">
                    <i
                      className="fa fa-ellipsis-h"
                      onClick={() => {
                        setActiveField(
                          activeField === item?.id ? null : item?.id
                        );
                      }}
                    ></i>
                    <div
                      className={` ${
                        activeField === item?.id ? "active-field" : ""
                      } `}
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
                        className="btn text-secondary  rounded-0 "
                        onClick={() => {
                          navigate(`/dashboard/recipe/${item?.id}`);
                        }}
                      >
                        <i className="fa fa-edit"> </i>
                        Edit
                      </button>
                      <button
                        className="btn  text-secondary rounded-0 "
                        onClick={() => {
                          setShowDeletionCard(true);
                        }}
                      >
                        <i className="fa-solid fa-trash "></i>Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
      <DeleteConfermation
        show={showDeletionCard}
        deletionFunction={deleteRecipe}
        handleClose={handleClose}
      ></DeleteConfermation>

      <PageSelector
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageArray={pageArray}
      ></PageSelector>
    </div>
  );
}
