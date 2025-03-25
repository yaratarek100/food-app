import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  imgBaseUrl,
  privateAxiosInstance,
  RECIPES_URLS,
} from "../../../services/urls";

import emptyImg from "./../../../assets/no-recipe.jpg";
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";

function RecipeCard({ show, id, handleClose, btnFunction, idForRemove ,setIdForRemove}) {
  const userRole = JSON.parse(localStorage.getItem("loginData")).userGroup;

  const [recipeData, setRecipeData] = useState({});
  const [isLauding, setIsLauding] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handelAddToFavs = async () => {
    setIsLauding(true);
    if (idForRemove) {
      await btnFunction(idForRemove);
      await handleClose();
      setIdForRemove(null)

    } else {
      await btnFunction(id);
      await handleClose();
    }
    setIsLauding(false);
  };

  const getRecipeData = async (id) => {
    try {
      let response = await privateAxiosInstance.get(RECIPES_URLS.RECIPE(id));
      setRecipeData(response.data);
      setIsDataLoaded(true)
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (id) {
      getRecipeData(id);
    }
  }, [id]);

  return (
    <>
 
   <Modal show={show} onHide={handleClose} className="popup-card">

   {!isDataLoaded ?
    <LoadingScreen></LoadingScreen>
  :
  <>

        <Modal.Header closeButton></Modal.Header>
        <div className="content notImg ">
          <div className="img-div">
            <img
              src={
                recipeData.imagePath
                  ? imgBaseUrl + recipeData.imagePath
                  : emptyImg
              }
              className="w-100"
            />
          </div>
          <div className="recipe-details card-details">
            <h2 className="recipe-title">{recipeData.name}</h2>
            <p className="recipe-description">
              <strong>Description :</strong>
              {recipeData.description}
            </p>
            <p className="recipe-price">
              <strong>Price :</strong>
              {recipeData.price} EGP
            </p>
            {recipeData.category && recipeData.category.length > 0 && (
              <p className="recipe-category">
                <strong>Category :</strong> {recipeData.category[0].name}
              </p>
            )}
            {recipeData.tag && (
              <p className="recipe-tag">
                <strong>Tag :</strong> {recipeData.tag.name}
              </p>
            )}
            <p className="recipe-date">
              <strong>Created On :</strong>{" "}
              {new Date(recipeData.creationDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Modal.Footer
          className={userRole != "SystemUser" ? "d-none" : "d-block"}
        >
          <button
            className="btn fav-btn"
            onClick={() => {
              handelAddToFavs();
            }}
          >
            {isLauding ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <>
                {idForRemove ? (
                  "remove from favorites"
                ) : (
                  <>
                    <i className="fa-solid fa-heart me-2 "></i>
                    add to favorites
                  </>
                )}
              </>
            )}
          </button>
        </Modal.Footer>
        </>
}
      </Modal>
  
      
    </>
  );
}

export default RecipeCard;
