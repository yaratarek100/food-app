import React, { useEffect, useState } from "react";
import {
  FAVORITES_URLS,
  imgBaseUrl,
  privateAxiosInstance,
} from "../../../services/urls";
import emptyImg from "./../../../assets/no-recipe.jpg";
import Nodata from "../../Shared/Nodata/Nodata";
import LoadingScreen from "../../Shared/LoadingScreen/LoadingScreen";
import { notify } from "../../../utils/notify";
import Header from "../../Shared/Header/Header";
import RecipeCard from "../recipeCard/recipeCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showRecipeCard, setShowRecipeCard] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [idForRemove, setIdForRemove] = useState(null);

  let getFavs = async () => {
    try {
      let response = await privateAxiosInstance.get(FAVORITES_URLS.FAVORITE);
      setFavorites(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoaded(true);
  };
  const handleClose = async () => {
    setShowRecipeCard(false);
  };
  useEffect(() => {
    getFavs();
  }, []);

  let removeFromFavorites = async (favId) => {
    try {
      let response = await privateAxiosInstance.delete(
        FAVORITES_URLS.DELETE_FAV(favId)
      );
      notify("Recipe successfully removed from favorites!", "success");
      getFavs();
    } catch (error) {
      console.log(error);
      notify("Something went wrong!", "error");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Header home={false} title={"Favorite"} titleSpan={"Items"} />
        <div className="row">
          {isLoaded ? (
            favorites.length === 0 ? (
              <Nodata />
            ) : (
              <>
                {favorites.map((item) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 curser-pointer"
                    key={item.id}
                    onClick={() => {
                      setActiveField(item?.recipe?.id);
                      setIdForRemove(item?.id);
                      setShowRecipeCard(true);
                    }}
                  >
                    <div className="recipe-card rounded-3 overflow-hidden position-relative">
                      <div className="img-div">
                        <img
                          src={
                            item?.recipe?.imagePath
                              ? imgBaseUrl + item?.recipe?.imagePath
                              : emptyImg
                          }
                          className="h-100"
                        />
                      </div>
                      <div className="details">
                        <h3>
                          {item?.recipe?.name}
                          <span>{item?.recipe?.price} EGP</span>
                        </h3>
                        <p className="details">
                          {item?.recipe?.description}
                        </p>
                      </div>
                      <i
                        className="fa fa-heart position-absolute"
                        title="remove from favorites"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromFavorites(item?.id);
                        }}
                      ></i>
                    </div>
                  </div>
                ))}
              </>
            )
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
      <RecipeCard
        show={showRecipeCard}
        id={activeField}
        handleClose={handleClose}
        btnFunction={removeFromFavorites}
        idForRemove={idForRemove}
        getFavs={getFavs}
        setIdForRemove={setIdForRemove}
      />
    </>
  );
  
}
