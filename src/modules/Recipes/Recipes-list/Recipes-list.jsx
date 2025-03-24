import React, { useEffect, useState } from "react";
import {
  CATEGORIES_URLS,
  FAVORITES_URLS,
  imgBaseUrl,
  privateAxiosInstance,
  RECIPES_URLS,
  TAGS,
} from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";
import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import emptyImg from "./../../../assets/no-recipe.jpg";
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";
import { notify } from "../../../utils/notify";
import DeleteConfirmation from "../../Shared/Delete-confairmation/Delete-confairmation";
import PageSelector from "./../../Shared/pageSelector/pageSelector";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import RecipeCard from "../recipeCard/recipeCard";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDeletionCard, setShowDeletionCard] = useState(false);
  const [showRecipeCard, setShowRecipeCard] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const userRole = JSON.parse(localStorage.getItem("loginData")).userGroup;
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
  const addToFavorites = async (id) => {
    try {
      const response = await privateAxiosInstance.post(
        FAVORITES_URLS.FAVORITE,
        {
          recipeId: id,
        }
      );
      notify("Recipe successfully added to favorites!", "success");
    } catch (error) {
      console.log(error);
      notify("Something went wrong!", "error");
    }
    setActiveField();
  };

  const deleteRecipe = async () => {
    setIsDeleting(true);
    try {
      let response = await privateAxiosInstance.delete(
        RECIPES_URLS.RECIPE(activeField)
      );
      notify("recipe was deleted successfully", "success");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }

    await getRecipesList(nameFilter, tagFilter, categoryFilter, pageNumber);
    setIsDeleting(false);
    handleClose();
  };

  const handleClose = async () => {
    setActiveField(null);
    setShowDeletionCard(false);
    setShowRecipeCard(false);
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
      <SmallHeader Item={"recipe"} userRole={userRole}></SmallHeader>
      <div className="search-bar my-4">
        <div className="position-relative w-50 mx-2">
          <i className="fa-solid fa-magnifying-glass position-absolute "></i>
          <input
            className="form-control px-5"
            type="search"
            placeholder="Search here ..."
            onChange={(e) => {
              setNameFilter(e.target.value);
            }}
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
                      className=" rounded-3 mx-auto d-block "
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
                      className={` ease ${
                        activeField === item?.id ? "show-ease" : ""
                      }`}
                    >
                      <button
                        className="btn  text-secondary  rounded-0 "
                        onClick={() => {
                          setShowRecipeCard(item?.id);
                        }}
                      >
                        <i className="fa-regular fa-eye"></i> View
                      </button>
                      {userRole != "SystemUser" ? (
                        <>
                          <button
                            className="btn text-secondary  rounded-0 "
                            onClick={() => {
                              navigate(`/home/recipe/${item?.id}`);
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
                        </>
                      ) : (
                        <button
                          className="btn  text-secondary rounded-0 "
                          onClick={() => {
                            addToFavorites(item.id);
                          }}
                        >
                          <i className="fa-solid fa-heart "></i>Favorite
                        </button>
                      )}
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
      <DeleteConfirmation
        isDeleting={isDeleting}
        item="recipe"
        show={showDeletionCard}
        deletionFunction={deleteRecipe}
        handleClose={handleClose}
      ></DeleteConfirmation>

      <PageSelector
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageArray={pageArray}
      ></PageSelector>

      <RecipeCard
        show={showRecipeCard}
        id={activeField}
        handleClose={handleClose}
        addToFavorites={addToFavorites}
      ></RecipeCard>
    </div>
  );
}
