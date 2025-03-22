import React, { useEffect, useState } from "react";
import {
  FAVORITES_URLS,
  imgBaseUrl,
  privateAxiosInstance,
} from "../../services/urls";
import emptyImg from "./../../assets/no-recipe.jpg";
import Nodata from "../../modules/Shared/Nodata/Nodata";
import LoadingScreen from "../../modules/Shared/LoadingScreen/LoadingScreen";
import { notify } from "../../utils/notify";
import Header from "../../modules/Shared/Header/Header";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  let getFavs = async () => {
    try {
      let response = await privateAxiosInstance.get(FAVORITES_URLS.FAVORITE);
      setFavorites(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoaded(true);
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
      {isLoaded ? (
        favorites.length === 0 ? (
          <Nodata></Nodata>
        ) : (
          <div className="container-fluid">
            <Header home={false} title={"Favorite"} titleSpan={"Items"} ></Header>
            <div className="row">
              {favorites.map((item) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
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
                    <div className="details ">
                      <h3 className="">
                        {item?.recipe?.name}
                        <span className="">{item?.recipe?.price} </span>
                      </h3>

                      <p className="details">{item?.recipe?.description} </p>
                    </div>
                    <i
                      className="fa fa-heart position-absolute "
                      title="remove from favorites"
                      onClick={() => {
                        removeFromFavorites(item?.id);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </>
  );
}
