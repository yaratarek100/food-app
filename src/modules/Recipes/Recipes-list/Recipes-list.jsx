import React, { useEffect, useState } from "react";
import {  imgBaseUrl, privateAxiosInstance, RECIPES_URLS } from "../../../services/urls";
import Nodata from "./../../Shared/Nodata/Nodata";

import Header from "./../../../modules/Shared/Header/Header";
import SmallHeader from "./../../Shared/smallHeader/smallHeader";
import emptyImg from './../../../assets/empty.jpg';
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";
import { notify } from "../../../utils/notify";
import DeleteConfermation from "../../Shared/Delete-confairmation/Delete-confairmation";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
    const [activeField, setActiveField] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [showDeletionCard, setShowDeletionCard] = useState(false);

  let getRecipesList = async (pageSize, pageNumber) => {
    try {
      let response = await privateAxiosInstance.get(
        RECIPES_URLS.RECIPES_LIST(pageSize, pageNumber)
      );
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
    
    setIsLoaded(true)
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
  
      setActiveField(null);
      await getRecipesList(50, 1);
      setShowDeletionCard(false);
    };


  useEffect(() => {
    getRecipesList(50, 1);
  }, []);

  return (
    <div className="list">
      <Header title={"Recipes"} titleSpan={" Items"}></Header>
      <SmallHeader Item={"recipe"}></SmallHeader>
      {
        isLoaded ?
     ( recipesList.length === 0 ? (
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
                <td ><img src={item?.imagePath ? imgBaseUrl + item.imagePath : emptyImg}  className=" rounded-3 mx-auto d-block"/></td>
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
                        processRecipe(item?.id, "put");
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
      ))
      :
      <LoadingScreen></LoadingScreen>
      
      }
      <DeleteConfermation
          show={showDeletionCard}
          setShow={setShowDeletionCard}
          deletionFunction={deleteRecipe}
        ></DeleteConfermation>
    </div>
  );
}
