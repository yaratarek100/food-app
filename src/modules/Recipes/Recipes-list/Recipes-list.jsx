import React, { useEffect, useState } from "react";
import { baseUrl, imgBaseUrl, privateAxiosInstance, RECIPES_URLS } from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";

import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import CategoriesData from './../../categories/categories-data/categories-data';
import emptyImg from './../../../assets/empty.jpg';

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);

  const [activeCategory, setActiveCategory] = useState("");

  let getRecipesList = async (pageSize, pageNumber) => {
    try {
      let response = await privateAxiosInstance.get(
        RECIPES_URLS.RECIPES_LIST(pageSize, pageNumber)
      );
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let processRecipe = async (RecipeId, operation) => {
    try {
      let response;
      switch (operation.toLowerCase()) {
        case "get":
          response = await privateAxiosInstance.get(
            RECIPES_URLS.RECIPE(RecipeId)
          );
          console.log(response.data);
          break;
        // case "put":
        //   response = await privateAxiosInstance.put(
        //     RECIPES_URLS.RECIPE(RecipeId),
        //   );
        //   break;
        case "delete":
          response = await privateAxiosInstance.delete(
            RECIPES_URLS.RECIPE(RecipeId)
          );
          getRecipesList(10, 1);
          break;
        default:
          console.error("Invalid operation:", operation);
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipesList(10, 1);
  }, []);

  return (
    <div className="list">
      <Header title={"Recipes"} titleSpan={" Items"}></Header>
      <SmallHeader Item={"recipe"}></SmallHeader>
      {recipesList.length === 0 ? (
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
            </tr>
          </thead>

          <tbody className="">
            {recipesList.map((item) => (
              <tr key={item?.id}>
                <td>{item?.name}</td>
                <td ><img src={item?.imagePath ? imgBaseUrl + item.imagePath : emptyImg}  className=" rounded-3 mx-auto d-block"/></td>
                <td>{item?.price}</td>
                <td>{item?.description}</td>
                <td>20</td>
                <td>{item?.category[0]?.name}</td>
                <td className="  rounded-1 position-relative">
                  <i
                    className="fa fa-bars "
                    onClick={() => {
                      setActiveCategory(
                        activeCategory === item?.id ? null : item?.id
                      );
                    }}
                  ></i>
                  <div
                    className={` ${
                      activeCategory === item?.id ? "active-category" : ""
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
                        processRecipe(item?.id, "put");
                      }}
                    >
                      <i className="fa fa-edit"> </i>
                      Edit
                    </button>
                    <button
                      className="btn  text-secondary rounded-0 "
                      onClick={() => {
                        processRecipe(item?.id, "delete");
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
      )}
    </div>
  );
}
